import fresh from './fresh_c.png'
import foods from './foods.png'
import care from './care_c.png'
import home from './decor_c.png'
import cloth from './clothes_c.png'
import handmade from './arts_c.png'
import bakery from './bakery_c.png'
import dairy_c from './dairy_c.png'

import tomato from './tomato.png'
import banana from './banana.png'
import cookies from './cookies.png'
import chips from './chips.png'
import bag from './bag.png'
import basket from './basket.png'
import diyas from './diyas.png'
import honey from './honey.png'
import mango from './mango_juice.png'
import orange from './orange_juice.png'
import masalatea from './masala_tea.png'
import milk from './milk.png'
import mug from './mug.png'
import paneer from './paneer.png'
import pot from './pot.png'
import sugarcane from './sugarcane.png'
import vase from './vase.png'

import search from './search_icon.png'
import profile from './profile_icon.png'
import cart from './cart_icon.png'
import bin from './bin_icon.png'
import upload_area from './upload_area.png'
import saving from './saving.gif'
import vendor_man from './vendor_man.png'
import vendor_woman from './vendor_woman.png'
import banner from './banner.png'

import staple from './staple.png'
import fruits from './fruits.png'
import dairy from './Dairy.png'
import drink from './beverages.png'
import house from './household.png'
import crafts from './crafts.png'
import snacks from './snacks.png'


import staplebn from './staple_banner.png' 
import bakerybn from './bakery_banner.png'
import fruitsbn from './fruits_banner.png'
import dairybn from './dairy_banner.png'
import beveragesbn from './beverages_banner.png'
import householdbn from './household_banner.png'
import craftsbn from './crafts_banner.png'
import snacksbn from './snacks_banner.png'


import stripe from './stripe_logo.png'
import ourMission from './ourMission.png'
import ourStory from './ourStory.png'
import ourValues from './ourValues.png'
import star from './star_icon.png'


export const assets = {
    search,profile,cart,bin,upload_area,saving,vendor_man,vendor_woman,banner,stripe,ourMission,ourStory,ourValues,star
}

export const vendor = [
    {
        _id:"aaa1",
        name:"Fresh Mart",
        category:"Grocery",
        loc:"Madhapur",
        subloc:"Hyderabad",
        star:"4.5",
        seller:"",
        image:[staple],
        banner:[staplebn]
    },
    {
        _id:"aaa2",
        name:"Artisan Crafts",
        category:"Handmade & Crafts",
        loc:"Gachibowli",
        subloc:"Hyderabad",
        star:"4.8",
        seller:"",
        image:[crafts],
        banner:[craftsbn]
    },
    {
        _id:"aaa3",
        name:"Rythu Bazar",
        category:"Grocery",
        loc:"Kukatpally",
        subloc:"Hyderabad",
        star:"4.3",
        seller:"",
        image:[fruits],
        banner:[fruitsbn]
    },
    {
        _id:"aaa4",
        name:"Milk Basket",
        category:"Dairy",
        loc:"Miyapur",
        subloc:"Hyderabad",
        star:"4.2",
        seller:"",
        image:[dairy],
        banner:[dairybn]
    },
    {
        _id:"aaa5",
        name:"Hot Chips",
        category:"Snacks",
        loc:"KBHP",
        subloc:"Hyderabad",
        star:"4.1",
        seller:"",
        image:[snacks],
        banner:[snacksbn]
    },
    {
        _id:"aaa6",
        name:"Rai Cafe",
        category:"Beverages",
        loc:"Kompally",
        subloc:"Hyderabad",
        star:"4.6",
        seller:"",
        image:[drink],
        banner:[beveragesbn]
    },
    {
        _id:"aaa7",
        name:"H-mart",
        category:"HouseHolds",
        loc:"Lingampally",
        subloc:"Hyderabad",
        star:"4.1",
        seller:"",
        image:[house],
        banner:[householdbn]
    },
]


