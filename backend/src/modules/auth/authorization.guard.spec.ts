import { createMock } from "@golevelup/ts-jest";
import { AuthorizationGuard } from "./authorization.guard";
import { ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";

describe("AuthorizationGuard tests", () => {
  let guard;
  let context;
  const getRequestMock = jest.fn();

  beforeAll(() => {
    guard = new AuthorizationGuard("lml-commerce-client", ["product-admin"]);
    context = createMock<ExecutionContext>({
      switchToHttp() {
        return {
          getRequest: getRequestMock,
        };
      },
    });
  });

  it("should throw UnauthorizedException if request has no user data", () => {
    getRequestMock.mockReturnValue({});
    expect(() => {
      guard.canActivate(context);
    }).toThrow(new UnauthorizedException());
  });

  it("should return true if user has product-admin role", () => {
    getRequestMock.mockReturnValue({
      user: {
        email: "user@email.com",
        resource_access: {
          "lml-commerce-client": {
            roles: ["product-admin"],
          },
        },
      },
    });
    const response = guard.canActivate(context);
    expect(response).toBeTruthy();
  });

  it("should throw ForbiddenException if user doesnt have product-admin role", () => {
    getRequestMock.mockReturnValue({
      user: {
        email: "user@email.com",
        resource_access: {
          "lml-commerce-client": {
            roles: ["invalid-role"],
          },
        },
      },
    });
    expect(() => {
      guard.canActivate(context);
    }).toThrow(new ForbiddenException());
  });

  it("should throw ForbiddenException if user doesnt have roles for client", () => {
    getRequestMock.mockReturnValue({
      user: {
        email: "user@email.com",
        resource_access: {
          "lml-commerce-client": {},
        },
      },
    });
    expect(() => {
      guard.canActivate(context);
    }).toThrow(new ForbiddenException());
  });
});
