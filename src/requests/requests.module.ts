import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { SRequest } from 'src/entities/requests.entity';
import { ONESIGNAL_MODULE_OPTIONS , TEACHER_ONSIGNAL } from 'src/onesignal/interface/onesignal.config';
import { OneSignalService } from 'src/onesignal/onesignal.service';
import { TeacherService } from 'src/teachers/teachers.service';
import { Teacher } from 'src/entities/teachers.entity';
import { Level } from 'src/entities/levels.entity';
import { Subject } from 'src/entities/subjects.entity';
import { OneSignalModule } from 'src/onesignal/onesignal.module';
import { ConfigService } from '@nestjs/config';
import OneSignal = require('onesignal-node');

const OneSignalProvider = {
    provide: ONESIGNAL_MODULE_OPTIONS,
    useValue: OneSignalService,
};

const clientTeacherFactory = {
    provide: ONESIGNAL_MODULE_OPTIONS,
    useFactory: (configService: ConfigService) => {
      return new OneSignal.Client(
        configService.get('TEACHER_APP_ID'),
        configService.get('TEACHER_REST_API_KEY')
      );
    },
    inject: [ConfigService],
  };

@Module({
    imports: [
        TypeOrmModule.forFeature([SRequest]) , 
        TypeOrmModule.forFeature([Teacher]) , 
        TypeOrmModule.forFeature([Level]), 
        TypeOrmModule.forFeature([Subject]),
        OneSignalModule.register({
            name:TEACHER_ONSIGNAL,
            appId:process.env.TEACHER_APP_ID,
            restApiKey:process.env.TEACHER_REST_API_KEY,
        }),
    ],
    controllers: [RequestController],
    providers: [RequestService , OneSignalService , OneSignalProvider , TeacherService, clientTeacherFactory ,ConfigService],
})
export class RequestModule {}
