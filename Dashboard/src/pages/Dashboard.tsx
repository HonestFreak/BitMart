import { useEffect } from 'react';
import CardFour from '../components/CardFour.tsx';
import CardOne from '../components/CardOne.tsx';
import CardThree from '../components/CardThree.tsx';
import CardTwo from '../components/CardTwo.tsx';
import TableOne from '../components/TableOne.tsx';
import { useState } from 'react';
import ChartOne from '../components/ChartOne.tsx';
import ChartTwo from '../components/ChartTwo.tsx';
import ChartThree from '../components/ChartThree.tsx';
import TableTwo from '../components/TableTwo.tsx';



const Dashboard = (props) => {
    const marketContract = props["marketContract"];
    const account = props["account"];
    const [products, setProducts] = useState([]);
    const [metrics, setMetrics] = useState({});
  
    useEffect(() => {
      fetchProducts().then(() => {
        calculateMetrics(products);
      });
    }, []);
  
    const fetchProducts = async () => {
      try {
        const products = await marketContract.getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const calculateMetrics = (products) => {
        // Do complex analytics here 🤓
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardOne val={4} />
                <CardTwo val={3} />
                <CardThree val={9} />
                <CardFour val={45000} />
            </div>


            {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableTwo />
        </div>
      </div> */}

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 xl:col-span-12">
                    <ChartThree />
                    <ChartTwo />
                    <ChartOne />
                </div>
            </div>

        </>
    );
};

export default Dashboard;
