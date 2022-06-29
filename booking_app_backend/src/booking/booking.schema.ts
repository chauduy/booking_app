import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import * as mongoose from 'mongoose';
import { User } from "src/user/user.schema";

export type BookingDocument = Booking & Document

@Schema()
export class Booking {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    location: string;

    @Prop()
    proposed_date: string[];

    @Prop({ required: true })
    status: string;

    @Prop()
    event_date: string;

    @Prop()
    create_by: string;

    @Prop({ ref: User.name })
    update_by: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking)