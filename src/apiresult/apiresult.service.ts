import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiresultService {
  message(code: number, message: string) {
    return {
      code: code,
      message: message,
    };
  }
  MESSAGE(code: number, message: string, data: any) {
    return {
      code: code,
      message: message,
      data: data,
    };
  }
}
