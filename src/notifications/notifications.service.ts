import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NotificationDto , StudentNotificationDto} from './interfaces/notification.dto';
import { NotificationEntity } from 'src/entities/notifications.entity';
import { StudentNotificationEntity } from 'src/entities/student_notifications.entity';


@Injectable()
export class NotificationService {
    
    constructor(
        @InjectRepository(NotificationEntity)
        private notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(StudentNotificationEntity)
        private studentNotificationRepository: Repository<StudentNotificationEntity>,
    ) {}


    async insertTeacherNotification(data : NotificationDto ) {
        return await this.notificationRepository.save(data);
    }

    async insertStudentNotification(data : StudentNotificationDto ) {
        return await this.studentNotificationRepository.save(data);
    }


    async findAllStudentNotifications(student:number) {
       return await this.studentNotificationRepository.find({
           where:{
             student
           },
           relations:['request']
       });
    }    

    async findAllTeacherNotifications(teacher:number) {
        return await this.notificationRepository.find({
            where:{
                teacher
            },
            relations:['request']
        });
     }    
}
