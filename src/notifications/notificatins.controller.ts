import { Controller, Get , Res , Param , HttpStatus, HttpException } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { Response } from 'express';

@Controller('api/notifications')
export class NotificationController {
    constructor(private readonly notifyService: NotificationService) {}

    @Get('teacher/:id')
    async findAllTeacherNotifications(@Param('id') id : number ,  @Res() res: Response) : Promise<Response>{
      try {
        const notifications = await this.notifyService.findAllTeacherNotifications(id);
        return res.status(HttpStatus.OK).json(notifications ? notifications : []);
      } catch (error) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
        }, 400);
      }
    }

    @Get('student/:id')
    async findAllStudentNotifications(@Param('id') id : number ,  @Res() res: Response) : Promise<Response>{
        try {
            const notifications = await this.notifyService.findAllStudentNotifications(id);
            console.log(notifications)
            return res.status(HttpStatus.OK).json(notifications ? notifications : []);
          } catch (error) {
            console.log(error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
          }    
    }

}
