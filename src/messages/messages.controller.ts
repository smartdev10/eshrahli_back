import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { MessageService } from './messages.service';
import { Response } from 'express';
import { MessageDto } from './interfaces/message.dto';
import { Message } from 'src/entities/messages.entity';

@Controller('api/messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}
    @Get()
    findAllMessages() : Promise<Message[]>{
      return this.messageService.findAllMessages();
    }

    @Get(':id')
    async findOneMessage(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const message =  await this.messageService.findOneMessage(id);
            return res.status(HttpStatus.OK).json(message);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createMessage(@Body() body : MessageDto , @Res() res: Response): Promise<Response> {
      try {
          await this.messageService.insertMessage(body);
          return res.status(200).json({message: 'Message Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteMessage(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.messageService.deleteMessage(ids);
          return res.status(200).json({message: 'Message Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateMessage(@Param('id') id: number , @Body() body: MessageDto, @Res() res: Response): Promise<Response> {
        try {
          await this.messageService.updateMessage(id, body);
          return res.status(200).json({message: 'Message Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
