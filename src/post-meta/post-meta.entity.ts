import { Post } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostMeta {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  readTime!: string;

  @CreateDateColumn()
  createDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;

  @OneToOne(() => Post, (post) => post.meta, { onDelete: 'CASCADE' })
  @JoinColumn()
  post!: Post;
}
