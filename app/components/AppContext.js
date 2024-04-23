'use client'
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext({})


const AppProvider = ({ children }) => {

    const [cartProducts, setCartProducts] = useState([])
    
    const localStorage = typeof window != 'undefined' ? window.localStorage : null
    
    useEffect(() => {
        if (localStorage && localStorage.getItem('cart')) {
            setCartProducts(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    const saveToLocalStorage = (cartProducts) => {
        if (localStorage) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    const addToCart = (product, size) => {
        const existingProductIndex = cartProducts.findIndex(item => item.id === product.id && item.size === size);
        
        if (existingProductIndex !== -1) {
            const updatedProducts = [...cartProducts];
            const updatedProduct = { ...updatedProducts[existingProductIndex] };
            updatedProduct.quantity += 1;
            updatedProducts[existingProductIndex] = updatedProduct;
    
            setCartProducts(updatedProducts);
            saveToLocalStorage(updatedProducts);
        } else {
            const newProduct = { ...product, size, quantity: 1 };
            const newProducts = [...cartProducts, newProduct];
    
            setCartProducts(newProducts);
            saveToLocalStorage(newProducts);
        }
    }

    return ( 
        <CartContext.Provider value={{cartProducts, setCartProducts, addToCart}}>
            {children}
        </CartContext.Provider>
     );
}
 
export default AppProvider;
