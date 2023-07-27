import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { JwtStrategy } from './passport/Jwt.Strategy';
import { LocalStrategy } from './passport/Local.Straategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthorController],
  providers: [AuthorService, LocalStrategy, JwtStrategy],
})
export class AuthorModule {}
