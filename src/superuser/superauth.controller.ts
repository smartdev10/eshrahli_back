import { Controller , Post , Body , Res } from '@nestjs/common';
import { SuperAuthService } from './superauth.service';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SuperUser } from 'src/entities/superuser.entity';

@Controller('api/super')
export class SuperAuthController {
  constructor(private readonly superuserService: SuperAuthService) {}

  @Post('register')
  async register(@Body() adminUserDto : SuperUser, @Res() res: Response): Promise<Response> {
    await this.superuserService.createUser(adminUserDto);
    return res.status(200).json({message: 'registred'});
 }

 @Post('logout')
 async logout(@Res() res: Response): Promise<Response> {
   return res.status(200).json({  result : true , message: 'Successfully logged out'});
 }

 @Post('refreshToken')
 async refresh(@Body('userId') userId : number, @Res() res: Response): Promise<Response> {

   const user = await this.superuserService.findOneUserById(userId);
   if (!user) {
    return res.status(404).json({message: 'Email not Correct'});
   }
   const Token  = sign({ userId: user.id  ,  username: user.username }, process.env.ACCESS_TOKEN_SECRET);
   const accessToken = Token.split('.').slice(0, 2).join('.');
   const jid = Token.split('.').pop();
   res.cookie('eshrahli_admin_access', accessToken);
   res.cookie('eshrahli_admin_jid', jid , {
    httpOnly: true,
   });
   return res.status(200).json({message: 'refreshed'});
 }

  @Post('login')
   async login(@Body('username') username: string, @Body('password') password: string , @Res() res: Response): Promise<Response> {
     try {
        const user = await this.superuserService.findOneUser(username);
        if (!user) {
          return res.status(404).json({message: 'Username not Correct'});
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return res.status(404).json({message: 'Password not Correct'});
        }
        delete user.password
        const access_token  = sign({ userId: user.id  , username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ result : true , user , token : { access_token , token_type : 'bearer' } });
     } catch (error) {
       return res.status(404).json({message: error.message});
     }
  }
}
