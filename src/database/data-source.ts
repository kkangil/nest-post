import { DataSource } from 'typeorm';
import { PostEntity } from '@src/database/post/entity/post.entity';
import { CommentEntity } from '@src/database/post/entity/comment.entity';
import { ReplyCommentEntity } from '@src/database/post/entity/reply-comment.entity';
import { KeywordEntity } from '@src/database/post/entity/keyword.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['src/database/migrations/**/*.ts'],
  entities: [PostEntity, CommentEntity, ReplyCommentEntity, KeywordEntity],
  synchronize: false,
});
