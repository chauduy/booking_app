import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookingService } from 'src/booking/booking.service';


@Controller('users')
export class UserController {
    constructor(private bookingService: BookingService) { }

    @Post('bookings')
    getBookingByUser(@Body() user_id: any) {
        return this.bookingService.getBookingByUser(user_id);
    }

}