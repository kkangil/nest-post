import { Injectable } from '@nestjs/common';
import { KeywordRepository } from '@src/libs/database/post/repository/keyword.repository';

@Injectable()
export class KeywordService {
  constructor(private readonly keywordRepository: KeywordRepository) {}

  async checkKeyword(text: string) {
    const matchingKeywords =
      await this.keywordRepository.findMatchingKeywords(text);

    for (const alert of matchingKeywords) {
      this.sendNotification(alert.authorName, alert.keyword);
    }
  }

  private sendNotification(author: string, keyword: string) {
    console.log(
      `알림: ${author}님이 등록한 키워드 "${keyword}"가 포함된 글이 작성되었습니다.`,
    );
  }
}
