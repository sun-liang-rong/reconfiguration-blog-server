import { Injectable } from '@nestjs/common';
import { Link } from 'libs/db/Entitys/link.entity';
import { ApiresultService } from 'src/apiresult/apiresult.service';
import { Curd } from 'src/utils/Crud.Utils';
//定义一个接口  搜索的参数 一页多少条 多少页
interface paging {
  search: any;
  limit: string;
  page: string;
}
@Injectable()
export class LinksService {
  constructor(private readonly apiresult: ApiresultService) {}
  CurdModel = new Curd(Link);
  async findAll(query: paging) {
    return await this.CurdModel.findAll(query);
  }
  async create(body: Link) {
    return await this.CurdModel.create(body);
  }
  async updata(body: Link) {
    return await this.CurdModel.update(body);
  }
  async delete(id) {
    return await this.CurdModel.remove(id);
  }
}
