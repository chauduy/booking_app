import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { BookingModule } from 'src/booking/booking.module';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        }
    ]), BookingModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
