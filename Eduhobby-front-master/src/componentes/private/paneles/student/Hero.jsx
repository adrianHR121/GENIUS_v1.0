import React from 'react'

const Hero = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4'>
      <div className='max-h-[500px] relative'>
        { /*overlay*/}
        <div className='absolute w-full h-full text-gray-200 mas-h-[500px] bg-black/40 flex flex-col justify-center '>
          <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>Siendo testigos de tu <span className='text-green-500'>Dedicacion, Esfuerzo</span> y <span className='text-green-500'>Esperanza</span></h1>
          {/* <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>y <span className='text-green-500'>Esperanza</span></h1>*/}
        </div>
        <img className='w-full max-h-[500px] object-cover' src="https://images.pexels.com/photos/196649/pexels-photo-196649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
    </div>
  )
}

export default Hero