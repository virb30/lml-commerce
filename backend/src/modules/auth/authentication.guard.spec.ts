import { JwtService } from "@nestjs/jwt";
import { AuthenticationGuard } from "./authentication.guard";
import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";

describe("AuthGuard Tests", () => {
  let context;
  let jwtService;
  let guard;
  const getRequestMock = jest.fn();
  const getTypeMock = jest.fn();
  const jwtVerifyMock = jest.fn();

  beforeAll(() => {
    context = createMock<ExecutionContext>({
      getType: getTypeMock,
      switchToHttp() {
        return {
          getRequest: getRequestMock,
        };
      },
    });

    jwtService = createMock<JwtService>({
      verify: jwtVerifyMock,
    });

    guard = new AuthenticationGuard(jwtService);
  });

  it("should return true and not save user payload if context type is not http", () => {
    const request = {};
    getRequestMock.mockReturnValue(request);
    const response = guard.canActivate(context);

    expect(response).toBe(true);
    expect(request["user"]).not.toBeDefined();
  });

  it("should throw an UnauthorizedException if token does not exists", () => {
    getTypeMock.mockReturnValue("http");
    const request = {
      headers: {},
    };
    getRequestMock.mockReturnValue(request);
    expect(() => {
      guard.canActivate(context);
    }).toThrow(new UnauthorizedException());
  });

  it("should return true and store user data on request", () => {
    jwtVerifyMock.mockReturnValue({ email: "user@email.com" });
    getTypeMock.mockReturnValue("http");
    const request = {
      headers: {
        authorization: "Bearer token",
      },
    };
    getRequestMock.mockReturnValue(request);

    const response = guard.canActivate(context);
    expect(response).toBeTruthy();
    expect(request["user"]).toBeDefined();
    expect(request["user"].email).toBe("user@email.com");
  });

  it("should throw UnauthorizedException if jwt verify throws", () => {
    jwtVerifyMock.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    getTypeMock.mockReturnValue("http");

    const request = {
      headers: {
        authorization: "Bearer token",
      },
    };
    getRequestMock.mockReturnValue(request);

    expect(() => {
      guard.canActivate(context);
    }).toThrow(new UnauthorizedException());
  });
});
