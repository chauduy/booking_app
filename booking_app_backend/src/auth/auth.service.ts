import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { LoginDto, RegisterDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private userService: UserService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signUp(dto: RegisterDto) {
        try {
            const hash = await bcrypt.hash(dto.password, 10);

            //We have a default role for create a new user and an empty booking
            const data = {
                email: dto.email,
                password: hash,
                name: dto.name,
                role: ["user"],
                booking: []
            };

            const user = await this.userService.createUser(data);
            const token = await this.signToken(user._id, user.email)

            return { access_token: token }
        } catch (error) {
            throw new ForbiddenException('Credentials taken')
        }
    }

    async login(dto: LoginDto) {
        const user = await this.userService.findUser(dto.email)
        if (!user) throw new ForbiddenException('Credentials incorrect')

        const pwMatches = await bcrypt.compareSync(dto.password, user.password)
        if (!pwMatches) throw new ForbiddenException('Credentials incorrect')

        const token = await this.signToken(user._id, user.email)

        return { access_token: token, role: user.role, user_id: user._id }
    }

    async signToken(userId: string, email: string): Promise<string> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')

        //Register token with our's secret key 
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })

        return token
    }
}