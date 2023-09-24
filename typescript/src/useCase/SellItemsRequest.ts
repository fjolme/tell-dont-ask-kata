import SellItemRequest from './SellItemRequest';

class SellItemsRequest {
  private requests: SellItemRequest[] = [];

  public addRequest(sellItemRequest: SellItemRequest): void {
    this.requests.push(sellItemRequest);
  }

  public getRequests(): SellItemRequest[] {
    return this.requests;
  }
}

export default SellItemsRequest;
