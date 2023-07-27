import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
@Module({
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
