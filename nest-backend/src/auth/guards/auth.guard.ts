import { AuthService } from './../auth.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';



@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {

  }




  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log({ token })

    if (!token) {
      throw new UnauthorizedException('No existe bearer token');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, { secret: process.env.JWT_SEED }
      );

      const user = await this.authService.findUserId(payload.id);
      if (!user) throw new UnauthorizedException('Usuario no existe');
      if (!user.isActive) throw new UnauthorizedException('Usuario no está activo');


      request['user'] = user;

    } catch (error) {

      throw new UnauthorizedException('Error de token')
    }


    return true;
  }





  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }






}
