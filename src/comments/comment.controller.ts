import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateCommentDto,
  CreateCommentResponse,
} from '@src/comments/dto/create-comment.dto';
import { CommentService } from '@src/comments/comment.service';
import {
  GetCommentsDto,
  GetCommentsResponse,
} from '@src/comments/dto/get-comments.dto';
import {
  CreateReplyCommentDto,
  CreateReplyCommentResponse,
} from '@src/comments/dto/create-reply-comment.dto';

@ApiTags('댓글')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({
    summary: '댓글 목록 조회',
    description: '특정 게시글의 댓글을 페이징하여 조회',
  })
  @ApiOkResponse({ type: GetCommentsResponse })
  getComments(@Query() query: GetCommentsDto) {
    return this.commentService.getComments(query);
  }

  @Post()
  @ApiOperation({
    summary: '댓글 작성',
  })
  @ApiBody({ type: CreateCommentDto })
  @ApiCreatedResponse({ type: CreateCommentResponse })
  createComment(@Body() body: CreateCommentDto) {
    return this.commentService.createComment(body);
  }

  @Post('reply')
  @ApiOperation({
    summary: '대댓글 작성',
  })
  @ApiBody({ type: CreateReplyCommentDto })
  @ApiCreatedResponse({ type: CreateReplyCommentResponse })
  @ApiNotFoundResponse({ description: '댓글이 존재하지 않습니다' })
  createReplyComment(@Body() body: CreateReplyCommentDto) {
    return this.commentService.createReplyComment(body);
  }
}
