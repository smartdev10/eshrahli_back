import { Controller , Post , Body , Res , HttpException , HttpStatus } from '@nestjs/common';
import { AuthAdminService } from './authadmin.service';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AdminUser } from 'src/entities/adminuser.entity';

@Controller('api/admin')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

@Post('register')
async register(@Body() adminUserDto : AdminUser, @Res() res: Response): Promise<Response> {
  try {
    await this.authService.createUser(adminUserDto);
    return res.status(200).json({message: 'registred'});
  } catch (error) {
    console.log(error)
    if (error.code === '23505' && error.constraint === 'UQ_admin_mobile' && error.code === '23505' && error.constraint === 'UQ_admin_username') {
      throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'duplicate phonenumber and username',
      }, 400);
     }
    if (error.code === '23505' && error.constraint === 'UQ_admin_username') {
      throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'duplicate username',
      }, 400);
   }
   if (error.code === '23505' && error.constraint === 'UQ_admin_mobile') {
    throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'duplicate phonenumber',
    }, 400);
   }
    throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        detail:error.detail,
        error: error.message,
    }, 400);
  }
 }

 @Post('logout')
 async logout(@Res() res: Response): Promise<Response> {
   return res.status(200).json({  result : true , message: 'Successfully logged out'});
 }


 @Post('login')
 async login(@Body('username') username: string, @Body('password') password: string , @Res() res: Response): Promise<Response> {
   try {
      const user = await this.authService.findOneUser(username);
      if (!user) {
        return res.status(404).json({message: 'Username not Correct'});
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(404).json({message: 'Password not Correct'});
      }
      delete user.password
      const access_token  = sign({ userId: user.id , role:user.role , username: user.username , mobile:user.mobile , name:user.name }, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json({ result : true , user , token : { access_token , token_type : 'bearer' } });
    } catch (error) {
      return res.status(404).json({message: error.message});
    }
}
}
