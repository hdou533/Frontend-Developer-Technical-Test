'use client'
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { CartContext } from "../components/AppContext";


const ProductDetail = () => {

    const [product, setProduct] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [error, setError] = useState(null)
    
    const {addToCart} = useContext(CartContext)


    useEffect(() => {
        fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
            .then(res => res.json())
            .then(data => setProduct(data)) 
    }, [])
    
    const handleSizeSelected = (size) => {
        setSelectedSize(size)
    }

    const handleAddToCart = () => {
        if (selectedSize) {
            setError(null)
            addToCart(product, selectedSize)
            setSelectedSize(null)
            
        } else {
            setError('Please select a size before adding to cart.')
        }
    }

    return ( 
        <div className="my-10 mx-auto">
            
            {product && (
                <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col md:flex-row justify-center gap-8">
                    <div>
                    
                        <Image
                            src={product.imageURL}  
                            alt={product.title}
                            width={486}
                            height={729}
                            />
                        
                    </div>
                    <div className="flex flex-col gap-6 max-w-96">
                        <h4 className="text-fontDark text-xl">{product.title}</h4>
                        <p className="text-fontDark font-bold text-sm">${product.price.toFixed(2)}</p>
                        <p className="text-fontGrey text-xs">{product.description}</p>
                        <div className="flex flex-col gap-3">
                            <div className="uppercase text-xs font-semibold text-fontGrey">
                                Size
                                <span className=" text-requiredStar">*</span>
                            </div>
                            <div className="flex gap-2">
                                {product.sizeOptions.map(size => (
                                    <button
                                        key={size.id}
                                        className={`w-10 h-10 border ${selectedSize == size.label ? 'border-borderDark border-2' : 'border-borderLight'}  flex justify-center items-center`}
                                        onClick={() => handleSizeSelected(size.label)}
                                    >
                                        <span className=" text-xs text-fontGrey">{size.label}</span>
                                    </button>
                                ))}
                                
                            </div>
                            {error && <div className="text-requiredStar text-xs">{error}</div>}
                        </div>
                        <button className="w-fit border-2 border-borderDark text-fontDark font-semibold hover:bg-borderDark hover:text-white transition duration-200 ease-out hover:ease-in px-6 py-2 uppercase text-sm" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            )}  
           
        </div>
     );
}
 
export default ProductDetail;
