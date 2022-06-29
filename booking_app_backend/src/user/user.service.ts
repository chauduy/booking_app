import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from './dto';

@Injectable({})
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(dto: CreateUserDto) {
        const newUser = await this.userModel.create(dto)
        return newUser;
    }

    async findUser(email: string) {
        const user = await this.userModel.findOne({ email });
        return user;
    }

}