import { Module } from '@nestjs/common';
import { DbModule } from 'libs/db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiresultService } from './apiresult/apiresult.service';
import { ApiresultModule } from './apiresult/apiresult.module';
import { TagsModule } from './tags/tags.module';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';
import { LinksModule } from './links/links.module';
import { AuthorModule } from './author/author.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [DbModule, ApiresultModule, TagsModule, BlogModule, LinksModule, AuthorModule, CommentsModule],
  controllers: [AppController, CommentsController],
  providers: [AppService, ApiresultService, BlogService],
})
export class AppModule {}
