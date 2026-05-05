import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [User, Post],
      synchronize: true,
      port: 5432,
      username: '',
      password: '',
      host: 'localhost',
      database: 'nest-app',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
