import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly BlogService: BlogService) {}
  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async index(@Query() query) {
    return await this.BlogService.findAll(query);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async add(@Body() body) {
    console.log(body);
    return await this.BlogService.create(body);
  }
  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  async updated(@Body() body) {
    console.log(body);
    return await this.BlogService.updata(body);
  }
  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id) {
    console.log(id);
    return await this.BlogService.delete(id);
  }
}
