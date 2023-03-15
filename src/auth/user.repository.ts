import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import User from "./user.entity";

export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        const user = this.create({
            username,
            password
        });

        await this.save(user);
    }
}