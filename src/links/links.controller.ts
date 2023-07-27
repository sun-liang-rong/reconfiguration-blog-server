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
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}
  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async index(@Query() query) {
    return await this.linksService.findAll(query);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async add(@Body() body) {
    console.log(body);
    return await this.linksService.create(body);
  }
  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  async updated(@Body() body) {
    console.log(body);
    return await this.linksService.updata(body);
  }
  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id) {
    console.log(id);
    return await this.linksService.delete(id);
  }
}
