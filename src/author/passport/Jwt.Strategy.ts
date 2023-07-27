import { PassportStrategy } from '@nestjs/passport';
import { AdminUser } from 'libs/db/Entitys/adminUser.entity';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { getManager } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sunliangrong',
    } as StrategyOptions);
  }
  async validate(id) {
    const data = await getManager()
      .createQueryBuilder(AdminUser, 'adminuser')
      .where('id=:id', { id: id })
      .getOne();
    return data;
  }
}
