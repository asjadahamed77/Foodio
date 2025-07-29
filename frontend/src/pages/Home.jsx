import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { fetchDashboardData } from '../service/dashboardService';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const loadData = async () => {
      try {
        
        const response = await fetchDashboardData()
        setData(response.data)
      } catch (error) {
        toast.error(error)
        console.log(error);
        
      }finally{
        setLoading(false)
      }
     
    }
    loadData() 
  },[])

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if(!data){
    return <div className="text-center">Failed to load the dashboard data.</div>;
  }


  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16">

      <div className='grid sm:grid-cols-2 gap-8 md:gap-12'>
    <div className='p-8 backdrop-blur-md rounded-4xl  bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10'>
    <p className='text-lg font-medium'>Today's Sales</p>
    <p className='text-2xl font-semibold'>Rs. {(data.todaySales).toFixed(2)}</p>
    </div>
    <div className='p-8 backdrop-blur-md rounded-4xl  bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10'>
      <p className='text-lg font-medium'>Today's Orders</p>
    <p className='text-2xl font-semibold'>{data.todayOrderCount}</p>
    </div>
      </div>
     
  

<div className="mt-12 overflow-x-scroll backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10">
<h1 className='font-semibold text-4xl mb-6'>Recent Orders</h1>
<table className="w-full overflow-x-scroll border-collapse rounded-xl">
  <thead className="w-full  bg-white text-black  text-left rounded-4xl  ">
    <tr className=''>
      <th className="py-2 px-4">Order ID</th>
      <th className="py-2 px-4">Customer</th>
      <th className="py-2 px-4">Amount</th>
      <th className="py-2 px-4">Payment</th>
      <th className="py-2 px-4">Status</th>
      <th className="py-2 px-4">Time</th>
    </tr>
  </thead>
  <tbody>
    {
      data.recentOrders.map(order => (
        <tr key={order.orderId} className="hover:bg-white/50 hover:text-black" >
          <td className="py-2 px-4">{order.orderId.substring(0,8)}</td>
          <td className="py-2 px-4">{order.customerName}</td>
          <td className="py-2 px-4">Rs. {order.totalAmount.toFixed(2)}</td>
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
          <td className="py-2 px-4">{new Date(order.createdAt).toLocaleString()}</td>
        </tr>
      ))
    }
  </tbody>
</table>
</div>


    </div>
  )
}

export default Home
