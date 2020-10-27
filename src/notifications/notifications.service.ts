import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NotificationDto } from './interfaces/notification.dto';
import { NotificationEntity } from 'src/entities/notifications.entity';


@Injectable()
export class NotificationService {
    
    constructor(
        @InjectRepository(NotificationEntity)
        private notificationRepository: Repository<NotificationEntity>,
    ) {}

    async findOneNotification(id: number) {
        return await this.notificationRepository.findOneOrFail(id)
    }
    async insertNotification(data : NotificationDto ) {
        return await this.notificationRepository.save(data);
    }

    async findAllNotifications(teacher:number) {
       return await this.notificationRepository.find({
           where:{
               teacher
           }
       });
    }

    async deleteNotification(id: number) {
        return await  this.notificationRepository.delete(id);
    }

    async updateNotification(id: number, data: NotificationDto) {
        return await this.notificationRepository.update(id, data);
    }
      
}
