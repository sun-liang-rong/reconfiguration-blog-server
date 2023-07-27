import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { getManager } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { AdminUser } from 'libs/db/Entitys/adminUser.entity';
import { BadRequestException } from '@nestjs/common';
export class LocalStrategy extends PassportStrategy(Strategy) {
  async validate(username: string, password: string) {
    console.log(username, password);
    const data = await getManager()
      .createQueryBuilder(AdminUser, 'adminuser')
      .where('username=:username', { username: username })
      .addSelect('adminuser.password')
      .getOne();
    console.log(data);
    if (!data) {
      console.log(data, 'data');
      throw new BadRequestException('用户名或密码错误!');
    }
    if (!compareSync(password, data.password)) {
      throw new BadRequestException('用户名或密码错误!');
    }
    delete data.password;
    return data;
  }
}
