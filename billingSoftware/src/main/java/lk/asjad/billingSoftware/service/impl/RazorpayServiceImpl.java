package lk.asjad.billingSoftware.service.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lk.asjad.billingSoftware.io.OrderResponse;
import lk.asjad.billingSoftware.io.RazorpayOrderResponse;
import lk.asjad.billingSoftware.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${paypal.key.id}")
    private String razorpayKeyId;

    @Value("${paypal.key.secret}")
    private String razorpayKeySecret;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int)(amount * 100)); // Razorpay expects amount in paise (int)
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);

        return convertToResponse(order);
    }

    private RazorpayOrderResponse convertToResponse(Order order) {
        return RazorpayOrderResponse.builder()
                .id(order.get("id"))
                .entity(order.get("entity"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .status(order.get("status"))
                .created_at(order.get("created_at"))
                .receipt(order.get("receipt"))
                .build();
    }
}

