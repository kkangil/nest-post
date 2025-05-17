import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostEntity } from '@src/database/post/entity/post.entity';
import { CommentEntity } from '@src/database/post/entity/comment.entity';
import { KeywordEntity } from '@src/database/post/entity/keyword.entity';
import { PostRepository } from '@src/database/post/repository/post.repository';

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
        entities: [PostEntity, CommentEntity, KeywordEntity],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([PostEntity, CommentEntity, KeywordEntity]),
  ],
  providers: [PostRepository],
  exports: [PostRepository],
})
export class PostDatabaseModule {}
