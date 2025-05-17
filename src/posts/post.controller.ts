import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { PostService } from '@src/posts/post.service';
import { GetPostsDto, GetPostsResponse } from '@src/posts/dto/get-posts.dto';
import {
  CreatePostDto,
  CreatePostResponse,
} from '@src/posts/dto/create-post.dto';
import { UpdatePostDto } from '@src/posts/dto/update-post.dto';
import { GetPostByIdResponse } from '@src/posts/dto/get-post-by-id.dto';
import { DeletePostByIdDto } from '@src/posts/dto/delete-post-by-id.dto';

@ApiTags('게시글')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: '게시글 목록 조회',
    description: '제목, 작성자 검색 및 페이징 기능 제공',
  })
  @ApiOkResponse({ type: GetPostsResponse })
  getPosts(@Query() query: GetPostsDto) {
    return this.postService.getPosts(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 상세 조회',
  })
  @ApiOkResponse({ type: GetPostByIdResponse })
  @ApiNotFoundResponse()
  getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Post()
  @ApiOperation({
    summary: '게시글 작성',
    description: '로그인 없이 작성자와 비밀번호 포함하여 게시글 작성',
  })
  @ApiBody({ type: CreatePostDto })
  @ApiCreatedResponse({ type: CreatePostResponse })
  createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }

  @Put(':id')
  @ApiOperation({
    summary: '게시글 수정',
    description: '비밀번호 일치 시 게시글 수정 가능',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePostDto })
  @ApiBadRequestResponse({ description: '비밀번호가 일치하지 않습니다' })
  @ApiNotFoundResponse({ description: '게시글이 존재하지 않습니다' })
  updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제',
    description: '비밀번호 일치 시 게시글 삭제 가능',
  })
  @ApiBadRequestResponse({ description: '비밀번호가 일치하지 않습니다' })
  @ApiNotFoundResponse({ description: '게시글이 존재하지 않습니다' })
  deletePostById(@Param('id') id: number, @Body() body: DeletePostByIdDto) {
    return this.postService.deletePostById(id, body);
  }
}
