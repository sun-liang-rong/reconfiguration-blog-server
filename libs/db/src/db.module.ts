import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { Blog } from './Entitys/blog.entity';
import { Tag } from './Entitys/tag.entity';
import { User } from './Entitys/user.entity';
import { Link } from './Entitys/link.entity';
import { AdminUser } from './Entitys/adminUser.entity';
import { JwtModule } from '@nestjs/jwt';
const Entity = TypeOrmModule.forFeature([User, Tag, Blog, Link, AdminUser]);
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'blog',
      entities: [User, Tag, Blog, Link, AdminUser],
      synchronize: true,
      logging: false,
    }),
    JwtModule.register({
      secret: 'sunliangrong',
    }),
  ],
  providers: [DbService],
  exports: [DbService, Entity, JwtModule],
})
export class DbModule {}
