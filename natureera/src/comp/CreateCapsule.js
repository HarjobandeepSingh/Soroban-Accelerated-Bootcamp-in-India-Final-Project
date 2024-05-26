import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.css";
import { createCapsule } from '../utils/contract.js';

const CreateCapsule = () => {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [unlockDate, setUnlockDate] = useState('');
  const [metadata, setMetadata] = useState('');
  const [capsuleId, setCapsuleId] = useState('');

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substr(2, 9);
    return `CAP-${timestamp}-${randomString}`;
  };

  const handleCreateCapsule = async (e) => {
    e.preventDefault();
    const unlockTimestamp = new Date(unlockDate).getTime() / 1000;
    const capsuleId = generateUniqueId();
    setCapsuleId(capsuleId);

    // Create a new time capsule object
    const timeCapsule = {
      id: capsuleId,
      description,
      imageFile,
      unlockTimestamp,
      metadata: metadata.split(','),
    };

    // Call the createCapsule function from contract.js
    try {
      const response = await createCapsule(description, unlockTimestamp, metadata, 'imageHash'); // Replace 'imageHash' with the actual image hash
      setCapsuleId(response);
      alert(`Time Capsule Created with ID: ${capsuleId}`);
    } catch (error) {
      console.error(error);
    }
  };

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
      <section className="form-section">
        <h2>Create a New Time Capsule</h2>
        <form onSubmit={(e) => handleCreateCapsule(e)}>
          <label>
            Image:
          </label>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required />
          <label>
            Description:
          </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label>
            Unlock Date:
          </label>
          <input type="date" value={unlockDate} onChange={(e) => setUnlockDate(e.target.value)} />
          <label>
            Metadata (comma separated):
          </label>
          <input type="text" value={metadata} onChange={(e) => setMetadata(e.target.value)} />

          <button className='btn1' type="submit">Create Capsule</button>
        </form>
        {capsuleId && (
          <div>
            <p>Time Capsule ID: {capsuleId}</p>
          </div>
        )}
      </section>
      <footer>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </footer>
    </div>
  );
};

export default CreateCapsule;