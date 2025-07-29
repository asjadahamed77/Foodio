package lk.asjad.billingSoftware.controller;

import com.razorpay.RazorpayException;
import lk.asjad.billingSoftware.io.OrderResponse;
import lk.asjad.billingSoftware.io.PaymentRequest;
import lk.asjad.billingSoftware.io.PaymentVerificationRequest;
import lk.asjad.billingSoftware.io.RazorpayOrderResponse;
import lk.asjad.billingSoftware.service.OrderService;
import lk.asjad.billingSoftware.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
       return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }


@PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
       return orderService.verifyPayment(request);
    }

}
