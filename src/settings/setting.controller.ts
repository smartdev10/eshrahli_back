import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { SettingsService } from './setting.service';
import { Response } from 'express';
import { SettingDto } from './interfaces/setting.dto';
import { Setting } from 'src/entities/settings.entity';

@Controller('api/settings')
export class SettingsController {
    constructor(private readonly settingService: SettingsService) {}
    @Get()
    findAllSettings() : Promise<Setting[]>{
      return this.settingService.findAllSetting();
    }

    @Get(':slug')
    async findOneSetting(@Param('slug') slug: string  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const setting =  await this.settingService.findOneSetting(slug);
            return res.status(HttpStatus.OK).json(setting);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createSetting(@Body() settingDto : SettingDto , @Res() res: Response): Promise<Response> {
      try {
          await this.settingService.insertSetting(settingDto);
          return res.status(200).json({message: 'Setting Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteSetting(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.settingService.deleteSetting(ids);
          return res.status(200).json({message: 'Setting Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateSetting(@Param('id') id: number , @Body() body: SettingDto, @Res() res: Response): Promise<Response> {
        try {
          await this.settingService.updateSetting(id, body);
          return res.status(200).json({message: 'Setting Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
