import React from 'react'
import IndividualCartProducts from './IndividualCartProducts'

const CartProducts = ({cartProducts,cartProductIncrease,
    cartProductDecrease}) => {
    return cartProducts.map((cartProduct)=>(
        <IndividualCartProducts key={cartProduct.ID} cartProduct={cartProduct} cartProductIncrease={cartProductIncrease}
        cartProductDecrease={cartProductDecrease}/>
  ))
}


export default CartProducts