import { Module } from '@nestjs/common';
import { PostController } from '@src/posts/post.controller';
import { PostService } from '@src/posts/post.service';
import { PostDatabaseModule } from '@src/libs/database/post/post.module';

@Module({
  imports: [PostDatabaseModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
