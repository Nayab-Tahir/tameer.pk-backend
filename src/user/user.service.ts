import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async createUser() {
    /// create user by using UserModel
  }

  async updateUser() {
    /// update user by using UserModel
  }

  async findAllUsers() {
    /// find all users by using UserModel
  }

  async findUser() {
    /// find specific user by using UserModel
  }

  async deleteUser() {
    /// delete specific user by using UserModel
  }
}
