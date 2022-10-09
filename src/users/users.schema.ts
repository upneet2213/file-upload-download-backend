import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  files: Array<Express.Multer.File>;
}

export const UserSchema = SchemaFactory.createForClass(User);
