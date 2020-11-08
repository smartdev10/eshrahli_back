import { Between, Brackets, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Teacher } from 'src/entities/teachers.entity';
import { TeacherDto, UpdateTeacherDto , searchTeacher, CreatePassTeacherDto } from './interfaces/teacher.dto';
import { SRequest } from 'src/entities/requests.entity';


@Injectable()
export class TeacherService {
    
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(SRequest)
        private requestsRepository: Repository<SRequest>,
    ) {}

    async findOneTeacher(id: number) {
        return await this.teacherRepository.findOne(id ,{relations:['requests' , 'levels' , 'subjects' , 'city' , 'nationality']})
    }

    async findOneTeacherRequests(id: number) {
        const dt = new Date();
        dt.setDate( dt.getDate() - 14);
        return await this.requestsRepository.find({
            where :{
                id,
                createdAt : Between(dt.toISOString()  , new Date().toISOString()),
                status:"COMPLETED"
            }
        });
    }

    async findOne(teacher: Teacher) {
        return await this.teacherRepository.findOne(teacher)
    }

    async findOneTeacherByPhone(mobile: string) {
        return await this.teacherRepository.findOne({
            relations:['subjects','other_subjects'],
            select:['id','password','mobile'],
            where :{
                mobile
            }
        })
    }

    async insertTeacher(teacherDto : TeacherDto ) {
        const entity = Object.assign(new Teacher(), teacherDto);
        return await this.teacherRepository.save(entity);
    }

    async registerTeacher(teacherDto : TeacherDto ) {
        return await this.teacherRepository.save(teacherDto);
    }

    async startTeacher(teacherDto : TeacherDto ) {
        return await this.teacherRepository.save(teacherDto);
    }

    async retrySearchTeachers(searchData : searchTeacher) { 
        if(searchData.levels){
            return  await this.teacherRepository
            .createQueryBuilder('teacher')
            .innerJoinAndSelect('teacher.city','city')
            .leftJoinAndSelect('teacher.levels', 'level')
            .leftJoinAndSelect('teacher.other_subjects', 'other')
            .leftJoinAndSelect('teacher.subjects', 'subject')
            .where('gender = :gender', { gender: searchData.gender })
            .andWhere('city.id = :city' , { city: searchData.city.id })
            .andWhere('level.id = :level', { level: searchData.levels.id })
            .andWhere(new Brackets(qb => {
               qb.andWhere('other.id = :other' , { other: searchData.subjects.id })
               .orWhere('subject.id = :subject' , { subject: searchData.subjects.id })
            }))
            .getMany();
        } 
        return  await this.teacherRepository
        .createQueryBuilder('teacher')
        .innerJoinAndSelect('teacher.city','city')
        .leftJoinAndSelect('teacher.other_subjects', 'other')
        .leftJoinAndSelect('teacher.subjects', 'subject')
        .where('gender = :gender', { gender: searchData.gender })
        .andWhere('city.id = :city' , { city: searchData.city.id })
        .andWhere(new Brackets(qb => {
           qb.andWhere('other.id = :other' , { other: searchData.subjects.id })
           .orWhere('subject.id = :subject' , { subject: searchData.subjects.id })
        }))
        .getMany();   
    }

    async searchTeachers(searchData : searchTeacher) { 
       if(searchData.levels){
            return  await this.teacherRepository
            .createQueryBuilder('teacher')
            .innerJoinAndSelect('teacher.city','city')
            .leftJoinAndSelect('teacher.levels', 'level')
            .leftJoinAndSelect('teacher.other_subjects', 'other')
            .leftJoinAndSelect('teacher.subjects', 'subject')
            .where('gender = :gender', { gender: searchData.gender })
            .andWhere('city.id = :city' , { city: searchData.city.id })
            .andWhere('level.id = :level', { level: searchData.levels })
            .andWhere(new Brackets(qb => {
            qb.andWhere('other.id = :other' , { other: searchData.subjects })
            .orWhere('subject.id = :subject' , { subject: searchData.subjects })
            }))
            .getMany();
       }   
       return  await this.teacherRepository
        .createQueryBuilder('teacher')
        .innerJoinAndSelect('teacher.city','city')
        .leftJoinAndSelect('teacher.other_subjects', 'other')
        .leftJoinAndSelect('teacher.subjects', 'subject')
        .where('gender = :gender', { gender: searchData.gender })
        .andWhere('city.id = :city' , { city: searchData.city.id })
        .andWhere(new Brackets(qb => {
            qb.andWhere('other.id = :other' , { other: searchData.subjects })
            .orWhere('subject.id = :subject' , { subject: searchData.subjects })
        }))
        .getMany();  
    }

    async findAllTeachers() {
       return await this.teacherRepository.find({
           relations:['subjects' , 'other_subjects' , 'levels' , 'city' , 'nationality'],
           order :{
            createdAt:"DESC"
           }
       });
    }

    async deleteTeacher(ids: number[]) {
        return await  this.teacherRepository.delete(ids);
    }

    async softDeleteTeacher(ids: number[]) {
        return await this.teacherRepository.softDelete(ids);
    }

    async updateTeacher(data: UpdateTeacherDto) {
        return await this.teacherRepository.save(data);
    }

    async updateTeachetPassword(data: CreatePassTeacherDto) {
        return await this.teacherRepository.save(data);
    }
      
}
