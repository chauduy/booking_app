import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Booking, BookingDocument } from "./booking.schema";
import { CreateBookingDto, UpdateBookingDto } from "./dto";

@Injectable({})
export class BookingService {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) { }

    async createBooking(dto: CreateBookingDto) {
        try {
            const newBooking = await this.bookingModel.create(dto)
            return newBooking;
        } catch (error) {
            throw error;
        }
    }

    async updateBooking(dto: UpdateBookingDto) {
        const filter = { _id: dto._id }
        const update = { status: dto.status, update_by: dto.update_by, event_date: dto.event_date, reason: dto.reason }
        try {
            const booking = await this.bookingModel.findOneAndUpdate(filter, update, { new: true })
            if (!booking) {
                throw new NotFoundException();
            }
            return booking;
        } catch (error) {
            throw error;
        }
    }

    async getAllBooking() {
        try {
            const bookings = await this.bookingModel.find({})
            if (!bookings) {
                throw new NotFoundException();
            }
            return bookings;
        } catch (error) {
            throw error;
        }
    }

    async getBookingByUser(user_id: any) {
        try {
            const bookingByUser = await this.bookingModel.find({ create_by: user_id });
            if (!bookingByUser) {
                throw new NotFoundException();
            }
            return bookingByUser;
        } catch (error) {
            throw error;
        }
    }
}