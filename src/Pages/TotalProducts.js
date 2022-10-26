import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import { auth, db } from '../firebase'
import Products from './Products'
import { useHistory } from 'react-router-dom'
import '../assets/css/style.css'

const TotalProducts = (props) => {
    const history = useHistory();
    //get uid
    function GetUserUid(){
        const [uid, setUid] = useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged((user)=>{
                if (user){
                    setUid(user.uid)
                }
            })
        },[])
        return uid;
    }
    const userUid = GetUserUid();
    //state products
    const [products, setProducts] = useState([])
    // get products
    const getProducts = async () => {
        const products = await db.collection('Products').get()
        const productsArray = [];
        for(var snap of products.docs){
        var data = snap.data();
        data.id = snap.id;
        productsArray.push({...data});
        if(productsArray.length === products.docs.length){
            setProducts(productsArray);
        }
        }
    }
    useEffect(() => {
        getProducts();
    },[])
    const addToCart = (product) => {
        if(userUid !== null){
            // console.log(product);
            let Product = product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            db.collection('Cart ' + userUid).doc(product.id).set(Product).then(()=>{
                console.log('successfully added to cart');
            })
        }else{
            history.push('/login');
        }
        console.log(product);
    }

  return (
    <>
    {products.length > 0 && (
      <Container fluid >
          <div className='products-box'>
              <Products products={products} addToCart={addToCart}/>
          </div>
      </Container>
      )}
    {products.length < 1 && (
        <Container fluid>Please wait....</Container>
        )}
  </>
  )
}

export default TotalProducts