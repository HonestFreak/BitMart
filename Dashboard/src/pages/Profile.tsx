import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import { useSearchParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';

const Profile = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [toBuy, setToBuy] = useState(0);
  const id = searchParams.get("id")
  const [token, setToken] = useState();

  const loadData = async () => { 
    const marketplace = props.marketplaceContract;
    const token = await marketplace.tokens(id);
    setToken(token);
  }

  useEffect(() => {
    loadData();
  }, [id]);
  return (
    <>
      <Breadcrumb pageName="Botanix Data" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {token && token[7]}
            </h3>
            <p className="font-medium">{token && token[1]}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {token && token[2].toString()}
                </span>
                <span className="text-sm">for Sale</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {token && token[3].toString()}
                </span>
                <span className="text-sm">Price</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {id}
                </span>
                <span className="text-sm">Market ID</span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                {token && token[4]}
              </h4>
              <p className="mt-4.5">
                {token && token[5]}
              </p>
            </div>

            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Seller Address : {token && token[0]}
              </h4>
              <div className="flex items-center justify-center gap-3.5">
              </div>
                      <div className="relative gap-4 px-10">
                        <input
                          className="w-half rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="number"
                          id="number"
                          placeholder="Number of Tokens"
                          onChange={(e) => setToBuy(e.target.value)}
                        />‎ ‎ 
                          <button onClick={ async () =>{ await props.marketplaceContract.buyToken(id, toBuy) }}
                          className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">BUY</button>
                      </div>
                    
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
