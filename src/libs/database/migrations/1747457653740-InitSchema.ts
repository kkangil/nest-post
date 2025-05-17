import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class InitSchema1747457653740 implements MigrationInterface {
  name = 'InitSchema1747457653740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 테이블 생성
    await queryRunner.query(`
      CREATE TABLE \`post\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`title\` varchar(255) NOT NULL,
        \`content\` text NOT NULL,
        \`authorName\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE \`comment\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`content\` text NOT NULL,
        \`authorName\` varchar(255) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`postId\` int NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE \`reply_comment\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`content\` text NOT NULL,
        \`authorName\` varchar(255) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`commentId\` int NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE \`keyword\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`authorName\` varchar(255) NOT NULL,
        \`keyword\` varchar(255) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    // FK 제약 조건 추가
    await queryRunner.query(`
      ALTER TABLE \`comment\`
      ADD CONSTRAINT \`FK_comment_post\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE \`reply_comment\`
      ADD CONSTRAINT \`FK_reply_comment_comment\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE;
    `);

    // ==============================
    // 데이터 삽입 (save() 사용)
    // ==============================

    // 게시글
    const postRepo = queryRunner.manager.getRepository('post');
    const post1 = await postRepo.save({
      title: '공지사항 1',
      content: '1번 공지사항 입니다.',
      authorName: '관리자',
      password: bcrypt.hashSync('1234', 10),
    });

    const post2 = await postRepo.save({
      title: '공지사항 2',
      content: '2번 공지사항 입니다.',
      authorName: '관리자',
      password: bcrypt.hashSync('1234', 10),
    });

    // 댓글
    const commentRepo = queryRunner.manager.getRepository('comment');
    const comment1 = await commentRepo.save({
      content: '1번 댓글 입니다.',
      authorName: '홍길동',
      post: post1, // FK 자동 처리
    });

    const comment2 = await commentRepo.save({
      content: '2번 댓글 입니다.',
      authorName: '홍길동',
      post: post1,
    });

    await commentRepo.save({
      content: '3번 댓글 입니다.',
      authorName: '짱구',
      post: post2,
    });

    // 대댓글
    const replyRepo = queryRunner.manager.getRepository('reply_comment');
    await replyRepo.save([
      {
        content: '1번 대댓글 입니다.',
        authorName: '홍길동',
        comment: comment1,
      },
      {
        content: '2번 대댓글 입니다.',
        authorName: '홍길동',
        comment: comment1,
      },
      {
        content: '3번 대댓글 입니다.',
        authorName: '짱구',
        comment: comment2,
      },
    ]);

    // 키워드
    await queryRunner.manager.getRepository('keyword').save({
      authorName: '홍길동',
      keyword: '테스트',
    });
    await queryRunner.manager.getRepository('keyword').save({
      authorName: '짱구',
      keyword: '안녕',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`keyword\``);
    await queryRunner.query(`DROP TABLE \`reply_comment\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(`DROP TABLE \`post\``);
  }
}
