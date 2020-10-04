import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/payement')
  @Render('index')
  payement() {
    return { message: 'Hello world!' };
  }

  @Get('/redirect')
  @Render('redirect')
  redirect() {
    return { message: 'Hello world!' };
  }
}
