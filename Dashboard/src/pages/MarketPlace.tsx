import Breadcrumb from '../components/Breadcrumb';
import { useEffect, useState } from 'react';
import TableTwo from '../components/TableTwo';

const MarketPlace = (props) => {

  const marketContract = props["marketContract"];
  const account = props["account"];
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
    <>
      <Breadcrumb pageName="Product Inventory" />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableTwo
            marketContract={marketContract}
          />
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
