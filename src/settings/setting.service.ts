import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SettingDto } from './interfaces/setting.dto';
import { Setting } from 'src/entities/settings.entity';


@Injectable()
export class SettingsService {
    
    constructor(
        @InjectRepository(Setting)
        private settingRepository: Repository<Setting>,
    ) {}

    async findOneSetting(slug: string) {
        return await this.settingRepository.findOne({
            where :{
                slug
            }
        })
    }
    async insertSetting(data : SettingDto ) {
        return await this.settingRepository.save(data);
    }

    async findAllSetting() {
       return await this.settingRepository.find({
        order :{
            createdAt:"DESC"
          }
       });
    }

    async deleteSetting(ids: number[]) {
        return await  this.settingRepository.delete(ids);
    }

    async updateSetting(id: number, data: SettingDto) {
        return await this.settingRepository.update(id, data);
    }
      
}
