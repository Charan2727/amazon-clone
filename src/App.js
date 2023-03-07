import React, { useEffect } from "react"
import './App.css';
import Header from "./Header";
import Home from "./Home"
import Checkout from "./Checkout";
import Login from "./Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";

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
          <Route path="/checkout" element={<>  <Header /><Checkout /></>} />
          <Route path="/" element={<> <Header /><Home /></>} />



        </Routes>


      </div>
    </Router>
  );
}

export default App;
