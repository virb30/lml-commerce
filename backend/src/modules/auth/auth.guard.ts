import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== "http") {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(token);
      request["user"] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
