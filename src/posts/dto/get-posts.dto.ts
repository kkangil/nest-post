import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetPostsDto {
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;
}

export class GetPostsResponsePageInfo {
  @ApiProperty()
  totalCount: number;
  @ApiProperty()
  lastPage: number;
}

export class GetPostsResponseItem {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

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

export class GetPostsResponse {
  @ApiProperty({ type: GetPostsResponsePageInfo })
  pageInfo: GetPostsResponsePageInfo;
  @ApiProperty({ type: GetPostsResponseItem, isArray: true })
  items: GetPostsResponseItem[];
}
