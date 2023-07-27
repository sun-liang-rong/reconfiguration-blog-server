import { Global, Module } from '@nestjs/common';
import { ApiresultService } from './apiresult.service';

@Global()
@Module({
  imports: [ApiresultService],
  providers: [ApiresultService],
  exports: [ApiresultService],
})
export class ApiresultModule {}
