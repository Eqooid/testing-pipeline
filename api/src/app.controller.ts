import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  getHelloWithKey(): string {
    return this.appService.getHelloWithKey();
  }

  @Get('db')
  checkDatabase(): Promise<{ connected: boolean }> {
    return this.appService.checkDatabase();
  }
}
