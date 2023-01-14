import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Address } from 'src/types';
import { Hasher } from 'src/utilities/hasher';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({ type: Object, required: false })
  address?: Address;

  comparePasswords: (pwd: string) => Promise<boolean>;
  hashPwd: (pwd: string) => Promise<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', preSave);

async function preSave() {
  const user = this as UserDocument;
  if (user.isModified('password')) {
    user.password = await user.hashPwd(user.password);
  }
}

UserSchema.methods.hashPwd = async function (password) {
  const pwd = await Hasher.generateHash(password);
  return pwd;
};
UserSchema.methods.comparePasswords = async function (password) {
  const user = this as UserDocument;
  const match = await Hasher.compare(password, user.password);

  return match;
};