export const categories = [
    {
        _id:"fresh",
        name:"Fresh Produce",
        image:[fresh],
    },
    {
        _id:"bakery",
        name:"Baked Goods & Snacks",
        image:[bakery]
    },
    {
        _id:"handmade",
        name:"Handmade & Crafts",
        image:[handmade]
    },
    {
        _id:"dairy",
        name:"Dairy Products",
        image:[dairy_c]
    },
    {
        _id:"clothing",
        name:"Clothing & Accessories",
        image:[cloth]
    },
    {
        _id:"homedecor",
        name:"Home Decor",
        image:[home]
    },
    {
        _id:"personal care",
        name:"Personal Care",
        image:[care]
    },
    {
        _id:"beverages",
        name:"Foods & Beverages",
        image:[foods]
    }
]

export const products = [
    {
        _id:"aaa",
        name:"Tomato",
        category:"fresh",
        subcategory:"vegetables",
        price:50,
        quantity:1,
        image:[tomato,banana,tomato],
        seller:"aaa3",
        bestseller:true
    },
    {
        _id:"aab",
        name:"Banana",
        category:"fresh",
        subcategory:"fruits",
        price:60,
        quantity:12,
        image:[banana],
        seller:"aaa3",
        bestseller:false
    },
    {
        _id:"baa",
        name:"Cookies",
        category:"bakery",
        subcategory:"sweet",
        price:50,
        quantity:1,
        image:[cookies],
        seller:"aaa5",
        bestseller:true
    },
    {
        _id:"bab",
        name:"Potato Chips",
        category:"bakery",
        subcategory:"chips",
        price:20,
        quantity:1,
        image:[chips],
        seller:"aaa5",
        bestseller:false
    },
    {
        _id:"caa",
        name:"Milk",
        category:"diary",
        subcategory:"fresh",
        price:40,
        quantity:1,
        image:[milk],
        seller:"aaa4",
        bestseller:true
    },
    {
        _id:"cab",
        name:"Paneer",
        category:"diary",
        subcategory:"fresh",
        price:100,
        quantity:1,
        image:[paneer],
        seller:"aaa4",
        bestseller:true
    },
    {
        _id:"daa",
        name:"Mango Juice",
        category:"beverages",
        subcategory:"fresh",
        price:75,
        quantity:1,
        image:[mango],
        seller:"aaa6",
        bestseller:false
    },
    {
        _id:"dab",
        name:"Orange Juice",
        category:"beverages",
        subcategory:"fresh",
        price:70,
        quantity:1,
        image:[orange],
        seller:"aaa6",
        bestseller:false
    },
    {
        _id:"dac",
        name:"Sugarcane Juice",
        category:"beverages",
        subcategory:"fresh",
        price:80,
        quantity:1,
        image:[sugarcane],
        seller:"aaa6",
        bestseller:false
    },
    {
        _id:"eaa",
        name:"Honey",
        category:"beverages",
        subcategory:"fresh",
        price:350,
        quantity:1,
        image:[honey],
        seller:"aaa1",
        bestseller:true
    },
    {
        _id:"eab",
        name:"Masala Tea",
        category:"beverages",
        subcategory:"fresh",
        price:150,
        quantity:1,
        image:[masalatea],
        seller:"aaa6",
        bestseller:true
    },
    {
        _id:"faa",
        name:"Diyas",
        category:"handmade",
        subcategory:"crafts",
        price:45,
        quantity:3,
        image:[diyas],
        seller:"aaa2",
        bestseller:false
    },
    {
        _id:"fab",
        name:"Coffee Mug",
        category:"handmade",
        subcategory:"crafts",
        price:199,
        quantity:1,
        image:[mug],
        seller:"aaa2",
        bestseller:false
    },
    {
        _id:"fac",
        name:"Tote Bag",
        category:"clothing",
        subcategory:"crafts",
        price:99,
        quantity:1,
        image:[bag],
        seller:"aaa2",
        bestseller:false
    },
    {
        _id:"fad",
        name:"Handwoven Basket",
        category:"handmade",
        subcategory:"crafts",
        price:149,
        quantity:1,
        image:[basket],
        seller:"aaa2",
        bestseller:true
    },
    {
        _id:"fae",
        name:"Ceramic Vase",
        category:"homedecor",
        subcategory:"crafts",
        price:319,
        quantity:1,
        image:[vase],
        seller:"aaa2",
        bestseller:true
    },
    {
        _id:"faf",
        name:"Plant Pot",
        category:"homedecor",
        subcategory:"crafts",
        price:89,
        quantity:1,
        image:[pot],
        seller:"aaa2",
        bestseller:false
    },

]