import { Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from 'src/entities/adminuser.entity';
import { UpdateAdminUserDto } from './interfaces/adminusers.dto';


@Injectable()
export class AuthAdminService  {

  constructor(@InjectRepository(AdminUser) private adminRepository: Repository<AdminUser>) {}

  findAllUsersFilter = async (id:number) => {
    return await this.adminRepository.find({
      where :{
        id: Not(id)
      },
      order :{
        createdAt:"DESC"
      }
    });
  }

  findAllUsers = async () => {
    return await this.adminRepository.find({
      order :{
        createdAt:"DESC"
      }
    });
  }

  createUser = async (adminUserDto: AdminUser) : Promise<AdminUser> => {
    const entity = Object.assign(new AdminUser(), adminUserDto);
    return await this.adminRepository.save(entity);
  };

  findOneUserById = async (id : number ): Promise<AdminUser> => {
    return await this.adminRepository.findOne({
      where : { id },
      select:['id','username','role','status']
    })
  };

  findOneUserByPhone = async (mobile : string ): Promise<AdminUser> => {
    return await this.adminRepository.findOne({
      where : { mobile },
      select:['id','username','mobile','status']
    })
  };

  findOneUser = async (username: string ): Promise<AdminUser> => {
    return await this.adminRepository.findOne({
      where : { username , status:"active" },
      select:['id', 'username' , "mobile" , "name" ,'status' , 'role' , 'password']
    })
  };

  updateUser = async (data: UpdateAdminUserDto): Promise<AdminUser> => {
    return await this.adminRepository.save(data)
  };

}
