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

    const deleteFromCart = (productSize) => {
        
        
        const product = cartProducts.find(item => item.size == productSize)
        
        const productIndex = cartProducts.findIndex(item => item.size == productSize)
        if (product.quantity > 1) {
            const updatedProducts = [...cartProducts]
            const updateProduct = { ...updatedProducts[productIndex] }
            
            updateProduct.quantity -= 1
            updatedProducts[productIndex] = updateProduct

            setCartProducts(updatedProducts)
            saveToLocalStorage(updatedProducts)
        } else {
            
            setCartProducts(prev => {
                const newCartProducts = prev.filter((pre, index) => index !== productIndex)
                console.log(newCartProducts)
                saveToLocalStorage(newCartProducts)
                return newCartProducts
            })
        }
    }

    return ( 
        <CartContext.Provider value={{cartProducts, setCartProducts, addToCart, deleteFromCart}}>
            {children}
        </CartContext.Provider>
     );
}
 
export default AppProvider;
