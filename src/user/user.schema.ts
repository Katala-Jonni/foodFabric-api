import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RolesEnum } from '@app/common/enum/roles.emum';

const getFistUppercase = (v: string): string => {
  const otherText = v.slice(1, v.length);
  return `${v[0].toUpperCase()}${otherText}`;
};

@Schema()
export class User {
  @Prop({ required: true, unique: true, trim: true })
  email: string;
  @Prop({ trim: true, default: null })
  phone: string;
  @Prop({
    required: true,
    trim: true,
    get: getFistUppercase,
    set: (v) => v.toLowerCase(),
  })
  name: string;
  @Prop({
    required: true,
    trim: true,
    get: getFistUppercase,
    set: (v) => v.toLowerCase(),
  })
  surname: string;
  @Prop({
    trim: true,
    default: null,
    get: getFistUppercase,
    set: (v) => v.toLowerCase(),
  })
  secondName: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: null })
  image: string;
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Basket', default: {} })
  // basket: {};
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({
    type: [String],
    required: true,
    // enum: [RolesEnum.user, RolesEnum.admin],
    default: [RolesEnum.user],
  })
  roles: string[];
}

export type UserDocument = User & Document;

export const UserNestSchema = SchemaFactory.createForClass(User);
