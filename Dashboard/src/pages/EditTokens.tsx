// @ts-nocheck: Ignore type checking for the entire file

import Breadcrumb from '../components/Breadcrumb';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditToken = (props) => {

  const factoryContract = props["factoryContract"];
  const marketContract = props["marketContract"];
  const account = props["account"];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedID, setSelectedID] = useState(0);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ipfsLink, setIpfsLink] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch list of products from the contract
      const products = await marketContract.getProducts();
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductChange = (productId) => {
    productId = parseInt(productId);
    let selected = products[productId];
    setSelectedID(productId);

    if (selected) {
      setSelectedProduct(selected);
      setName(selected.name);
      setDescription(selected.description);
      setPrice(selected.price);
      setQuantity(selected.quantity);
      setIpfsLink(selected.ipfsLink);
    }
    else {
      setSelectedProduct(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call contract method to update product details

      const tx = await marketContract.editProduct(selectedID, name, description, price, quantity, ipfsLink);
      const receipt = await tx.wait();

      // Check the transaction receipt for success or failure
      if (receipt.status === 1) {
        alert('Product Added Successfully!');
      } else {
        alert('Failed to Add Product');
      }

    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Edit Product" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  🚀 Edit Your Product
                </h3>
              </div>
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">

                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5">
                    <label htmlFor="productSelect" className="mb-3 block text-sm font-medium text-black dark:text-white">Select Product</label>
                    <select id="productSelect" value={selectedProduct ? selectedProduct.id : ""} onChange={(e) => handleProductChange(e.target.value)} className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                      <option value="">Select a Product</option>
                      {
                        products.map((prod, i) => {
                          return (
                            <option key={i} value={i}
                              onClick={() => handleProductChange(i)}
                            >{prod.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  {selectedProduct && (
                    <><div className="mb-5.5">
                      <label htmlFor="productName" className="block text-sm font-medium text-black dark:text-white">Product Name</label>
                      <input
                        id="productName"
                        type="text"
                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                      <div className="mb-5.5">
                        <label htmlFor="productDescription" className="block text-sm font-medium text-black dark:text-white">Description</label>
                        <textarea
                          id="productDescription"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label htmlFor="productPrice" className="block text-sm font-medium text-black dark:text-white">Price</label>
                        <input
                          id="productPrice"
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label htmlFor="productQuantity" className="block text-sm font-medium text-black dark:text-white">Quantity</label>
                        <input
                          id="productQuantity"
                          type="number"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="ipfsLink"
                        >
                          IPFS Link
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="ipfsLink"
                          id="ipfsLink"
                          placeholder="IPFS Link"
                          value={ipfsLink}
                          onChange={(e) => setIpfsLink(e.target.value)}
                        />

                      </div>
                      <button type="submit" className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1">Update Product</button>
                    </>
                  )}

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

export default EditToken;
