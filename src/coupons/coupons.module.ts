import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponService } from './coupons.service';
import { CouponController } from './coupons.controller';
import { Coupon } from 'src/entities/coupons.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coupon])],
    controllers: [CouponController],
    providers: [CouponService],
})
export class CouponModule {}
