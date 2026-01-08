import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../AppAdmin";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Add = ({ token }) => {
  // Default placeholder images
  const defaultImages = [
    assets.upload_area,
    assets.upload_area,
    assets.upload_area,
    assets.upload_area,
  ];

  const [images, setImages] = useState(defaultImages);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [units, setUnits] = useState("pieces");
  const [category, setCategory] = useState("fresh");
  const [bestSeller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "localcart_unsigned"); // 👈 your unsigned preset
    data.append("folder", "products");

    const res = await axios.post(import.meta.env.VITE_CLOUD_UPLOAD, // 👈 replace with your cloud_name
      data
    );
    return res.data.secure_url; // hosted image URL
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // 1️⃣ Upload only actual files (not placeholder strings)
      const uploadedUrls = [];
      for (const img of images) {
        if (img instanceof File) {
          const url = await uploadImageToCloudinary(img);
          uploadedUrls.push(url);
        }
      }

      // 2️⃣ Send URLs + other product data to backend
      const productData = {
        name,
        price,
        quantity,
        units,
        category,
        bestSeller,
        images: uploadedUrls, // array of URLs
      };

      const response = await axios.post(
        `${backendUrl}/vendor/addProduct`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.msg);

        // Reset form
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("fresh");
        setUnits("pieces");
        setImages(defaultImages); // reset placeholders
        setBestseller(false);
      } else {
        toast.error(response.data.msg || "Something went wrong");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.error("Error adding product:", e.message);
      toast.error(e.response?.data?.error || e.message);
    }
  };

  const handleImageChange = (file, index) => {
    const newImages = [...images];
    newImages[index] = file ? file : defaultImages[index];
    setImages(newImages);
  };

  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex-col flex  items-center justify-center bg-gray-50 z-50">
          <img src={assets.saving} className="w-[125px]" alt="" />
          <div className="font-semibold text-xl ml-[-16px]">Saving...</div>
        </div>
      )}

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-3"
      >
        {/* Upload Images */}
        <div>
          <p className="mb-2">Upload Images (optional)</p>
          <div className="flex gap-2">
            {images.map((img, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <img
                  className="w-20 h-20 border object-cover"
                  src={img instanceof File ? URL.createObjectURL(img) : img}
                  alt="preview"
                />
                <input
                  onChange={(e) => handleImageChange(e.target.files[0], index)}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2 border"
            type="text"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div>
            <p className="mb-2">Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-3 py-2 border"
            >
              <option value="fresh">Fresh Produce</option>
              <option value="bakery">Baked Goods & Snacks</option>
              <option value="handmade">Handmade & Crafts</option>
              <option value="clothing">
                Clothing & Accessories
              </option>
              <option value="homedecor">Home Decor</option>
              <option value="personal care">Personal Care</option>
              <option value="dairy">Dairy</option>
              <option value="beverages">Foods & Beverages</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Units</p>
            <select
              onChange={(e) => setUnits(e.target.value)}
              value={units}
              className="w-full px-3 py-2 border"
            >
              <option value="pieces">Pieces</option>
              <option value="kg">Kg</option>
              <option value="litre">Litre</option>
            </select>
          </div>
        </div>

        {/* Price & Quantity */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div>
            <p className="mb-2">Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 border sm:w-[150px]"
              type="number"
              placeholder="₹₹₹"
              min={0}
              required
            />
          </div>

          <div>
            <p className="mb-2">Quantity</p>
            <input
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              className="w-full px-3 py-2 border sm:w-[150px]"
              type="number"
              placeholder="Quantity"
              min={1}
              required
            />
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestSeller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Mark as Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-28 py-3 mt-4 cursor-pointer bg-black text-white"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
