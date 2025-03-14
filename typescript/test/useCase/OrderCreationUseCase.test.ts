import Category from '../../src/domain/Category';
import Order from '../../src/domain/Order';
import { OrderStatus } from '../../src/domain/OrderStatus';
import Product from '../../src/domain/Product';
import { ProductCatalog } from '../../src/repository/ProductCatalog';
import OrderCreationUseCase from '../../src/useCase/OrderCreationUseCase';
import SellItemRequest from '../../src/useCase/SellItemRequest';
import SellItemsRequest from '../../src/useCase/SellItemsRequest';
import UnknownProductException from '../../src/useCase/UnknownProductException';
import InMemoryProductCatalog from '../doubles/InMemoryProductCatalog';
import TestOrderRepository from '../doubles/TestOrderRepository';

describe('OrderCreationUseCase', () => {
  const orderRepository: TestOrderRepository = new TestOrderRepository();

  const food: Category = new Category({ name: 'food', taxPercentage: 10 });
  const saladProduct = new Product({ name: 'salad', price: 3.56, category: food });
  const tomatoProduct = new Product({ name: 'tomato', price: 4.65, category: food });
  const productCatalog: ProductCatalog = new InMemoryProductCatalog([ saladProduct, tomatoProduct]);

  const useCase: OrderCreationUseCase = new OrderCreationUseCase(orderRepository, productCatalog);

  it('sellMultipleItems', () => {
    const saladRequest: SellItemRequest = new SellItemRequest({ productName: 'salad', quantity: 2 });
    const tomatoRequest: SellItemRequest = new SellItemRequest({ productName: 'tomato', quantity: 3 });

    const request: SellItemsRequest = new SellItemsRequest();
    request.addRequest(saladRequest);
    request.addRequest(tomatoRequest);

    useCase.run(request);

    const insertedOrder: Order = orderRepository.getSavedOrder();
    expect(insertedOrder.getStatus()).toBe(OrderStatus.CREATED);
    expect(insertedOrder.getTotal()).toBe(23.20);
    expect(insertedOrder.getTax()).toBe((2.13));
    expect(insertedOrder.getCurrency()).toBe(('EUR'));
    expect(insertedOrder.getItems().length).toBe(2);
    expect(insertedOrder.getItems()[0].getProduct().getName()).toBe('salad');
    expect(insertedOrder.getItems()[0].getProduct().getPrice()).toBe(3.56);
    expect(insertedOrder.getItems()[0].getQuantity()).toBe(2);
    expect(insertedOrder.getItems()[0].getTaxedAmount()).toBe(7.84);
    expect(insertedOrder.getItems()[0].getTax()).toBe(0.72);
    expect(insertedOrder.getItems()[1].getProduct().getName()).toBe('tomato');
    expect(insertedOrder.getItems()[1].getProduct().getPrice()).toBe(4.65);
    expect(insertedOrder.getItems()[1].getQuantity()).toBe(3);
    expect(insertedOrder.getItems()[1].getTaxedAmount()).toBe(15.36);
    expect(insertedOrder.getItems()[1].getTax()).toBe(1.41);
  });

  it('unknownProduct', () => {
    const request: SellItemsRequest = new SellItemsRequest();
    const unknownProductRequest: SellItemRequest = new SellItemRequest({ productName: 'unknown product' });
    request.addRequest(unknownProductRequest);

    expect(() => useCase.run(request)).toThrow(UnknownProductException);
  });
});
