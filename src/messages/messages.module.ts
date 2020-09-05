import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './messages.service';
import { MessageController } from './messages.controller';
import { Message } from 'src/entities/messages.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {}
