import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { AuthStudentController } from './auth.students.controller';
import { Student } from 'src/entities/students.entity';
import { TwilioService } from 'src/twilio/twilio.service';
import { TWILIO_CONFIG_TOKEN } from 'src/twilio/constants';


const TwilioProvider = {
    provide: TWILIO_CONFIG_TOKEN,
    useValue: TwilioService,
};

@Module({
    imports: [
        TypeOrmModule.forFeature([Student]),
    ],
    controllers: [StudentController,AuthStudentController],
    providers: [StudentService , TwilioService , TwilioProvider],
})
export class StudentModule {}
