import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class GetCommentsDto {
  @ApiProperty({
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    default: 10,
    minimum: 10,
    maximum: 150,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(150)
  pageSize: number;

  @ApiProperty({
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  postId: number;
}

export class GetCommentsResponsePageInfo {
  @ApiProperty()
  totalCount: number;
  @ApiProperty()
  lastPage: number;
}
export class GetCommentsResponseReplyItem {
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

export class GetCommentsResponseItem {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  authorName: string;

  @ApiProperty({ type: () => GetCommentsResponseReplyItem, isArray: true })
  @Expose()
  replies: GetCommentsResponseReplyItem[];

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class GetCommentsResponse {
  @ApiProperty({ type: GetCommentsResponsePageInfo })
  pageInfo: GetCommentsResponsePageInfo;
  @ApiProperty({ type: GetCommentsResponseItem, isArray: true })
  items: GetCommentsResponseItem[];
}
