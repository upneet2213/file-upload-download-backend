import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id }).exec();
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async addFile(id: string, file: Express.Multer.File) {
    await this.userModel.updateOne({ id }, { $addToSet: { files: file } });
  }
  async getUserFiles(id: string): Promise<Array<Express.Multer.File>> {
    const user = await this.getUser(id);
    return user.files;
  }
}
