import { categories } from '../assets/assets.js';
import { Link } from 'react-router-dom';

// bg-[#cdf6d1]
const Category = () => {
  return (
    <div className="product-scroll flex gap-1 overflow-x-auto ">
      {categories.map((category, index) => (
        <Link key={category._id} to={`/items/${category._id}`}>
        <div className="hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center w-[120px] min-w-[120px] rounded-xl p-4"
          >
          <div className="w-[90px] h-[90px] rounded-full overflow-hidden bg-gray-100 border border-gray-500">
            <img
              className="w-full h-full object-cover"
              src={category.image}
              alt={category.name}
              />
          </div>
          <div className="mt-2 text-center">
            <h1 className="text-gray-700 font-semibold text-sm">{category.name}</h1>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
