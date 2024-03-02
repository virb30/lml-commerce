export abstract class PaginatableQueryDatabase {
  public PER_PAGE_LIMIT = 100;

  getPagination(page?: number, perPage?: number) {
    const limit = this.getPerPage(perPage);

    return {
      offset: (this.getPage(page) - 1) * limit,
      limit,
    };
  }

  private getPage(page?: number): number {
    if (page <= 0) throw new Error("invalid page");
    return page ?? 1;
  }

  private getPerPage(perPage?: number): number {
    if (perPage > this.PER_PAGE_LIMIT)
      throw new Error(`total items per page cannot be greater than ${this.PER_PAGE_LIMIT}`);
    return perPage ?? 10;
  }
}
