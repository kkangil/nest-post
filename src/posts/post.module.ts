import { Module } from '@nestjs/common';
import { PostController } from '@src/posts/post.controller';
import { PostService } from '@src/posts/post.service';
import { PostDatabaseModule } from '@src/libs/database/post/post.module';
import { KeywordModule } from '@src/libs/module/keyword.module';

@Module({
  imports: [PostDatabaseModule, KeywordModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
