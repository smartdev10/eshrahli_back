import { Controller, Get, Param, Render } from '@nestjs/common';
import { RequestService } from './requests/requests.service';

@Controller()
export class AppController {

  constructor(private readonly requestService: RequestService) {}

  @Get()
  index() {
    return "Eshrahli";
  }

  @Get('/payement/:id')
  @Render('index')
  async payement(@Param('id') id : number) {
    if(id){
      const request = await this.requestService.findOne(id)
      if(request){
        return { id , total:request.total };
      }
      return 'Request Not Found!!'
    }
    return 'Request Id Not Valid!!'
  }

  @Get('/redirect')
  @Render('redirect')
  redirect() {
    return { message: 'Hello world!' };
  }
}
