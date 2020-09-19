import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies.assence_admin_access;
    const jid = request.cookies.assence_admin_jid;

    try {
        const decoded = verify(`${accessToken}.${jid}`, 'ACCESS_TOKEN_SECRET');
        if (decoded) {
          return true;
        }
        return false;
    } catch(error) {
        throw new UnauthorizedException(error.message)
    }
  }
}
