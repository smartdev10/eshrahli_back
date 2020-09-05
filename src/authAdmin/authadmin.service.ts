import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from 'src/entities/adminuser.entity';


@Injectable()
export class AuthAdminService  {

  constructor(
    @InjectRepository(AdminUser)
    private adminRepository: Repository<AdminUser>,
   ) {}


  createUser = async (adminUserDto: AdminUser) : Promise<AdminUser> => {
    const entity = Object.assign(new AdminUser(), adminUserDto);
    return await this.adminRepository.save(entity);
  };

  findOneUserById = async (id : number ): Promise<AdminUser> => {
    return await this.adminRepository.findOne({
      where : { id },
      select:['id','username' , 'role','status']
    })
  };

  findOneUser = async (username: string ): Promise<AdminUser> => {
    return await this.adminRepository.findOne({
      where : { username },
      select:['id','username','status' , 'role','password']
    })
  };
}
