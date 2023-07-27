import { Injectable } from '@nestjs/common';
import { Tag } from 'libs/db/Entitys/tag.entity';
import { ApiresultService } from 'src/apiresult/apiresult.service';
import { getManager } from 'typeorm';
import { Curd } from '../utils/Crud.Utils';
//定义一个接口  搜索的参数 一页多少条 多少页
interface paging {
  search: any;
  limit: string;
  page: string;
}
@Injectable()
export class TagsService {
  constructor(private readonly apiresult: ApiresultService) {}
  CurdModel = new Curd(Tag);
  async findAll(query: paging) {
    return await this.CurdModel.findAll(query, 'entity.superiors');
  }
  async create(body: Tag) {
    return await this.CurdModel.create(body);
  }
  async updata(body: Tag) {
    return await this.CurdModel.update(body);
  }
  async delete(id) {
    await getManager()
      .createQueryBuilder()
      .update(Tag)
      .set({ superiorsid: null })
      .where('superiorsid = :id', { id: id })
      .execute();
    return await this.CurdModel.remove(id);
  }
}
