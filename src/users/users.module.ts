import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider.ts';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindByUserEmailProvider } from './providers/find-by-user-email.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindByUserEmailProvider,
    FindOneByGoogleIdProvider,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(authConfig),
  ],
})
export class UsersModule {}
