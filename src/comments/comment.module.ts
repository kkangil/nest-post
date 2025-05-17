import { Module } from '@nestjs/common';
import { PostDatabaseModule } from '@src/database/post/post.module';
import { CommentController } from '@src/comments/comment.controller';
import { CommentService } from '@src/comments/comment.service';
import { PostService } from '@src/posts/post.service';

@Module({
  imports: [PostDatabaseModule],
  controllers: [CommentController],
  providers: [CommentService, PostService],
})
export class CommentModule {}
