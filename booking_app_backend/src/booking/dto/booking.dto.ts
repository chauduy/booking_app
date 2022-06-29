import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNotEmpty()
    proposed_date: string[];

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    create_by: string;
}

export class UpdateBookingDto {
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    event_date?: string;

    @IsNotEmpty()
    update_by: string;

    reason?: string;
}