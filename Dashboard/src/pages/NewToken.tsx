// @ts-nocheck: Ignore type checking for the entire file

import Breadcrumb from '../components/Breadcrumb';
import fireToast from '../hooks/fireToast';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import axios from 'axios';

const NewToken = (props) => {
  const factoryContract = props["factoryContract"];
  const marketContract = props["marketContract"];
  const account = props["account"];

  const [glbFile, setGlbFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ipfsLink, setIpfsLink] = useState("");


  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setGlbFile(file);

      const formData = new FormData();
      formData.append('file', file);

      const pinataMetadata = JSON.stringify({
        name: file.name,
      });
      formData.append('pinataMetadata', pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', pinataOptions);

      const JWT = process.env.PINATA_JWT;

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });

      if (res.data && res.data.IpfsHash) {
        setIpfsLink(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
      } else {
        console.error('Failed to get IPFS link');
      }
    } catch (error) {
      console.error('Error uploading file to Pinata:', error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      // Ensure the factoryContract is available
      if (!marketContract) {
        throw new Error('Market contract not available');
      }

      const tx = await marketContract.addProduct(name, description, price, quantity, ipfsLink);
      const receipt = await tx.wait();

      // Check the transaction receipt for success or failure
      if (receipt.status === 1) {
        alert('Product Added Successfully!');
      } else {
        alert('Failed to Add Product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error Adding Product');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">

        <Breadcrumb pageName="New Product" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  🚀 Add New Product
                </h3>
              </div>

              <div className="p-7">
                <form onSubmit={addProduct}>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="productName"
                    >
                      Product Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="productName"
                      id="productName"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="productDescription"
                    >
                      Description
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="productDescription"
                      id="productDescription"
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="productPrice"
                    >
                      Price
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name="productPrice"
                      id="productPrice"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="productQuantity"
                    >
                      Quantity
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      name="productQuantity"
                      id="productQuantity"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="ipfsLink"
                    >
                      Upload 3D Model
                    </label>
                    <div className="mb-5.5">
                      <input type="file" onChange={handleFileUpload} />
                    </div>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="ipfsLink"
                      id="ipfsLink"
                      placeholder="IPFS Link"
                      value={ipfsLink}
                      // onChange={(e) => setIpfsLink(e.target.value)}
                      readOnly
                    />

                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                    >
                      Reset
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  🗿 BitMart : Your own no-code market in Metaverse
                </h3>
              </div>
              <div className="p-7">
                😯 Create your own market on Metaverse easily without any coding hassle.
                <br /><br />
                😍 BitMart is powered by Botanix Network for quick payments and low gas fees!
                <br /><br />
                🤑 Take your market to next level by adding 3D models of your products.
                <br /><br />
                ✳️ Increase your sales to international customers by accepting crypto payments.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewToken;
