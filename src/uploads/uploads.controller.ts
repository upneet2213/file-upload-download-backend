import {
  Get,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream, readdirSync } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Helper } from './helper';

@Controller('uploads')
export class UploadsController {
  @Get()
  files(@Res() res) {
    const pathName = join(__dirname, '/../../files');

    const files = readdirSync(pathName);

    // readdir(pathName, function (err, files) {
    //   files.forEach((file) => {
    //     const newFile = createReadStream(join(process.cwd(), file));
    //     const stream = new StreamableFile(newFile);
    //     // readFile(`./files/` + file, function (err, data) {
    //     //   if (err) {
    //     //     console.log(err);
    //     //   }
    //     //   console.log(data);
    //     //   // console.log(data);
    //     // });
    //   });
    // });
    // const filesToSend = files.map((file) => {
    //   const fileStream = createReadStream(join(process.cwd(), 'files/' + file));
    //   return fileStream;
    // });
    // console.log(filesToSend);
    res.send(files);
  }

  @Get(':file')
  download(@Param() file) {
    console.log(file);
    const newFile = createReadStream(join(process.cwd(), 'files/' + file.file));
    return new StreamableFile(newFile);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.filePath,
        filename: Helper.customFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // return this.uploadService.create(file);

    return file;
  }
}
