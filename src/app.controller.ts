import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import multer = require('multer');
import { join } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          console.log(join(__dirname, '..', 'upload'));
          cb(null, join(__dirname, '..', 'upload'));
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  async uploade(@UploadedFile() file) {
    console.log(file, 'file');
    const data = {
      ...file,
      url: `http://localhost:3002/static/${file.filename}`,
    };
    return data;
  }
}
