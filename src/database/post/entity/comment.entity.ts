import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '@src/database/post/entity/post.entity';
import { ReplyCommentEntity } from '@src/database/post/entity/reply-comment.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  post: PostEntity;

  @OneToMany(() => ReplyCommentEntity, (reply) => reply.comment)
  replies: ReplyCommentEntity[];

  @Column('text')
  content: string;

  @Column()
  authorName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
