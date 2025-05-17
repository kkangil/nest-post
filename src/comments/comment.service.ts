import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCommentDto,
  CreateCommentResponse,
} from '@src/comments/dto/create-comment.dto';
import { CommentRepository } from '@src/libs/database/post/repository/comment.repository';
import { PostService } from '@src/posts/post.service';
import { plainToInstance } from 'class-transformer';
import { CommentEntity } from '@src/libs/database/post/entity/comment.entity';
import {
  GetCommentsDto,
  GetCommentsResponse,
  GetCommentsResponsePageInfo,
} from '@src/comments/dto/get-comments.dto';
import {
  CreateReplyCommentDto,
  CreateReplyCommentResponse,
} from '@src/comments/dto/create-reply-comment.dto';
import { ReplyCommentRepository } from '@src/libs/database/post/repository/reply-comment.repository';
import { KeywordService } from '@src/libs/service/keyword.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly replyCommentRepository: ReplyCommentRepository,
    private readonly postService: PostService,
    private readonly keywordService: KeywordService,
  ) {}

  async getComments(query: GetCommentsDto): Promise<GetCommentsResponse> {
    const [items, total] = await this.commentRepository.findAndCount(query);
    const pageInfo: GetCommentsResponsePageInfo = {
      totalCount: total,
      lastPage: Math.ceil(total / query.pageSize),
    };
    return {
      pageInfo,
      items,
    };
  }

  async repositoryFindById(id: number): Promise<CommentEntity> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) throw new NotFoundException('댓글이 존재하지 않습니다');
    return comment;
  }

  async createComment(body: CreateCommentDto): Promise<CreateCommentResponse> {
    const post = await this.postService.repositoryFindById(body.postId);

    const comment = await this.commentRepository.create({
      ...body,
      post,
    });
    await this.keywordService.checkKeyword(comment.content);
    return plainToInstance(CreateCommentResponse, comment, {
      excludeExtraneousValues: true,
    });
  }

  async createReplyComment(
    body: CreateReplyCommentDto,
  ): Promise<CreateReplyCommentResponse> {
    const comment = await this.repositoryFindById(body.commentId);

    const replyComment = await this.replyCommentRepository.create({
      ...body,
      comment,
    });
    await this.keywordService.checkKeyword(comment.content);
    return plainToInstance(CreateReplyCommentResponse, replyComment, {
      excludeExtraneousValues: true,
    });
  }
}
