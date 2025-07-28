package lk.asjad.billingSoftware.io;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class OrderRequest {

    private String customerName;
    private String phoneNumber;
    private  List<OrderItemRequest>  cartItems;
    private Double totalAmount;
    private String paymentMethod;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder

    public static class OrderItemRequest{
        private String itemId;  
        private String name;
        private Double price;
        private Integer quantity; 
    }


}
