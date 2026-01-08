import quality_icon from '../assets/quality_icon.png'
import support_img from '../assets/support_img.png'
import delivery_icon from '../assets/delivery_icon.png'

const OurPolicy = () => {
  return (
    <div className='mx-auto px-8 flex flex-col items-center gap-12 sm:flex-row justify-around sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img className='w-12 m-auto mb-5' src={delivery_icon} alt="" />
        <p className='font-semibold'>Fast Delivery</p>
        <p className='text-gray-400'>We offer quick delivery serivce</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={quality_icon} alt="" />
        <p className='font-semibold'>Quality Assurance</p>
        <p className='text-gray-400'>We ensure good quality of products</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={support_img} alt="" />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
