import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/entities/notifications.entity';
import { StudentNotificationEntity } from 'src/entities/student_notifications.entity';
import { NotificationController } from './notificatins.controller';
import { NotificationService } from './notifications.service';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity]),TypeOrmModule.forFeature([StudentNotificationEntity])],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
