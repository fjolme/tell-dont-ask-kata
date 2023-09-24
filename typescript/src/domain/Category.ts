class Category {
  private name: string;
  private taxPercentage: number;

  public constructor({ name, taxPercentage }: {name: string, taxPercentage: number}) {
    this.name = name;
    this.taxPercentage = taxPercentage;
  }

  public getName(): string {
    return this.name;
  }

  public getTaxPercentage(): number {
    return this.taxPercentage;
  }

}

export default Category;

