import { Global } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Global()
export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}