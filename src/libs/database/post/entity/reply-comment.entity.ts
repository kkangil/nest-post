import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '@src/libs/database/post/entity/comment.entity';

@Entity('reply_comment')
export class ReplyCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies, {
    onDelete: 'CASCADE',
  })
  comment: CommentEntity;

  @Column('text')
  content: string;

  @Column()
  authorName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
