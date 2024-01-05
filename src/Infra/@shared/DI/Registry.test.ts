import { Registry } from "./Registry";

class TestDependency {
  constructor(readonly testProperty: string) {}
}

describe("Registry tests", () => {
  it("Should register a dependency with given name", () => {
    const registry = Registry.getInstance();
    const testDependency = new TestDependency("testDependencyClass");
    registry.register("TestDependency", testDependency);

    const injectedDependency = registry.inject("TestDependency");
    expect(injectedDependency).toBeInstanceOf(TestDependency);
    expect(injectedDependency.testProperty).toBe("testDependencyClass");
  });

  it("Should throw error if dependency not found", () => {
    expect(() => {
      const registry = Registry.getInstance();
      registry.inject("InvalidTestDependency");
    }).toThrow(new Error("Dependency not found"));
  });
});
