import Product from './Product';

class OrderItem {
  private product: Product;
  private quantity: number;
  private taxedAmount: number;
  private tax: number;

  constructor({ product, quantity }: {product: Product, quantity: number }) {
    const price = product.getPrice();
    const taxPercentage = product.getTaxPercentage();
    const unitaryTax: number = Math.round(price / 100 * taxPercentage * 100) / 100;
    const unitaryTaxedAmount: number = Math.round((price + unitaryTax) * 100) / 100;
    const taxedAmount: number = Math.round(unitaryTaxedAmount * quantity * 100) / 100;
    const tax: number = unitaryTax * quantity;

    this.product = product;
    this.quantity = quantity;
    this.taxedAmount = taxedAmount;
    this.tax = tax;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getTaxedAmount(): number {
    return this.taxedAmount;
  }

  public getTax(): number {
    return this.tax;
  }

}

export default OrderItem;

