import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperUser } from 'src/entities/superuser.entity';


@Injectable()
export class SuperAuthService  {

  constructor(@InjectRepository(SuperUser) private superUserRepository: Repository<SuperUser>) {}


  findAllUsers = async () => {
    return await this.superUserRepository.find({});
  }

  createUser = async (adminUserDto: SuperUser) : Promise<SuperUser> => {
    const entity = Object.assign(new SuperUser(), adminUserDto);
    console.log(entity)
    return await this.superUserRepository.save(entity);
  };

  findOneUserById = async (id : number ): Promise<SuperUser> => {
    return await this.superUserRepository.findOne({
      where : { id },
      select:['id','username','status']
    })
  };

  findOneUser = async (username: string ): Promise<SuperUser> => {
    return await this.superUserRepository.findOne({
      where : { username },
      select:['id','username','status' ,'password']
    })
  };

}
