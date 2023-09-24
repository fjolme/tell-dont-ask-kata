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

  constructor({ items = [], currency = 'EUR', id, status = OrderStatus.CREATED }: { items?: OrderItem[], currency?: string, id?: number, status?: OrderStatus} = {}) {
    this.items = items;
    this.currency = currency;
    this.total = items.map(orderItem => orderItem.getTaxedAmount()).reduce((total, taxedAmount) => total + taxedAmount, 0);
    this.tax = items.map(orderItem => orderItem.getTax()).reduce((total, tax) => total + tax, 0);
    this.id = id;
    this.status = status;
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

  public getCurrency(): string {
    return this.currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getTax(): number {
    return this.tax;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getId(): number {
    return this.id;
  }

}

export default Order;

