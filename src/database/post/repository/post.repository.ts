import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, In, QueryRunner, Repository } from 'typeorm';
import { PostEntity } from '@src/database/post/entity/post.entity';
import { GetPostsDto } from '@src/posts/dto/get-posts.dto';
import { CreatePostDto } from '@src/posts/dto/create-post.dto';
import { UpdatePostDto } from '@src/posts/dto/update-post.dto';

@Injectable()
export class PostRepository {
  @InjectRepository(PostEntity)
  private postRepository: Repository<PostEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.postRepository = this.dataSource.getRepository(PostEntity);
  }

  async findAndCount({ authorName, title, page, pageSize }: GetPostsDto) {
    return await this.postRepository.findAndCount({
      where: {
        ...(authorName && { authorName: ILike(`%${authorName}%`) }),
        ...(title && { title: ILike(`%${title}%`) }),
      },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async create(params: CreatePostDto) {
    const post = this.postRepository.create(params);
    return await this.postRepository.save(post);
  }

  async findById(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async updateById(id: number, post: Partial<PostEntity>) {
    const result = await this.postRepository.update({ id }, post);

    if (result.affected === 0) {
      throw new NotFoundException('게시글이 존재하지 않습니다');
    }
  }

  async deleteById(id: number) {
    const result = await this.postRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('게시글이 존재하지 않습니다');
    }
  }
}
