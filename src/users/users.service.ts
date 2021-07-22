import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export type User = any;

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private userRespository: Repository<UserEntity>) { }

  async findOne(username: string): Promise<User | undefined> {
    
    return await this.userRespository.find({
      select: ["userId", "username", "password"],
      where: [{ "username": username }]
    });
  }

  async getUser(getID: number): Promise<UserEntity[]> {
    return await this.userRespository.find({
      select: ["userId", "name", "email"],
      where: [{ "userId": getID }]
    });
  }
  
  async getAll(): Promise<UserEntity[]> {
    return await this.userRespository.find({select: ["userId", "name", "email"]});
  }

  async insert(user:UserEntity) {
    return await this.userRespository.save(user);
  }

  async remove(getID: number): Promise<void> {
    let userDel:any =  this.getUser(getID);
    await this.userRespository.delete(getID);
    return await userDel;
  }
}
