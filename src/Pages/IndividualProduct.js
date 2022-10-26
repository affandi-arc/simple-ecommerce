import React from 'react'
import { Button } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format'


const IndividualProduct = ({individualProduct, addToCart}) => {
    
    const handleAddToCart = () => {
      addToCart(individualProduct);
    }
  return (
<div className='product'>
    <div className='product-img'>
        <img src={individualProduct.url} alt="product-img"/>
    </div>
    <hr/>
    <div className='product-text title'>{individualProduct.title}</div>
    <div className='product-text description'>{individualProduct.description}</div>
    <CurrencyFormat className='product-text price' value={individualProduct.price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
    <Button onClick={handleAddToCart} className='btn btn-success'>ADD TO CART</Button>
</div> 
  )
}

export default IndividualProduct