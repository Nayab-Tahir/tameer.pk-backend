import { CreateUserDto } from './dto/create.dto';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.UserModel(user);
    return newUser.save();
  }

  async update(
    user: Partial<CreateUserDto>,
    id: Types.ObjectId,
  ): Promise<UserDocument> | undefined {
    return this.UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...user,
      },
      {
        new: true,
      },
    );
  }

  async findAll(): Promise<UserDocument[] | undefined> {
    return this.UserModel.find().exec();
  }

  async findOneById(id: Types.ObjectId): Promise<UserDocument> | undefined {
    return this.UserModel.findOne({ _id: id }).exec();
  }

  async findOne(email: string): Promise<UserDocument> | undefined {
    return this.UserModel.findOne({ email }).exec();
  }

  async delete(id: Types.ObjectId) {
    return this.UserModel.deleteOne({ _id: id }).exec();
  }
}
