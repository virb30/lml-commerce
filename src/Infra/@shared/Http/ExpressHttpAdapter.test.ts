import { ExpressHttpAdapter } from "./ExpressHttpAdapter";
import request from "supertest";

describe("API tests", () => {
  it("should connect to API", async () => {
    const http = new ExpressHttpAdapter();

    http.on("GET", "/test", async function (params: any, body: any) {
      return {
        status: 200,
        data: {
          ok: true,
        },
      };
    });

    const response = await request(http.app).get("/test");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
