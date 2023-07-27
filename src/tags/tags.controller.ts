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
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async index(@Query() query) {
    return await this.tagsService.findAll(query);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async add(@Body() body) {
    console.log(body);
    return await this.tagsService.create(body);
  }
  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  async updated(@Body() body) {
    console.log(body);
    return await this.tagsService.updata(body);
  }
  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id) {
    console.log(id);
    return await this.tagsService.delete(id);
  }
}
