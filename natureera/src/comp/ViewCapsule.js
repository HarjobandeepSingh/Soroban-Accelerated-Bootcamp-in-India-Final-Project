import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../styles/style.css";
import { getCapsule } from '../utils/contract.js';

function ViewCapsule() {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);

  useEffect(() => {
    const fetchCapsule = async () => {
      const capsuleData = await getCapsule(id);
      setCapsule(capsuleData);
    };
  
    fetchCapsule();
  }, [id]);

  if (!capsule) return <div>Loading...</div>;

  return (
    <div>
      <nav>
        <div className="logo">
          <h4>NatureEra</h4>
        </div>
        <ul>
          <li className="g">
            <Link to="/">Home</Link>
          </li>
          <li className="g">
            <Link to="/create_cap">Create Capsule</Link>
          </li>
          <li className="g">
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <section className="capsule-details">
        <h2>{capsule.description}</h2>
        <p>Unlock Date: {new Date(capsule.unlock_date * 1000).toLocaleDateString()}</p>
        <p>Metadata: {capsule.metadata.join(', ')}</p>
        <p>Status: {new Date() >= new Date(capsule.unlock_date * 1000) ? 'Unlocked' : 'Locked'}</p>
        <img src={`https://ipfs.infura.io/ipfs/${capsule.image_hash}`} alt="Time Capsule" style={{ maxWidth: '100%' }} />
      </section>
      <footer>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </footer>
    </div>
  );
}

export default ViewCapsule;
