import React,{useState, useEffect} from 'react'
import { db, auth } from '../firebase';
import CartProducts from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import { Card, ListGroup } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

export const Cart = () => {
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

        // cart product increase function
        var Product;
        const cartProductIncrease=(cartProduct)=>{
            // console.log(cartProduct);
            Product=cartProduct;
            Product.qty=Product.qty+1;
            Product.TotalProductPrice=Product.qty*Product.price;
            // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('increment added');
                    })
                }
                else{
                    console.log('user is not logged in to increment');
                }
            })
        }
    
    // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);

    // console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);


        // cart product decrease functionality
        const cartProductDecrease =(cartProduct)=>{
            Product=cartProduct;
            if(Product.qty > 1){
                Product.qty=Product.qty-1;
                Product.TotalProductPrice=Product.qty*Product.price;
                 // updating in database
                auth.onAuthStateChanged(user=>{
                    if(user){
                        db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                            console.log('decrement');
                        })
                    }
                    else{
                        console.log('user is not logged in to decrement');
                    }
                })
            }
        }
       
         // state of totalProducts
         const [totalProducts, setTotalProducts]=useState(0);
         // getting cart products   
         useEffect(()=>{        
             auth.onAuthStateChanged(user=>{
                 if(user){
                     db.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                         const qty = snapshot.docs.length;
                         setTotalProducts(qty);
                     })
                 }
             })       
         },[])  
       

  return (
    <>
    {cartProducts.length > 0 && (
        <div className='container-fluid'>
            <h1 className='text-center'>Cart</h1>
            <div className='products-box'>
                <CartProducts  cartProducts={cartProducts}  cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease}/>
            </div>
            <Card style={{width : "20rem"}}>
                <Card.Header as='h5'>Card Summary</Card.Header>
                <ListGroup className="list-group-flush">
                    Totals Items : {totalQty}
                </ListGroup>
                <ListGroup className="list-group-flush">
                <div>
                Total Pay: <CurrencyFormat className='product-text price' value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp '}>Total Pay : </CurrencyFormat>
                </div>
                </ListGroup>
            <ListGroup className="list-group-flush">
                <StripeCheckout/>
            </ListGroup>
            </Card>
        </div>
    )}
    {cartProducts.length < 1 && (
        <div className='container-fluid'>No products to show</div>
        ) }    
    </>
  )
}
