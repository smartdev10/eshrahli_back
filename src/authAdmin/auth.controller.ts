import { Controller , Post , Body , Res } from '@nestjs/common';
import { AuthAdminService } from './authadmin.service';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AdminUser } from 'src/entities/adminuser.entity';

@Controller('api/admin')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

  @Post('register')
  async register(
    @Body() adminUserDto : AdminUser,
    @Res() res: Response): Promise<Response> {
    await this.authService.createUser(adminUserDto);
    return res.status(200).json({message: 'registred'});
 }

 @Post('logout')
 async logout(
   @Res() res: Response): Promise<Response> {
 
   res.clearCookie('assence_admin_access');
   res.clearCookie('assence_admin_jid');
   return res.status(200).json({message: 'loggedout'});
 }

 @Post('refreshToken')
 async refresh(
   @Body('userId') userId : number,
   @Res() res: Response): Promise<Response> {

   const user = await this.authService.findOneUserById(userId);
   if (!user) {
    return res.status(404).json({message: 'Email not Correct'});
   }
   const Token  = sign({ userId: user.id ,  role:user.role ,  username: user.username }, 'ACCESS_TOKEN_SECRET');
   const accessToken = Token.split('.').slice(0, 2).join('.');
   const jid = Token.split('.').pop();
   res.cookie('assence_admin_access', accessToken);
   res.cookie('assence_admin_jid', jid , {
    httpOnly: true,
   });
   return res.status(200).json({message: 'refreshed'});
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
        const Token  = sign({ userId: user.id , role:user.role , username: user.username }, 'ACCESS_TOKEN_SECRET');
        const accessToken = Token.split('.').slice(0, 2).join('.');
        const jid = Token.split('.').pop();
        res.cookie('assence_admin_access', accessToken);
        res.cookie('assence_admin_jid', jid , {
         httpOnly: true,
        });
       return res.status(200).json({ username: user.username , role: user.role });
     } catch (error) {
       return res.status(404).json({message: error.message});
     }
  }
}
