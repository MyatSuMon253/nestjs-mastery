import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';
import { PostsService } from './providers/posts.service';
import { Tag } from 'src/tags/tag.entity';
import { PostMeta } from 'src/post-meta/post-meta.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  slug!: string;

  @Column({
    type: 'enum',
    enum: PostsService,
    default: PostStatus.DRAFT,
    nullable: false,
  })
  status!: PostStatus;

  @Column({
    type: 'text',
    nullable: false,
  })
  content!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  featureImgUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: string;

  tags?: Tag[];

  @OneToOne(() => PostMeta, { cascade: true, eager: true })
  @JoinColumn()
  meta!: PostMeta;
}
