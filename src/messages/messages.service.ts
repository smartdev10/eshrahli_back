import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MessageDto } from './interfaces/message.dto';
import { Message } from 'src/entities/messages.entity';


@Injectable()
export class MessageService {
    
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}

    async findOneMessage(id: number) {
        return await this.messageRepository.findOneOrFail(id)
    }
    async insertMessage(data : MessageDto ) {
        return await this.messageRepository.save(data);
    }

    async findAllMessages() {
       return await this.messageRepository.find({
        order :{
            createdAt:"DESC"
          }
       });
    }

    async deleteMessage(ids: number[]) {
        return await  this.messageRepository.delete(ids);
    }

    async updateMessage(id: number, data: MessageDto) {
        return await this.messageRepository.update(id, data);
    }
      
}
