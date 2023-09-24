import ApprovedOrderCannotBeRejectedException from '../useCase/ApprovedOrderCannotBeRejectedException';
import OrderCannotBeShippedException from '../useCase/OrderCannotBeShippedException';
import OrderCannotBeShippedTwiceException from '../useCase/OrderCannotBeShippedTwiceException';
import RejectedOrderCannotBeApprovedException from '../useCase/RejectedOrderCannotBeApprovedException';
import ShippedOrdersCannotBeChangedException from '../useCase/ShippedOrdersCannotBeChangedException';
import OrderItem from './OrderItem';
import { OrderStatus } from './OrderStatus';

class Order {
  private total: number;
  private currency: string;
  private items: OrderItem[];
  private tax: number;
  private status: OrderStatus;
  private id: number;

  constructor({ items = [], currency = 'EUR' }: { items?: OrderItem[], currency?: string} = {}) {
    this.items = items;
    this.currency = currency;
    this.status = OrderStatus.CREATED;
    this.total = items.map(orderItem => orderItem.getTaxedAmount()).reduce((total, taxedAmount) => total + taxedAmount, 0);
    this.tax = items.map(orderItem => orderItem.getTax()).reduce((total, tax) => total + tax, 0);
  }

  public approve(): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    }
    if (this.status === OrderStatus.REJECTED) {
      throw new RejectedOrderCannotBeApprovedException();
    }
    this.status = OrderStatus.APPROVED;
  }

  public reject(): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    }
    if (this.status === OrderStatus.APPROVED) {
      throw new ApprovedOrderCannotBeRejectedException();
    }
    this.status = OrderStatus.REJECTED;
  }

  public ship(): void {
    if (this.status === OrderStatus.CREATED || this.status === OrderStatus.REJECTED) {
      throw new OrderCannotBeShippedException();
    }
    if (this.status === OrderStatus.SHIPPED) {
      throw new OrderCannotBeShippedTwiceException();
    }
    this.status = OrderStatus.SHIPPED;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void  {
    this.total = total;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string): void {
    this.currency = currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public setItems(items: OrderItem[]): void {
    this.items = items;
  }

  public getTax(): number {
    return this.tax;
  }

  public setTax(tax: number): void {
    this.tax = tax;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }
}

export default Order;

