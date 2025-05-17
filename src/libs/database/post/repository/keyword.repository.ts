import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { KeywordEntity } from '@src/libs/database/post/entity/keyword.entity';

@Injectable()
export class KeywordRepository {
  @InjectRepository(KeywordEntity)
  private keywordRepository: Repository<KeywordEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.keywordRepository = this.dataSource.getRepository(KeywordEntity);
  }

  async find(keyword: string) {
    const comment = await this.keywordRepository.find({
      where: {
        keyword: ILike(`%${keyword}%`),
      },
    });
  }
}
