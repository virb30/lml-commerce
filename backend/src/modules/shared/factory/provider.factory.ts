export class ProviderFactory<T> {
  constructor(private readonly mapper: FactoryMap<T>) {}

  make(dataSource: string): T {
    const instance = this.mapper[dataSource];
    if (!instance) {
      throw new Error("Invalid instance");
    }
    return this.constructObject(instance.className, instance.options);
  }

  private constructObject(className: ConstructableObject<T>, options: any): T {
    if (!options) {
      return new className() as T;
    }
    return new className(...Object.values(options)) as T;
  }
}

export type ConstructableObject<T> = new (...params: any) => T;

export type FactoryMap<T> = {
  [key: string]: {
    className: ConstructableObject<T>;
    options?: any;
  };
};
