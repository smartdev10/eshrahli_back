import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsService } from './setting.service';
import { SettingsController } from './setting.controller';
import { Setting } from 'src/entities/settings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Setting])],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingModule {}
