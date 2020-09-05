import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { SRequest } from 'src/entities/requests.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SRequest])],
    controllers: [RequestController],
    providers: [RequestService],
})
export class RequestModule {}
