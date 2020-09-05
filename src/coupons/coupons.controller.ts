import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { CouponService } from './coupons.service';
import { Response } from 'express';
import { CouponDto } from './interfaces/coupon.dto';
import { Coupon } from 'src/entities/coupons.entity';

@Controller('api/coupons')
export class CouponController {
    constructor(private readonly couponService: CouponService) {}
    @Get()
    findAllCoupons() : Promise<Coupon[]>{
      return this.couponService.findAllCoupons();
    }

    @Get(':id')
    async findOneCoupon(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const coupon =  await this.couponService.findOneCoupon(id);
            return res.status(HttpStatus.OK).json(coupon);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createCoupon(@Body() data : CouponDto , @Res() res: Response): Promise<Response> {
      try {
          await this.couponService.insertCoupon(data);
          return res.status(200).json({message: 'Coupon Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteCoupon(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.couponService.deleteCoupon(ids);
          return res.status(200).json({message: 'Coupon Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateCoupon(@Param('id') id: number , @Body() body: CouponDto, @Res() res: Response): Promise<Response> {
        try {
          await this.couponService.updateCoupon(id, body);
          return res.status(200).json({message: 'Coupon Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
