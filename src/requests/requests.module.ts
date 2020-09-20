import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { SRequest } from 'src/entities/requests.entity';
import { ONESIGNAL_MODULE_OPTIONS } from 'src/onesignal/interface/onesignal.config';
import { OneSignalService } from 'src/onesignal/onesignal.service';


const OneSignalProvider = {
    provide: ONESIGNAL_MODULE_OPTIONS,
    useValue: OneSignalService,
};

@Module({
    imports: [TypeOrmModule.forFeature([SRequest])],
    controllers: [RequestController],
    providers: [RequestService , OneSignalService , OneSignalProvider],
})
export class RequestModule {}
