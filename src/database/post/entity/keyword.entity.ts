import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('keyword')
export class KeywordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorName: string; // 작성자명 (중복 불가 가정)

  @Column()
  keyword: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
