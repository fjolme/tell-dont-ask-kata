import Order from '../domain/Order';
import OrderRepository from '../repository/OrderRepository';
import OrderApprovalRequest from './OrderApprovalRequest';

class OrderApprovalUseCase {
  private readonly orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository){
    this.orderRepository = orderRepository;
  }

  public run(request: OrderApprovalRequest): void {
    const order: Order = this.orderRepository.getById(request.getOrderId());
    request.isApproved() ? order.approve() : order.reject();
    this.orderRepository.save(order);
  }
}

export default OrderApprovalUseCase;
