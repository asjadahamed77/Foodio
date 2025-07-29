import React from 'react'
import CategoryForm from '../components/CategoryForm'
import CategoryList from '../components/CategoryList'

const ManageCategory = () => {
  return (
    <div className='grid lg:grid-cols-[2fr_1fr] gap-[25px] px-4 sm:px-8 md:px-12 lg:px-16'> 
    {/* Category Form  */}
      <div className='backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10 h-fit'>
      <CategoryForm />
      </div>
      {/*  List of Categories */}
      <div className='backdrop-blur-md rounded-4xl p-4 bg-white/5 cursor-pointer border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/10'> 
        <CategoryList />
      </div>
    </div>
  )
}

export default ManageCategory
 