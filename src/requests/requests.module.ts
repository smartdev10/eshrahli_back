import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { SRequest } from 'src/entities/requests.entity';
import { ONESIGNAL_MODULE_OPTIONS } from 'src/onesignal/interface/onesignal.config';
import { OneSignalService } from 'src/onesignal/onesignal.service';
import { TeacherService } from 'src/teachers/teachers.service';
import { Teacher } from 'src/entities/teachers.entity';
import { StudentService } from 'src/students/students.service';
import { Student } from 'src/entities/students.entity';


const OneSignalProvider = {
    provide: ONESIGNAL_MODULE_OPTIONS,
    useValue: OneSignalService,
};

@Module({
    imports: [TypeOrmModule.forFeature([SRequest]) , TypeOrmModule.forFeature([Teacher]) , TypeOrmModule.forFeature([Student])],
    controllers: [RequestController],
    providers: [RequestService , OneSignalService , OneSignalProvider , TeacherService , StudentService ],
})
export class RequestModule {}
