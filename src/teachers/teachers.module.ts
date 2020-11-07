import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teachers.entity';
import { TeacherService } from './teachers.service';
import { TeacherController } from './teachers.controller';
import { AuthTeacherController } from './auth.teacher.controller';
import { SubjectsService } from 'src/subjects/subjects.service';
import { LevelsService } from 'src/levels/levels.service';
import { Level } from 'src/entities/levels.entity';
import { Subject } from 'src/entities/subjects.entity';
import { TwilioService } from 'src/twilio/twilio.service';
import { TWILIO_CONFIG_TOKEN } from 'src/twilio/constants';
import { SRequest } from 'src/entities/requests.entity';


@Module({
    imports: [ 
        TypeOrmModule.forFeature([Teacher]) , 
        TypeOrmModule.forFeature([Level]), 
        TypeOrmModule.forFeature([Subject]),
        TypeOrmModule.forFeature([SRequest]),
    ],
    controllers: [ TeacherController, AuthTeacherController ],
    providers: [ TeacherService , SubjectsService , LevelsService , TwilioService,  
    {
        provide: TWILIO_CONFIG_TOKEN,
        useValue: TwilioService,
    }
  ],
   
})
export class TeacherModule {}
