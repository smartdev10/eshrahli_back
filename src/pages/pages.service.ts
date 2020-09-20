import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PageDto } from './interfaces/page.dto';
import { Page } from 'src/entities/pages.entity';


@Injectable()
export class PageService {
    
    constructor(
        @InjectRepository(Page)
        private pageRepository: Repository<Page>,
    ) {}

    async findOnePage(id: number) {
        return await this.pageRepository.findOneOrFail(id)
    }
    async findOnePageBySlug(slug: string) {
        return await this.pageRepository.findOne({
            where :{
                slug
            }
        })
    }
    async insertPage(data : PageDto ) {
        return await this.pageRepository.save(data);
    }

    async findAllPages() {
       return await this.pageRepository.find({
          order :{
            createdAt:"DESC"
          }
       });
    }

    async deletePage(ids: number[]) {
        return await  this.pageRepository.delete(ids);
    }

    async updatePage(id: number, data: PageDto) {
        return await this.pageRepository.update(id, data);
    }
      
}
