import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/style.css";
import { getCapsuleIds } from '../utils/contract.js';

export default function Home(){
    const [capsuleIds, setCapsuleIds] = useState([]);

    useEffect(() => {
      const fetchCapsuleIds = async () => {
        const ids = await getCapsuleIds();
        if (Array.isArray(ids)) {
          setCapsuleIds(ids);
        } else {
          setCapsuleIds([ids]); // Convert single value to array
        }
      };
  
      fetchCapsuleIds();
    }, []);
    
    return(
        <>            
        <nav>
            <div className="logo">
                <h4>NatureEra</h4>
            </div>
            <ul >
                <li className="g">
                    <Link to="/">Home</Link>
                </li>
                <li className="g">
                    <Link to="/create_cap">Create Capsule</Link>
                </li>
                <li className="g">
                    <Link to="/view_cap">View Capsule</Link>
                </li>
                <li className="g">
                    <Link to="/about">About Us</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
            </ul>
        </nav>
        <div className="hero">
            <div className="hero_img">
                <h1>Preserving Nature's Legacy Through Time</h1>
                <div className="btn">Create a Time Capsule</div>
            </div>
        </div>
        <div className="unlocked">
            <h1>Unlocked Time Capsules</h1>
            <div>
                <div className="capsule">
                    <div className="cap">
                        <img src="https://images.pexels.com/photos/2131623/pexels-photo-2131623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="capsule"/>
                        <h3>Time Capsule 1</h3>
                        <p>Opened on 12th December 2021</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="willunlocked">
  <h1>Time Capsules</h1>
  <div>
    {capsuleIds.map((id) => (
      <div className="cap" key={id.type}>
        <Link to={`/capsule/${id.type}`}>{id.title}</Link>
        <img src="https://images.pexels.com/photos/2131623/pexels-photo-2131623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="capsule"/>
        <h3>{id.title}</h3>
        <p>Opened on {id.detail}</p>
      </div>
    ))}
  </div>
</div>

        </>
    );
}