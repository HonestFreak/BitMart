import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
const TableTwo = (props) => {

  const marketContract = props.marketContract;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await marketContract.getProducts();
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Description</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sold</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Quantity</p>
        </div>
      </div>

      {products.map((product, index) => (
        <div key={index} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.name}</p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.description}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{
              BigNumber.from(product.price).toString()
            }</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{
              BigNumber.from(product.sold).toString()
            }</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{
              BigNumber.from(product.quantity).toString()
            }</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
