import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../context/Context'
import Title from '../components/TItle'
import ProductItem from '../components/ProductItem'
import dropdown_icon from '../assets/dropdown_icon.png'
import { assets } from '../assets/assets'




const Items = () => {
    const {cid} = useParams()
    const {products} = useContext(Context)
    const [showFilter,setShowFilter] = useState(true)
    const [showSort,setShowSort] = useState(true)
    const [category,setCategory] = useState([])
    const [filterData,setFilterData] = useState([])
    const [sortType,setSortType] = useState('relevant')
    const [search,setSearch] = useState('')



    useEffect(() => {
        let filtered = [...products]

        
        if (category.length > 0) {
            filtered = filtered.filter(item => category.includes(item.category))
        }
        if(search){
            filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        switch (sortType) {
            case 'low-high':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'high-low':
                filtered.sort((a, b) => b.price - a.price)
                break
            default:
                break
        }

        setFilterData(filtered)
    }, [search,category, products, sortType])


    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(item=>item!==e.target.value))
        }
        else{
            setCategory(prev=>[...prev,e.target.value])
        }
    }

    useEffect(() => {
        if (cid!="all") {
            setCategory([cid])
        } else {
            setCategory([])
        }
        window.scrollTo(0, 0)
    }, [cid])




  return (
    <div className='relative'>
        <div className="absolute inset-0 -z-3 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className='max-w-[90%] my-10 mx-auto flex flex-col sm:flex-row gap-10'>
        {/* //left */}
        <div className='sm:flex-3/12 px-2'>
            <p onClick={()=>{setShowFilter(!showFilter)}} className='font-outfit cursor-pointer text-xl flex items-center gap-3'>FILTERS   
                <img src={dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} alt="" />
            </p>
             <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter?'':'hidden'}`}>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'fresh'} checked={category.includes('fresh')} onChange={toggleCategory} />Fresh
                    </p>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'bakery'} checked={category.includes('bakery')} onChange={toggleCategory} />Bakery
                    </p>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'handmade'} checked={category.includes('handmade')} onChange={toggleCategory} />Handmade and Crafts
                    </p>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'dairy'} checked={category.includes('dairy')} onChange={toggleCategory} />Dairy
                    </p>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'beverages'} checked={category.includes('beverages')} onChange={toggleCategory} />Beverages
                    </p>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'homedecor'} checked={category.includes('homedecor')} onChange={toggleCategory} />Home Decor
                    </p>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'personal care'} checked={category.includes('personal care')} onChange={toggleCategory} />Personal Care
                    </p>
                    <p className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={'clothing'} checked={category.includes('clothing')} onChange={toggleCategory} />Clothing
                    </p>
                </div>
            </div>
            <p onClick={()=>{setShowSort(!showSort)}} className='font-outfit cursor-pointer text-xl flex items-center gap-3'>SORT
                <img src={dropdown_icon} className={`h-3 sm:hidden ${showSort?'rotate-90':''}`} alt="" />
            </p>
            <select onChange={(e)=>setSortType(e.target.value)} className={`border-2 ${showSort?'':'hidden'} border-gray-300 text-sm pl-2 ml-2 py-3 my-3`}>
                    <option value="relevant">Sort by: Relevant</option>
                    <option value="low-high">Sort by: Low-High</option>
                    <option value="high-low">Sort by: High-Low</option>
                </select>
        </div>

        <div className='sm:flex-9/12'>
            <div className='flex justify-between sm:items-center sm:w-auto  md:flex-row flex-col'>
                <Title text1={"ALL"} text2={"PRODUCTS"}/>
                <div className='px-5 py-3 border  md:w-auto w-4/5 border-gray-400 flex items-center gap-3 rounded-full '>
                    <img src={assets.search} className='w-4 h-4' alt="" />
                    <input type="text" placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-full outline-none' />
                </div>
            </div>
            <div className='mt-5 mb-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-5'>
            {
                filterData.map((item,idx)=>(
                    <ProductItem key={item._id} vid={item.vendor} id={item._id} name={item.name} src={item.images?.[0]}  price={item.price} quantity={item.quantity}/>
                ))
            }
        </div>
        </div>
    </div>
    </div>
  )
}

export default Items
