import React, { useEffect } from "react"
import './App.css';
import Header from "./Header";
import Home from "./Home"
import Checkout from "./Checkout";
import Orders from "./Orders";
import Login from "./Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import Payment from "./Payment";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe('pk_test_51MixtuSFx3dvdvabtNVaiJdhC3QNwGn9pVBlmgKHTCK7n5xcfVPtGk3a40G6SkSNyFPj7pYfIUyoDjb8i6SRvRBd00i7Du5q91');

function App() {
  const [{ }, dispatch] = useStateValue();



  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log('the user is-->', authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })


      }
    });


  }, [])

  return (
    //BEM convention App to app
    <Router>
      <div className="app">

        <Routes>
          <Route path="/login" element={<><Login /></>} />
          <Route path="/orders" element={<><Header /><Orders /></>} />
          <Route path="/checkout" element={<>  <Header /><Checkout /></>} />
          <Route path="/payment" element={<><Header />
            <Elements stripe={promise}><Payment /></Elements>
          </>} />
          <Route path="/" element={<> <Header /><Home /></>} />



        </Routes>


      </div>
    </Router>
  );
}

export default App;
