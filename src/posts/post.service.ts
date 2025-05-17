import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import { PostRepository } from '@src/libs/database/post/repository/post.repository';
import {
  GetPostsDto,
  GetPostsResponse,
  GetPostsResponseItem,
  GetPostsResponsePageInfo,
} from '@src/posts/dto/get-posts.dto';
import {
  CreatePostDto,
  CreatePostResponse,
} from '@src/posts/dto/create-post.dto';
import { plainToInstance } from 'class-transformer';
import { UpdatePostDto } from '@src/posts/dto/update-post.dto';
import { GetPostByIdResponse } from '@src/posts/dto/get-post-by-id.dto';
import { DeletePostByIdDto } from '@src/posts/dto/delete-post-by-id.dto';
import { PostEntity } from '@src/libs/database/post/entity/post.entity';
import { KeywordService } from '@src/libs/service/keyword.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly keywordService: KeywordService,
  ) {}

  async getPosts(query: GetPostsDto): Promise<GetPostsResponse> {
    const [items, total] = await this.postRepository.findAndCount(query);
    const pageInfo: GetPostsResponsePageInfo = {
      totalCount: total,
      lastPage: Math.ceil(total / query.pageSize),
    };
    return {
      pageInfo,
      items: items.map((item) =>
        plainToInstance(GetPostsResponseItem, item, {
          excludeExtraneousValues: true,
        }),
      ),
    };
  }

  async getPostById(id: number): Promise<CreatePostResponse> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException();
    return plainToInstance(GetPostByIdResponse, post, {
      excludeExtraneousValues: true,
    });
  }

  async createPost(body: CreatePostDto): Promise<CreatePostResponse> {
    const post = this.postRepository.create(body);
    await this.keywordService.checkKeyword(`${body.title}${body.content}`);
    return plainToInstance(CreatePostResponse, post, {
      excludeExtraneousValues: true,
    });
  }

  async updatePost(id: number, body: UpdatePostDto) {
    const post = await this.repositoryFindById(id);
    await this.comparePassword(body.password, post.password);

    await this.postRepository.updateById(id, {
      ...post,
      ..._.omit(body, 'password'),
    });
    return await this.getPostById(id);
  }

  async deletePostById(id: number, body: DeletePostByIdDto) {
    const post = await this.repositoryFindById(id);
    await this.comparePassword(body.password, post.password);
    await this.postRepository.deleteById(id);
  }

  async repositoryFindById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException('게시글이 존재하지 않습니다');
    return post;
  }

  private async comparePassword(data: string | Buffer, encrypted: string) {
    const isMatchPassword = await bcrypt.compare(data, encrypted);
    if (!isMatchPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }
  }
}
