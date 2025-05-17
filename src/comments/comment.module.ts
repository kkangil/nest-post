import { Module } from '@nestjs/common';
import { PostDatabaseModule } from '@src/libs/database/post/post.module';
import { CommentController } from '@src/comments/comment.controller';
import { CommentService } from '@src/comments/comment.service';
import { PostService } from '@src/posts/post.service';
import { KeywordModule } from '@src/libs/module/keyword.module';

@Module({
  imports: [PostDatabaseModule, KeywordModule],
  controllers: [CommentController],
  providers: [CommentService, PostService],
})
export class CommentModule {}
