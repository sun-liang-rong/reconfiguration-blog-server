import { ApiresultService } from 'src/apiresult/apiresult.service';
import { Entity, getManager } from 'typeorm';
//定义一个接口  搜索的参数 一页多少条 多少页
interface paging {
  search: any;
  limit: string;
  page: string;
}

export class Curd {
  constructor(private readonly Entity) {}
  apiresult = new ApiresultService();
  findAll = async (query: paging, join?: string) => {
    console.log(join);

    console.log(query, 'query');
    const search = query.search || '{}';
    const limit = Number(query.limit) || 10;
    const page = (Number(query.page) - 1) * limit || 0;
    console.log(search, 'search');
    let result;
    if (join) {
      result = await getManager()
        .createQueryBuilder(this.Entity, 'entity')
        .leftJoinAndSelect(join, 'children')
        .where(JSON.parse(search))
        .skip(page)
        .take(limit)
        .getMany();
    } else {
      result = await getManager()
        .createQueryBuilder(this.Entity, 'entity')
        .where(JSON.parse(search))
        .skip(page)
        .take(limit)
        .getMany();
    }

    const totals = await getManager()
      .createQueryBuilder(this.Entity, 'entity')
      .where(JSON.parse(search))
      .getCount();
    const lastpage = Math.ceil(totals / limit);
    const data = {
      totals: totals,
      data: result,
      lastpage: lastpage,
      page: page + 1,
    };
    return await this.apiresult.MESSAGE(200, '查询成功', data);
  };
  create = async (body: any) => {
    const data = await getManager()
      .createQueryBuilder()
      .insert()
      .into(this.Entity)
      .values(body)
      .execute();
    console.log(data.raw.affectedRows);
    if (data.raw.affectedRows > 0) {
      return this.apiresult.message(200, '添加成功');
    } else {
      return this.apiresult.message(500, '插入失败');
    }
  };
  update = async (body: any) => {
    const data = await getManager()
      .createQueryBuilder()
      .update(this.Entity)
      .set(body)
      .where('id = :id', { id: body.id })
      .execute();
    console.log(data.affected);
    if (data.affected > 0) {
      return this.apiresult.message(200, '更新成功');
    } else {
      return this.apiresult.message(500, '更新失败');
    }
  };
  remove = async (id: string) => {
    const data = await getManager()
      .createQueryBuilder()
      .delete()
      .from(this.Entity)
      .where('id = :id', { id })
      .execute();
    console.log(data);
    if (data.affected > 0) {
      return this.apiresult.message(200, '删除成功');
    } else {
      return this.apiresult.message(500, '删除失败');
    }
  };
}
