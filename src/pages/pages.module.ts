import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageService } from './pages.service';
import { PageController } from './pages.controller';
import { Page } from 'src/entities/pages.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Page])],
    controllers: [PageController],
    providers: [PageService],
})
export class PageModule {}
