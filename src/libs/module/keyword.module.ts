import { Module } from '@nestjs/common';
import { KeywordService } from '@src/libs/service/keyword.service';
import { PostDatabaseModule } from '@src/libs/database/post/post.module';

@Module({
  imports: [PostDatabaseModule],
  providers: [KeywordService],
  exports: [KeywordService],
})
export class KeywordModule {}
