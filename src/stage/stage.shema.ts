import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const getFistUppercase = (v: string): string => {
  const otherText = v.slice(1, v.length);
  return `${v[0].toUpperCase()}${otherText}`;
};

@Schema()
export class Stage {
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
    get: getFistUppercase,
    set: (v) => v.toLowerCase(),
  })
  title: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  color: string;
  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;
}

export type StageDocument = Stage & Document;

export const StageSchema = SchemaFactory.createForClass(Stage);
