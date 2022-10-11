import {
  Get,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { UsersService } from 'src/users/users.service';
import { Helper } from './helper';
import { PaginationParams } from './pagination.params';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  files(
    @Query() { userId, skip, limit }: PaginationParams,
  ) {
    const files = this.usersService.getUserFiles(userId, skip, limit);
    return files;
  }

  @Get('download/:file')
  download(@Param() file) {
    const newFile = createReadStream(join(process.cwd(), 'files/' + file.file));
    return new StreamableFile(newFile);
  }

  @Post('upload/:uploadId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.filePath,
        filename: Helper.customFileName,
      }),
    }),
  )
  async uploadFile(
    @Param() id,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    await this.usersService.addFile(id.uploadId, file);
    return file;
  }
}
