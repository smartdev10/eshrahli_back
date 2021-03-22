import { HttpModule, HttpService, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { AuthStudentController } from './auth.students.controller';
import { Student } from 'src/entities/students.entity';
import { TwilioService } from 'src/twilio/twilio.service';
import { TWILIO_CONFIG_TOKEN } from 'src/twilio/constants';
import { SRequest } from 'src/entities/requests.entity';


const TwilioProvider = {
    provide: TWILIO_CONFIG_TOKEN,
    useValue: TwilioService,
};

@Module({
    imports: [
        TypeOrmModule.forFeature([Student]),
        TypeOrmModule.forFeature([SRequest]),
        HttpModule
    ],
    controllers: [StudentController,AuthStudentController],
    providers: [StudentService , TwilioService , HttpService , TwilioProvider],
})
export class StudentModule {}
