import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from 'src/entities/adminuser.entity';
import { UpdateAdminUserDto } from './interfaces/adminusers.dto';


@Injectable()
export class AuthAdminService  {

  constructor(@InjectRepository(AdminUser) private adminRepository: Repository<AdminUser>) {}


  findAllUsers = async () => {
    return await this.adminRepository.find({});
  }

  createUser = async (adminUserDto: AdminUser) : Promise<AdminUser> => {
    const entity = Object.assign(new AdminUser(), adminUserDto);
    console.log(entity)
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
      where : { username },
      select:['id', 'username' , 'status' , 'role' , 'password']
    })
  };

  updateUser = async (data: UpdateAdminUserDto): Promise<AdminUser> => {
    return await this.adminRepository.save(data)
  };

}
