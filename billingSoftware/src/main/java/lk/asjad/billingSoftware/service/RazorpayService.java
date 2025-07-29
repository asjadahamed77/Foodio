package lk.asjad.billingSoftware.service;

import com.razorpay.RazorpayException;
import lk.asjad.billingSoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

   RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;

}
