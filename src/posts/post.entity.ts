import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './enums/postStatus.enum';
import { PostsService } from './providers/posts.service';

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

  tags?: string[];
}
