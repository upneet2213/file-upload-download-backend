import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
// import { UsersService } from 'src/users/users.service';
import { UploadsController } from './uploads.controller';

@Module({
  imports: [UsersModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
