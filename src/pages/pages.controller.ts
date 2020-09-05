import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { PageService } from './pages.service';
import { Response } from 'express';
import { PageDto } from './interfaces/page.dto';
import { Page } from 'src/entities/pages.entity';

@Controller('api/pages')
export class PageController {
    constructor(private readonly pageService: PageService) {}
    @Get()
    findAllPage() : Promise<Page[]>{
      return this.pageService.findAllPages();
    }

    @Get(':id')
    async findOnePage(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const page =  await this.pageService.findOnePage(id);
            return res.status(HttpStatus.OK).json(page);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createPage(@Body() body : PageDto , @Res() res: Response): Promise<Response> {
      try {
          await this.pageService.insertPage(body);
          return res.status(200).json({message: 'Page Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deletePage(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.pageService.deletePage(ids);
          return res.status(200).json({message: 'Page Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updatePage(@Param('id') id: number , @Body() body: PageDto, @Res() res: Response): Promise<Response> {
        try {
          await this.pageService.updatePage(id, body);
          return res.status(200).json({message: 'Page Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
