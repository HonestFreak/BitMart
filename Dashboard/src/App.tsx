import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import Factory from './contracts/MarketPlaceFactory.json';
import Market from './contracts/MarketPlace.json';
import ContractAddress from './contracts/contract-address.json';

import Loader from './common/Loader';
import routes from './routes';
import Dashboard from './pages/Dashboard';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [account, setAccount] = useState<string>('');
  const [factoryContract, setFactoryContract] = useState<any>(null);
  const [isRegisteredRetailer, setIsRegisteredRetailer] = useState<boolean>(false);
  const [marketContract, setMarketContract] = useState<any>(null);
  const [marketAddress, setMarketAddress] = useState<string>('');

  // Retailer Form Data
  const [marketPlaceName, setMarketPlaceName] = useState<string>('');
  const [marketPlaceDescription, setMarketPlaceDescription] = useState<string>('');

  const web3Handler = async () => {
    // Use Mist/MetaMask's provider
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setAccount(accounts[0]);

    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])

      await web3Handler()
    })
    loadContracts(signer, accounts[0])

  };

  const loadContracts = async (signer, account) => {
    try {
      // Get deployed copies of contracts
      const factoryContract = new ethers.Contract(ContractAddress.MarketPlaceFactory, Factory.abi, signer)
      setFactoryContract(factoryContract);

      let isRetailer = await factoryContract.isRetailer(account)
      console.log("isRetailer ", isRetailer, isRetailer == false ? "false" : "true")

      if (isRetailer == true) {
        console.log("is retailer", account)
        setIsRegisteredRetailer(true);

        const marketContractAddress = await factoryContract.getRetailerContract(account)
        const marketContract_ = new ethers.Contract(marketContractAddress, Market.abi, signer)
        setMarketContract(marketContract_);
        setMarketAddress(marketContractAddress);
      }

    } catch (error) {
      console.error('Error loading contracts:', error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    web3Handler();
    // retailerContract.addRetailer(account);
    // console.log("retailerContract.getRetailerCount() ", retailerContract.getRetailerCount());
  }, []); // Run once on component mount

  // console.log("account ", account)
  // console.log("factoryContract ", factoryContract)
  // console.log("retailerContract ", retailerContract)
  return (
    <>
      {
        !isRegisteredRetailer ?
          (<Routes>
            <Route element={<DefaultLayout val={account}
              market={marketAddress}
              marketName={"Seller"}
            />}>
              {account && <Route index element={<Dashboard {...{
                'factoryContract': factoryContract,
                'account': account,
                'marketContract': marketContract,
              }} />} />}
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <route.component {...{
                        'factoryContract': factoryContract,
                        'account': account,
                        'marketContract': marketContract,

                      }} />
                    </Suspense>
                  }
                // pass props
                // element={<route.component {...props} />}
                />
              ))}
            </Route>
          </Routes>) :
          (
            <div className="h-screen w-screen flex bg-gray-50 dark:bg-black flex-row items-center">

              <div className="grid grid-cols-4 p-5 w-full">
                <div className="col-span-4 xl:col-span-4">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        🏪Register a Marketplace 🏪
                      </h3>
                    </div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        factoryContract.createMarketPlace(marketPlaceName, marketPlaceDescription).then((res) => {
                          factoryContract.getRetailerContract(account).then((marketContractAddress) => {
                            const marketContract_ = new ethers.Contract(marketContractAddress, Market.abi, signer)
                            setMarketContract(marketContract_);

                            console.log("marketContractAddress ", marketContractAddress)
                          })
                          setIsRegisteredRetailer(true);
                        })
                      }}
                    >
                      <div className="mb-5.5">
                        <label htmlFor="marketPlaceName" className="block text-sm font-medium text-black dark:text-white">Market Place Name</label>
                        <input
                          id="marketPlaceName"
                          type="text"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={marketPlaceName}
                          onChange={(e) => setMarketPlaceName(e.target.value)}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label htmlFor="marketPlaceDescription" className="block text-sm font-medium text-black dark:text-white">Description</label>
                        <textarea
                          id="marketPlaceDescription"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={marketPlaceDescription}
                          onChange={(e) => setMarketPlaceDescription(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1">Register</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-6 xl:col-span-6">
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
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </>
  );
}

export default App;
