import { SimulateFreightUseCase } from "./SimulateFreightUseCase";
import { Product } from "../Domain/Entity/Product";
import { ProductRepository } from "../Domain/Repository/ProductRepository";
import { Dimensions } from "../Domain/ValueObjects/Dimensions";
import { Id } from "../Domain/ValueObjects/Id";
import { MemoryRepositoryFactory } from "../Infra/Factory/MemoryRepositoryFactory";
import { ProductRepositoryMemory } from "../Infra/Repository/ProductRepositoryMemory";

describe("SimulateFreightUseCase tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;

  beforeAll(() => {
    productRepository = repositoryFactory.makeProductRepository();
  });

  beforeEach(async () => {
    await productRepository.clear();
  });

  it("should simulate freight", async () => {
    productRepository.save(new Product(new Id("1"), "Licença Anti-virus", 200));
    productRepository.save(new Product(new Id("2"), "Fone de ouvido", 200, new Dimensions(2, 2, 1), 1));
    productRepository.save(new Product(new Id("3"), "Placa mãe", 1200, new Dimensions(10, 2, 1), 5));
    const usecase = new SimulateFreightUseCase(repositoryFactory);
    const input = {
      items: [
        { id: "1", quantity: 1 },
        { id: "2", quantity: 3 },
        { id: "3", quantity: 1 },
      ],
    };
    const output = await usecase.execute(input);
    expect(output.total).toBe(80);
  });
});
