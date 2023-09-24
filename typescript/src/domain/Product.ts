import Category from './Category';

class Product {
  private name: string;
  private price: number;
  private category: Category;

  constructor({ name, price, category }: { name: string, price: number, category: Category }) {
    this.name = name;
    this.price = price;
    this.category = category;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getCategory(): Category {
    return this.category;
  }

  public getTaxPercentage(): number {
    return this.category.getTaxPercentage();
  }

}

export default Product;

