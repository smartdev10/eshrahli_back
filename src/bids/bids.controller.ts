import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { BidsService } from './bids.service';
import { Response } from 'express';
import { BidsDto } from './interfaces/bids.dto';
import { Bid } from 'src/entities/bids.entity';

@Controller('api/bids')
export class BidsController {
    constructor(private readonly bidsService: BidsService) {}

    @Get(':id')
    findAllNationalties(@Param('id') id: number) : Promise<Bid[]>{
      return this.bidsService.findAllBids(id);
    }

    @Get(':id')
    async findOneFavorite(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const bid =  await this.bidsService.findOneBid(id);
            return res.status(HttpStatus.OK).json(bid);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createFavorite(@Body() body : BidsDto , @Res() res: Response): Promise<Response> {
      try {
          await this.bidsService.insertBid(body);
          return res.status(200).json({message: 'Bid Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteFavorite(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.bidsService.findOneBid(ids);
          return res.status(200).json({message: 'Bid Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateFavorite(@Param('id') id: number , @Body() body: BidsDto, @Res() res: Response): Promise<Response> {
        try {
          await this.bidsService.updateBid(id, body);
          return res.status(200).json({message: 'Bid Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
