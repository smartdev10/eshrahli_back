import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { SRequest } from 'src/entities/requests.entity';
import { ONESIGNAL_MODULE_OPTIONS , STUDENT_ONSIGNAL } from 'src/onesignal/interface/onesignal.config';
import { TeacherOneSignalService } from 'src/onesignal/teacherSignal.service';
import { TeacherService } from 'src/teachers/teachers.service';
import { Teacher } from 'src/entities/teachers.entity';
import { Level } from 'src/entities/levels.entity';
import { Subject } from 'src/entities/subjects.entity';
import { OneSignalModule } from 'src/onesignal/onesignal.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OneSignal = require('onesignal-node');
import { NotificationEntity } from 'src/entities/notifications.entity';
import { StudentNotificationEntity } from 'src/entities/student_notifications.entity';
import { NotificationService } from 'src/notifications/notifications.service';


// const StudentOneSignalProvider = {
//     provide: STUDENT_ONSIGNAL,
//     useValue: StudentOneSignalService,
// };



@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:'.env'
        }),
        TypeOrmModule.forFeature([SRequest]), 
        TypeOrmModule.forFeature([Teacher]), 
        TypeOrmModule.forFeature([Level]), 
        TypeOrmModule.forFeature([Subject]),
        TypeOrmModule.forFeature([NotificationEntity]),
        TypeOrmModule.forFeature([StudentNotificationEntity]),
        OneSignalModule.register({
            appId:process.env.TEACHER_APP_ID,
            restApiKey:process.env.TEACHER_REST_API_KEY,
        })
    ],
    controllers: [RequestController],
    providers: [RequestService , TeacherOneSignalService , {
        provide: ONESIGNAL_MODULE_OPTIONS,
        useFactory :(configService : ConfigService) => {
            return  new OneSignal.Client(
                configService.get('TEACHER_APP_ID'),
                configService.get('TEACHER_REST_API_KEY'),
              )
        },
        inject:[ConfigService]
    } , TeacherService , NotificationService],
})
export class RequestModule {}
