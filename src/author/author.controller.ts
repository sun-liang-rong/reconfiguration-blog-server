import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { hashSync } from 'bcryptjs';
import { getManager } from 'typeorm';
import { AdminUser } from 'libs/db/Entitys/adminUser.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('author')
export class AuthorController {
  constructor(private readonly jwtService: JwtService) {}
  @Post('register')
  async register(@Body() body: AdminUser) {
    body.password = hashSync(body.password);
    const data = await getManager()
      .createQueryBuilder()
      .insert()
      .into(AdminUser)
      .values(body)
      .execute();
  }
  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) {
    console.log(req, 'req');
    return {
      token: this.jwtService.sign(String(req.user.id)),
    };
  }
  @Post('findone')
  @UseGuards(AuthGuard('jwt'))
  async findone(@Req() req) {
    return req.user;
  }
}
