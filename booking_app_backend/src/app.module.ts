import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({ uri: config.get<string>('DATABASE_URL') })
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
        BookingModule
    ],
})
export class AppModule { }
