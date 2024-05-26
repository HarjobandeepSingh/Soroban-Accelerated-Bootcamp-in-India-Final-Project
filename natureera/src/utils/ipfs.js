// src/utils/ipfs.js

import { create } from 'ipfs-http-client';

// Connect to the local IPFS node
const ipfs = create('https://ipfs.infura.io:5001/api/v0');

export const uploadImageToIPFS = async (file) => {
  const { path } = await ipfs.add(file);
  return path; // This is the IPFS hash of the uploaded file
};
