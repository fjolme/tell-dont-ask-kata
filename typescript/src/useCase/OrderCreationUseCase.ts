import Order from '../domain/Order';
import OrderItem from '../domain/OrderItem';
import OrderRepository from '../repository/OrderRepository';
import { ProductCatalog } from '../repository/ProductCatalog';
import SellItemsRequest from './SellItemsRequest';

class OrderCreationUseCase {
  private readonly orderRepository: OrderRepository;
  private readonly productCatalog: ProductCatalog;

  public constructor(orderRepository: OrderRepository, productCatalog: ProductCatalog) {
    this.orderRepository = orderRepository;
    this.productCatalog = productCatalog;
  }

  public run(request: SellItemsRequest): void {

    const items: OrderItem[] = request.getRequests().map(itemRequest => {
      const product = this.productCatalog.getByName(itemRequest.getProductName());
      const quantity = itemRequest.getQuantity();
      return new OrderItem({ product, quantity });
    });

    const order: Order = new Order({ items });
    this.orderRepository.save(order);
  }
}


export default OrderCreationUseCase;
