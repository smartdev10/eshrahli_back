import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1];

    try {
        const decoded = verify(`${token}`, process.env.ACCESS_TOKEN_SECRET);
        if (decoded) {
          return true;
        }
        return false;
    } catch(error) {
        throw new UnauthorizedException(403,"Please Log In First")
    }
  }
}
