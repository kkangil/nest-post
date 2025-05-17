import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ReplyCommentEntity } from '@src/libs/database/post/entity/reply-comment.entity';

@Injectable()
export class ReplyCommentRepository {
  @InjectRepository(ReplyCommentEntity)
  private replyCommentRepository: Repository<ReplyCommentEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.replyCommentRepository =
      this.dataSource.getRepository(ReplyCommentEntity);
  }

  async create(entity: Partial<ReplyCommentEntity>) {
    const comment = this.replyCommentRepository.create(entity);
    return await this.replyCommentRepository.save(comment);
  }
}
