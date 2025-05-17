import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({ description: '댓글 내용' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: '작성자 이름' })
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @ApiProperty({ description: '댓글이 작성된 게시글 ID' })
  @IsNotEmpty()
  @IsInt()
  postId: number;
}

export class CreateCommentResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  authorName: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
