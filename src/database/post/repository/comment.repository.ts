import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CommentEntity } from '@src/database/post/entity/comment.entity';
import { GetCommentsDto } from '@src/comments/dto/get-comments.dto';

@Injectable()
export class CommentRepository {
  @InjectRepository(CommentEntity)
  private commentRepository: Repository<CommentEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.commentRepository = this.dataSource.getRepository(CommentEntity);
  }

  async findAndCount({ postId, page, pageSize }: GetCommentsDto) {
    return await this.commentRepository.findAndCount({
      where: {
        post: { id: postId },
      },
      relations: ['replies'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findById(id: number) {
    return await this.commentRepository.findOneBy({ id });
  }

  async create(entity: Partial<CommentEntity>) {
    const comment = this.commentRepository.create(entity);
    return await this.commentRepository.save(comment);
  }
}
