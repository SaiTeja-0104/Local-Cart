import user from '../assets/user.png'
import quote from '../assets/quote.png'
import star from '../assets/star_icon.png'
import dull_star from '../assets/star_dull_icon.png'

const Reviews = () => {
  return (
          <div className='px-1 mt-20 font-pop'>
          <p className='text-black mb-8 text-xl sm:text-2xl md:text-3xl font-normal font-outfit'>Reviews</p>
          <div className='flex gap-5 flex-col justify-center items-center sm:justify-start sm:flex-row '>
            <div className='flex gap-2 bg-gray-50 flex-col rounded-lg items-center py-3 px-3 relative border border-black max-w-[300px]'>
              <div className='absolute top-3 left-3'>
                <img src={quote} className='w-4' alt="" />
              </div>
              <img src={user} className='w-10' alt="" />
              <p className='text-md sm:text-lg text-black'>- John</p>
              <p className='text-center  leading-tight text-gray-400'>I like the quality of the products they supply.</p>
              <div className='flex gap-0.5 pt-1'>
                <img src={star} className='w-4' alt="" />
                <img src={star} className='w-4' alt="" />
                <img src={star} className='w-4' alt="" />
                <img src={star} className='w-4' alt="" />
                <img src={dull_star} className='w-4' alt="" />
              </div>
            </div>
            <div className='flex gap-2 bg-gray-50 flex-col rounded-lg items-center py-3 px-3 relative border border-black max-w-[300px]'>
              <div className='absolute top-3 left-3'>
                <img src={quote} className='w-4' alt="" />
              </div>
              <img src={user} className='w-10' alt="" />
              <p className='text-md sm:text-lg text-black'>- Dany</p>
              <p className='text-center leading-tight  text-gray-400'>I like the affordable prices of the products they supply.</p>
              <div className='flex gap-0.5 pt-1'>
                <img src={star} className='w-4' alt="" />
                <img src={star} className='w-4' alt="" />
                <img src={star} className='w-4' alt="" />
                <img src={star} className='w-4' alt="" />
                <img src={star} className='w-4' alt="" />
              </div>
            </div>
          </div>
      </div>
  )
}

export default Reviews
