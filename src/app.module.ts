import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { PostMetaModule } from './post-meta/post-meta.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const ENV = process.env.NODE_ENV; // development

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        entities: [User, Post],
        synchronize: true,
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
      }),
    }),
    TagsModule,
    PostMetaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
