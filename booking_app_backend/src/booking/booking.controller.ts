import { Body, Controller, ForbiddenException, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { User } from "src/user/user.schema";
import { BookingService } from "./booking.service";
import { CreateBookingDto, UpdateBookingDto } from "./dto";

@Controller('bookings')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Get('')
    getAll() {
        return this.bookingService.getAllBooking();
    }

    @UseGuards(JwtGuard)
    @Post('')
    createBooking(@Body() dto: CreateBookingDto) {
        return this.bookingService.createBooking(dto);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    updateBooking(@Param() id: string, @Body() booking: UpdateBookingDto, @GetUser() user: User) {
        if (user.role.includes('user')) {
            throw new ForbiddenException("Credentials invalid")
        }
        return this.bookingService.updateBooking(booking);
    }
}