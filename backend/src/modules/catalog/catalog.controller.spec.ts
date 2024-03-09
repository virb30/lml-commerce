import { Test, TestingModule } from "@nestjs/testing";
import { CatalogController } from "./catalog.controller";
import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { ListProductsUseCase } from "./usecase/list-products.usecase";

describe("CatalogController", () => {
  let controller: CatalogController;
  let usecase: Usecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogController],
      providers: [ListProductsUseCase],
    }).compile();

    usecase = module.get<ListProductsUseCase>(ListProductsUseCase);
    controller = module.get<CatalogController>(CatalogController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("loads products with pagination data", async () => {
    const result = {
      pagination: {
        total: 3,
        currentPage: 1,
        totalPages: 2,
        perPage: 2,
      },
      data: [
        { id: "1", name: "Product 1", price: 10 },
        { id: "2", name: "Product 2", price: 20 },
      ],
    };
    jest.spyOn(usecase, "execute").mockImplementationOnce(async () => result);

    const expected = {
      pagination: {
        total: 3,
        currentPage: 1,
        totalPages: 2,
        perPage: 2,
      },
      data: [
        { id: "1", name: "Product 1", price: 10 },
        { id: "2", name: "Product 2", price: 20 },
      ],
    };
    expect(await controller.findAll(1, 2)).toStrictEqual(expected);
  });
});
