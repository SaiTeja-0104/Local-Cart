import star from '../assets/star_icon.png'
import {Link} from 'react-router-dom'

const VendorCard = ({id,src,name,categ,loc,subloc,stars}) => {
  categ = categ?categ.charAt(0).toUpperCase() + categ.slice(1):''
  loc = loc?loc.charAt(0).toUpperCase() + loc.slice(1):''
  subloc = subloc?subloc.charAt(0).toUpperCase() + subloc.slice(1):''
  return (
    <div className='w-[280px] border border-gray-400 px-3 py-3 rounded-lg font-outfit'>
      <div className='px-1 flex items-center justify-left gap-3'>
        <div className='w-16  overflow-hidden rounded-full'>
            <img src={src} className='w-full h-full object-cover scale-125' alt="" />

        </div>
        <div className=''>
            <p className='text-2xl font-semibold'>{name}</p>
            <p className='text-gray-500 text-lg'>{categ}</p>
        </div>
      </div>
      
      <p className='bg-gray-300 my-3 w-full h-0.25' ></p>
      
      <div className='px-1'>
        <div className='px-3 py-1'>
          <p className='text-xl font-semibold'>{loc}</p>
          <p className='font-light'>{subloc}</p>
          <p className='flex gap-2 my-1 items-center'>
              <img src={star} className='w-4 h-4' alt="" />
              {stars}
          </p>
        </div>
        <Link to={`/vendor/${id}`}>
          <button className='w-full mt-2 cursor-pointer rounded-xl py-2 font-semibold text-white bg-[#14915b]'>View Store</button>
        </Link>
      </div>
    </div>
  )
}

export default VendorCard
