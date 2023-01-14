import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];
  async create() {
    /// create user by using UserModel
  }

  async update() {
    /// update user by using UserModel
  }

  async findAll() {
    /// find all users by using UserModel
  }

  async findOne(email: string): Promise<Partial<User> | undefined> {
    /// find specific user by using UserModel
    return this.users.find((user) => user.email === email);
  }

  async delete() {
    /// delete specific user by using UserModel
  }
}
