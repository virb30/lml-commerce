import { Email } from "./Email";
describe("Email tests", () => {
  it("should create an email", () => {
    const email = new Email("cliente@email.com");
    expect(email.value).toBe("cliente@email.com");
  });

  it("should not create an email invalid", () => {
    expect(() => {
      new Email("invalid");
    }).toThrowError("Invalid email");
  });
});
