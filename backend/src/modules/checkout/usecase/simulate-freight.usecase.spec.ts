import { SimulateFreightUseCase } from "./simulate-freight.usecase";
import { Product } from "../domain/entity/product";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Dimensions } from "../domain/value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";

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
    productRepository.save(new Product(new Id("1"), "Licença Anti-virus", new BRLCurrency(200)));
    productRepository.save(
      new Product(new Id("2"), "Fone de ouvido", new BRLCurrency(200), new Dimensions(2, 2, 1), 1),
    );
    productRepository.save(new Product(new Id("3"), "Placa mãe", new BRLCurrency(1200), new Dimensions(10, 2, 1), 5));
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
