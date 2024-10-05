import {FC} from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri' 
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/types/product.interface'

const AddToCartButton: FC<{product: IProduct}> = ({
    product}) => {
        const {addToCart, removeFromCart} = useActions()
        const {items} = useCart()

        const currentElement = items.find (
        (cartItem: { product: { id: number } }) => cartItem.product.id === product.id
        )

        return (
            <div>
                <button
                onClick={()=>
                    currentElement
                    ? removeFromCart ({id: currentElement.id})
                    : addToCart({
                        product,
                        quantity:1,
                        price: product.price
                    })
                }
                >
                    {currentElement ? <RiShoppingCartFill /> :
                    <RiShoppingCartLine/>}
                </button>
            </div>
        )
    }

    export default AddToCartButton