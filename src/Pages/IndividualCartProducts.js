import React from 'react'
import {Icon} from '@iconify/react';
import CurrencyFormat from 'react-currency-format'
import { db, auth } from '../firebase';

const IndividualCartProducts = ({cartProduct,cartProductIncrease,cartProductDecrease}) => {
    
    const handleCartProductIncrease=()=>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease=()=>{
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartProduct.title}</div>
            <div className='product-text description'>{cartProduct.description}</div>
            <CurrencyFormat className='product-text price' value={cartProduct.price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
            <span>Quantity</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' onClick={handleCartProductDecrease} >
                    <Icon icon="akar-icons:circle-minus" inline={true} size={20}/>
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' onClick={handleCartProductIncrease}>
                    <Icon icon="akar-icons:circle-plus" inline={true} size={20}/>
                </div>
            </div>
            <CurrencyFormat className='product-text price' value={cartProduct.TotalProductPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete} >DELETE</div>            
        </div>
  )
}

export default IndividualCartProducts