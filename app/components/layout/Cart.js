'use client'
import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { CartContext } from "../AppContext";
import CartIcon from '../icons/CartIcon';



const Cart = () => {
    const [toggle, setToggle] = useState(false) 
    const [cartTotal, setCartTotal] = useState(0)

    const { cartProducts } = useContext(CartContext)
    
    // update quantity
    useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
            const total = cartProducts.reduce((acc, curr) => acc + curr.quantity, 0)
            setCartTotal(total)
        } else {
            setCartTotal(0)
       }
   }, [cartProducts])

    const handleClick = () => {
        setToggle(!toggle)
    }
    // cart icon color change
    const cartIconColor = toggle ? '#222222' : '#888888'

//    console.log(cartProducts)
    return ( 
        <div className="">
            
                
            <div className="flex flex-row w-11/12 mx-auto md:w-64 md:mr-16 justify-end">
                {/* Desktop view */}
                <button className={ `hidden lg:block text-fontDark text-xs py-1 px-2 bg-header ${toggle ? 'border border-t-borderLight border-r-borderLight border-l-borderLight border-b-white bg-white -mb-1px z-10 ' : 'border border-header'}`} onClick={handleClick}>
                    <span className={toggle ? 'text-fontDark' : 'text-fontGrey'}>My Cart ({ cartTotal})</span>
                </button>
                {/* Mobile view  */}
                <button className={`lg:hidden text-fontDark text-xs py-1 px-2 bg-header ${toggle ? 'border border-t-borderLight border-r-borderLight border-l-borderLight border-b-white bg-white -mb-1px z-10 ' : 'border border-header'}`} onClick={handleClick}>
                    <div className="flex flex-row items-center justify-end gap-2">
                        <span><CartIcon fill={ cartIconColor } /></span>
                        <span className={toggle ? 'text-fontDark' : 'text-fontGrey'}>({ cartTotal})</span>
                    </div>
                    
                </button>
                
            </div>
            {toggle && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-11/12 top-10 md:transform-none md:left-auto md:right-16 md:w-64 lg:w-80 px-4 py-6 border border-borderLight bg-white flex flex-col gap-8">
                {cartProducts.length > 0 && (
                    cartProducts.map(product => (
                        <div key={product.id} className="flex gap-2 items-center">
                            <Image src={product.imageURL} alt={product.title} width={60} height={180} />
                            <div className="flex flex-col gap-3">
                                <div className="text-sm">{product.title}</div>
                                <div className="text-sm text-fontDark">{product.quantity } x $<span className="font-bold">{product.price.toFixed(2)}</span></div>
                                <div className="text-sm">Size: {product.size}</div>
                            </div>
                            
                        </div>
                    ))
                    ) }
                    {cartProducts.length == 0 && (
                        <div>Your cart is empty.</div>
                    )}
                </div>
                )}
     
                
            
        </div>
        
     );
}
 
export default Cart;
