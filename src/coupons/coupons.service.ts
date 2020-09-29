import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CouponDto } from './interfaces/coupon.dto';
import { Coupon } from 'src/entities/coupons.entity';


@Injectable()
export class CouponService {
    
    constructor(
        @InjectRepository(Coupon)
        private couponRepository: Repository<Coupon>,
    ) {}

    async findOneCoupon(id: number) {
        return await this.couponRepository.findOneOrFail(id)
    }

    async verifyCoupon(code: string) {
        return await this.couponRepository.findOne({
            where : {
                code ,
                status:'active',
            }
        })
    }

    async insertCoupon(data : CouponDto ) {
        return await this.couponRepository.save(data);
    }

    async findAllCoupons() {
       return await this.couponRepository.find({
          order :{
            createdAt:"DESC"
          }
       });
    }

    async deleteCoupon(ids: number[]) {
        return await  this.couponRepository.delete(ids);
    }

    async updateCoupon(id: number, data: CouponDto) {
        return await this.couponRepository.update(id, data);
    }
      
}
