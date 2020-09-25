import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { SRequest } from 'src/entities/requests.entity';
import { ONESIGNAL_MODULE_OPTIONS } from 'src/onesignal/interface/onesignal.config';
import { OneSignalService } from 'src/onesignal/onesignal.service';
import { TeacherService } from 'src/teachers/teachers.service';
import { Teacher } from 'src/entities/teachers.entity';
import { Level } from 'src/entities/levels.entity';
import { Subject } from 'src/entities/subjects.entity';



const OneSignalProvider = {
    provide: ONESIGNAL_MODULE_OPTIONS,
    useValue: OneSignalService,
};

@Module({
    imports: [
        TypeOrmModule.forFeature([SRequest]) , 
        TypeOrmModule.forFeature([Teacher]) , 
        TypeOrmModule.forFeature([Level]), 
        TypeOrmModule.forFeature([Subject]),],
    controllers: [RequestController],
    providers: [RequestService , OneSignalService , OneSignalProvider , TeacherService ],
})
export class RequestModule {}
