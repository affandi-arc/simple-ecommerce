import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ForgotPassword from '../Pages/ForgotPassword'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import UpdateProfile from '../Pages/UpdateProfile'
import Signup from '../Pages/Signup'
import Home from '../Pages/Home'
import NotFound from '../Pages/NotFound'
import { AuthProvider } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoute'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import {auth, db} from '../firebase'
import AddProducts from '../Pages/AddProducts'
import ListProducts from '../Pages/ListProducts'
import { Cart } from '../Pages/Cart'

const Routes = () => {
  function GetCurentUser(){
    const [user, setUser] = useState(null)
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if(user){
          db.collection('users').doc(user.uid).get().then(snapshot => {
            setUser(snapshot.data().FullName);
          })
        }else{
          setUser(null)
        }
      })
    },[])
    return user;
  }

  ///
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

      // getting the qty from cartProducts in a seperate array
      const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);

    // console.log(totalQty);
  const user = GetCurentUser();
  // console.log(user);

  return (
  <Router>
    <Header user={user} totalQty={totalQty}/>
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home}/> 
        <Route path="/home" component={Home} />
        <Route path="/list-products" component={ListProducts} />
        <Route path="/add-products" component={AddProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/profile"><Profile user={user}/> </PrivateRoute>
        <PrivateRoute path="/update-profile" component={UpdateProfile} />
        <Route component={NotFound} />
      </Switch>
    </AuthProvider>
    <Footer/>
  </Router>
  )
}

export default Routes