import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';
import { PostsService } from './providers/posts.service';
import { Tag } from 'src/tags/tag.entity';
import { PostMeta } from 'src/post-meta/post-meta.entity';
import { User } from 'src/users/user.entity';

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
    enum: PostStatus,
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

  @OneToOne(() => PostMeta, (postMeta) => postMeta.post, {
    cascade: true,
    eager: true,
  })
  meta!: PostMeta;

  @ManyToOne(()=> User, (user)=> user.posts)
  author!: User;
}
