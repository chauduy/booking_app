import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { BookingController } from "./booking.controller";
import { Booking, BookingSchema } from "./booking.schema";
import { BookingService } from "./booking.service";

@Module({
    imports:
        [MongooseModule.forFeature([
            {
                name: Booking.name,
                schema: BookingSchema
            }
        ]),
        ],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
})

export class BookingModule { }