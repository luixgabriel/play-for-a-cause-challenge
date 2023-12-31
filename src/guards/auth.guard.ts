import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService ) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const {authorization} = request.headers
        try {
        const data = this.authService.checkToken((authorization ?? '').split(' ')[1])
        request.payload = data
        return true            
        } catch (error) {
        throw new HttpException('Rota não autorizada, Por favor envie o token.', HttpStatus.UNAUTHORIZED)
        }
    }
}