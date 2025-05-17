import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePostByIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
