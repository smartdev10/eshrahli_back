import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/entities/notifications.entity';
import { NotificationService } from './notifications.service';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity])],
    controllers: [],
    providers: [NotificationService],
})
export class NotificationModule {}
