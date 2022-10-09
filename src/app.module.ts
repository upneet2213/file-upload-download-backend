import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UploadsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/uploads'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
