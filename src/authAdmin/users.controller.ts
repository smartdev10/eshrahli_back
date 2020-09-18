import { Controller , Post , Body , Res , Get } from '@nestjs/common';
import { AuthAdminService } from './authadmin.service';
import { Response } from 'express';
import { AdminUser } from 'src/entities/adminuser.entity';

@Controller('api/admin/users')
export class UserAdminController {
  constructor(private readonly authService: AuthAdminService) {}

  @Get()
  findAllUsers() : Promise<AdminUser[]>{
    return this.authService.findAllUsers();
  }

}
