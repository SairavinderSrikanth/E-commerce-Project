import React from 'react'
import './Popular.css'
import { useState,useEffect } from 'react'
import Item from '../Item/Item'
const Popular = () => {

  const [popular,setPopular]=useState([]);

  const fetchCollections = async ()=>{
    await fetch('http://localhost:4000/popularinwomen')
    .then((res)=>res.json())
    .then((data)=>{setPopular(data)});
  }

  useEffect(()=>{
    fetchCollections();
  },[]);

  
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular-item">
            {popular.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>

    </div>
  )
}
export default Popular
