import { IsNotEmpty } from 'class-validator';

// validation과 type check까지 여기서 한 번에 하는 듯
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
