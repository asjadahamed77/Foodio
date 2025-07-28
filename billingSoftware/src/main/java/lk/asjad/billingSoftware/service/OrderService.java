package lk.asjad.billingSoftware.service;

import lk.asjad.billingSoftware.io.OrderRequest;
import lk.asjad.billingSoftware.io.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();


}
