import { Injectable } from '@nestjs/common';
import { Blog } from 'libs/db/Entitys/blog.entity';
import { ApiresultService } from 'src/apiresult/apiresult.service';
import { Curd } from 'src/utils/Crud.Utils';
import { getManager } from 'typeorm';
interface paging {
  search: any;
  limit: string;
  page: string;
}
@Injectable()
export class BlogService {
  constructor(private readonly apiresult: ApiresultService) {}
  CurdModel = new Curd(Blog);
  async findAll(query: paging) {
    return await this.CurdModel.findAll(query, 'entity.tag');
  }
  async create(body: Blog) {
    return await this.CurdModel.create(body);
  }
  async updata(body: Blog) {
    return await this.CurdModel.update(body);
  }
  async delete(id) {
    return await this.CurdModel.remove(id);
  }
}
