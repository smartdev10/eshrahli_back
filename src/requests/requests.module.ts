import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { SRequest } from 'src/entities/requests.entity';
import { ONESIGNAL_MODULE_OPTIONS , STUDENT_ONSIGNAL } from 'src/onesignal/interface/onesignal.config';
import { TeacherOneSignalService } from 'src/onesignal/teacherSignal.service';
import { StudentOneSignalService } from 'src/onesignal/studentSignal.service';
import { TeacherService } from 'src/teachers/teachers.service';
import { Teacher } from 'src/entities/teachers.entity';
import { Level } from 'src/entities/levels.entity';
import { Subject } from 'src/entities/subjects.entity';
import { OneSignalModule } from 'src/onesignal/onesignal.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const TeacherOneSignalProvider = {
    provide: ONESIGNAL_MODULE_OPTIONS,
    useValue: TeacherOneSignalService,
};

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
        OneSignalModule.register({
            appId:process.env.TEACHER_APP_ID,
            restApiKey:process.env.TEACHER_REST_API_KEY,
        })
    ],
    controllers: [RequestController],
    providers: [RequestService , TeacherOneSignalService , TeacherOneSignalProvider , TeacherService],
})
export class RequestModule {}
