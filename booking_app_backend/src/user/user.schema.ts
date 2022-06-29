import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, ObjectId } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop([String])
    role: string[];

    @Prop([String])
    booking: string[];
}

export const UserSchema = SchemaFactory.createForClass(User)