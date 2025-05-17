import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostEntity } from '@src/libs/database/post/entity/post.entity';
import { CommentEntity } from '@src/libs/database/post/entity/comment.entity';
import { KeywordEntity } from '@src/libs/database/post/entity/keyword.entity';
import { PostRepository } from '@src/libs/database/post/repository/post.repository';
import { CommentRepository } from '@src/libs/database/post/repository/comment.repository';
import { ReplyCommentEntity } from '@src/libs/database/post/entity/reply-comment.entity';
import { ReplyCommentRepository } from '@src/libs/database/post/repository/reply-comment.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          PostEntity,
          CommentEntity,
          ReplyCommentEntity,
          KeywordEntity,
        ],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([
      PostEntity,
      CommentEntity,
      ReplyCommentEntity,
      KeywordEntity,
    ]),
  ],
  providers: [PostRepository, CommentRepository, ReplyCommentRepository],
  exports: [PostRepository, CommentRepository, ReplyCommentRepository],
})
export class PostDatabaseModule {}
