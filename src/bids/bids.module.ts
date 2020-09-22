import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { Bid } from 'src/entities/bids.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bid])],
    controllers: [BidsController],
    providers: [BidsService],
})
export class BidsModule {}
