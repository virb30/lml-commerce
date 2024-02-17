export class ProviderFactory<T> {
  constructor(private readonly mapper: FactoryMap<T>) {}

  make(dataSource: string): T {
    const instance = this.mapper[dataSource];
    if (!instance) {
      throw new Error("Invalid instance");
    }
    return new instance.className(instance.options) as T;
  }
}

export type ConstructableObject<T> = new (...params: any) => T;

export type FactoryMap<T> = {
  [key: string]: {
    className: ConstructableObject<T>;
    options?: any;
  };
};
