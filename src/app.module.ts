import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from '@src/posts/post.module';
import { CommentModule } from '@src/comments/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
