import { SimulateFreightUseCase } from "./simulate-freight.usecase";
import { Product } from "../domain/entity/product";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Dimensions } from "../domain/value-object/dimensions";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { CalculateFreightGateway } from "../gateway/calculate-freight.gateway.interface";
import { CalculateFreightMemoryGateway } from "../gateway/memory/calculate-freight-memory.gateway";

describe("SimulateFreightUseCase tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;
  let freightCalculator: CalculateFreightGateway;
  let product: Product;
  let product2: Product;
  let product3: Product;

  beforeAll(() => {
    freightCalculator = new CalculateFreightMemoryGateway();
    productRepository = repositoryFactory.makeProductRepository();
  });

  beforeEach(async () => {
    await productRepository.clear();
    product = Product.create({
      name: "Licença Anti-virus",
      price: new BRLCurrency(200),
    });
    product2 = Product.create({
      name: "Fone de ouvido",
      price: new BRLCurrency(200),
      dimensions: new Dimensions(2, 2, 1),
      weight: 1,
    });
    product3 = Product.create({
      name: "Placa mãe",
      price: new BRLCurrency(1200),
      dimensions: new Dimensions(10, 2, 1),
      weight: 5,
    });
    await productRepository.save(product);
    await productRepository.save(product2);
    await productRepository.save(product3);
  });

  it("should simulate freight", async () => {
    const usecase = new SimulateFreightUseCase(repositoryFactory, freightCalculator);
    const input = {
      items: [
        { id: product.id.value, quantity: 1 },
        { id: product2.id.value, quantity: 3 },
        { id: product3.id.value, quantity: 1 },
      ],
    };
    const output = await usecase.execute(input);
    expect(output.total).toBe(80);
  });
});
