import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'
import { doc, query, orderBy, onSnapshot,collection } from "firebase/firestore";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            /*  db
                  .collection('users')
                  .doc(user?.uid)
                  .collection('orders')
                  .orderBy('created', 'desc')
                  .onSnapshot(snapshot => (
                      setOrders(snapshot.docs.map(doc => ({
                          id: doc.id,
                          data: doc.data()
                      })))
                  ))
                  */

            const usersCollection = collection(db, "users");
            const userDoc = doc(usersCollection, user?.uid);
            const ordersCollection = collection(userDoc, "orders");
            const ordersQuery = query(ordersCollection, orderBy("created", "desc"));

            const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
                setOrders(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });



        } else {
            setOrders([])
        }

    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders