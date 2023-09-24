class SellItemRequest {
  private quantity: number;
  private productName: string;

  constructor({ quantity = 1, productName }: { quantity?: number, productName: string }) {
    this.quantity = quantity;
    this.productName = productName;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getProductName(): string {
    return this.productName;
  }
}

export default SellItemRequest;
