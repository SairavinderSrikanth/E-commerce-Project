import React,{createContext,useEffect,useState} from "react";



export const ShopContext= createContext(null);


const ShopContextProvider =(props)=>{

    const getDefaultCart = ()=>{
        let cart={}
        for(let index=0;index<300+1;index++){
            cart[index]=0;
        }
        return cart;
    
    }
    const [all_products,setAll_Product]=useState([]);
    const[cartItems,setCartItems]=useState(getDefaultCart());
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAll_Product(data)})

        if(localStorage.getItem('auth-token')){
            console.log(localStorage.getItem('auth-token'));
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            }).then((res)=>res.json()).then((data)=>{setCartItems(data)})
        }else{
            console.log("no token available")
        }
    },[])

    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            console.log(localStorage.getItem('auth-token'));
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((res)=>res.json()).then((data)=>{console.log(data)})
        }else{
            console.log("no token available")
        }

    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            console.log(localStorage.getItem('auth-token'));
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((res)=>res.json()).then((data)=>{console.log(data)})
        }else{
            console.log("no token available")
        }

    }
    const getTotalCartItems=()=>{
        let totalItems=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                totalItems+=cartItems[item];
            }
        }
        return totalItems;

    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=all_products.find((product)=>product.id===Number(item))
                totalAmount+=iteminfo.new_price * cartItems[item];
                
            }

        }
        return totalAmount;
    }
    const contextValue= {all_products,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;
