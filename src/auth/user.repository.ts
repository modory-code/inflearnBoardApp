import { ConflictException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private dataSource: DataSource,
  ) {
    super(User, dataSource.manager);
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    // password 암호화
    const salt = await bcrypt.genSalt();  // 암호화 salt 생성
    const hashedPassword = await bcrypt.hash(password, salt); // salt 포함 hash 작업

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch(error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
