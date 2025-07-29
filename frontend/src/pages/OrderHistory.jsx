import React, { useEffect, useState } from "react";
import { latestOrders } from "../service/OrderService";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();
        setOrders(response.data);
      } catch (error) {
        toast.error(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatItems = (items)=>{
    return items.map(item => `${item.name} x ${item.quantity}`).join(', ');
  }

  const formatDate = (dateString)=>{
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        
    }
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if(orders.length === 0){
    return <div className="text-center">No orders found.</div>;
  }


  return <div className="px-4 sm:px-8 md:px-12 lg:px-16">
    <div className="overflow-x-scroll backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
  <h1 className="text-2xl font-semibold">Recent Orders</h1>
  <div className="mt-4 w-full">
<table className="w-full overflow-x-scroll border-collapse rounded-xl"> 
  <thead className="w-full  bg-white text-black  text-left  ">
    <th className="py-2 px-4">Order ID</th>
    <th className="py-2 px-4">Customer</th>
    <th className="py-2 px-4">Items</th>
    <th className="py-2 px-4">Total</th>
    <th className="py-2 px-4">Payment</th>
    <th className="py-2 px-4">Status</th>
    <th className="py-2 px-4">Date</th>
  </thead>
  <tbody className="w-full">
    {
      orders.map(order=>(
        <tr key={order.orderId} className="hover:bg-white/50 hover:text-black" > 
          <td className="py-2 px-4">{order.orderId.substring(0,16)}</td>
          <td className="py-2 px-4">{order.customerName} <br /><small>{order.phoneNumber}</small></td>
          <td className="py-2 px-4">{formatItems(order.items)}</td>
          <td className="py-2 px-4">{(order.totalAmount).toFixed(2)}</td>
          <td className="py-2 px-4">{order.paymentMethod}</td>
          <td className="py-2 px-4"> 
            <span>
              {order.paymentDetails.status === 'COMPLETED' ? (
                <span className="text-green-500">Completed</span>
              ) : order.status === 'PENDING' ? (
                <span className="text-yellow-500">Pending</span>
              ) : (
                <span className="text-red-500">Cancelled</span>
              )}
            </span>
          </td>
          <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
        </tr>
      ))
    }
  </tbody>
</table>
  </div>
    </div>
  </div>;
};

export default OrderHistory;
