import { Controller  , Body , Res , Get , Post, HttpException , HttpStatus } from '@nestjs/common';
import { AuthAdminService } from './authadmin.service';
import { Response } from 'express';
import { AdminUser } from 'src/entities/adminuser.entity';
import { TwilioService } from 'src/twilio/twilio.service';
import { AdminUserForgot , AdminUserReset } from './interfaces/adminusers.dto';
import { sign } from 'jsonwebtoken';


@Controller('api/admin/users')
export class UserAdminController {
  constructor(private readonly authService: AuthAdminService ,  private readonly twilioService: TwilioService) {}

  @Get()
  findAllUsers() : Promise<AdminUser[]>{
    return this.authService.findAllUsers();
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data : AdminUserForgot , @Res() res: Response): Promise<Response> {
    try {
        const user = await this.authService.findOneUserByPhone(data.mobile)
        if(user){
          await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({to:user.mobile,channel:'sms'})
          return res.status(200).json({ result:true , message: 'Verification Code Sent'});
        }
        return res.status(404).json({message: 'User Not Found'});
    } catch (error) {
      console.log(error)
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        }, 400);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() data : AdminUserReset , @Res() res: Response): Promise<Response> {
    try {
        if(data.password === ''){
            delete data.password
        }
        const user = await this.authService.findOneUserByPhone(data.mobile)
        const formData = Object.assign(user , { ...data })
        await this.authService.updateUser(formData);
        return res.status(200).json({result:true , message: 'password changed'});
    } catch (error) {
      console.log(error)
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        }, 400);
    }
  }

  @Post('verify')
  async verify(@Body('mobile') mobile : string , @Body('code') code : string , @Res() res: Response): Promise<Response> {
    try {
        const user = await this.authService.findOneUserByPhone(mobile)
        if(user){
          const verificationCheck = await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID)
          .verificationChecks
          .create({to:user.mobile , code})
          if(verificationCheck.valid){
            const verify_token  = sign({ userId: user.id , role:user.role , username: user.username , mobile:user.mobile }, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({result:true , message: 'Code is Valid' , token : { verify_token , token_type : 'bearer' }});
          }
          return res.status(HttpStatus.BAD_REQUEST).json({message: 'Code is Not Valid'});
        }
        return res.status(404).json({message: 'User Not Found'});
    } catch (error) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        }, 400);
    }
  }

}
