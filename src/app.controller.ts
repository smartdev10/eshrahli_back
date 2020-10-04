import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  index() {
    return "Eshrahli";
  }

  @Get('/payement/:id')
  @Render('index')
  payement(@Param('id') id : number) {
    return { id };
  }

  @Get('/redirect')
  @Render('redirect')
  redirect() {
    return { message: 'Hello world!' };
  }
}
