import { CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly clientId: string,
    private readonly acceptedRoles: string[],
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (!request["user"]) {
      throw new UnauthorizedException();
    }

    const roles = this.extractRoles(request["user"]);
    if (!this.hasAnyAcceptedRoles(roles)) {
      throw new ForbiddenException();
    }

    return true;
  }

  private extractRoles(user: any): string[] {
    return user.resource_access?.[this.clientId]?.roles ?? [];
  }

  private hasAnyAcceptedRoles(roles: string[]) {
    return roles.some((role: string) => {
      return this.acceptedRoles.includes(role);
    });
  }
}
