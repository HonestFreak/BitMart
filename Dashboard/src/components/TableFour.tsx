import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const TableFour = (props) => {
  const tokens = props.val;
  const total = props.total;
  const [widthdrawAmount, setWidthdrawAmount] = useState(0);

  const widthdraw = async (id) => {
    const sfsContract = props.sfs;
    await sfsContract.withdraw(id, props.account, widthdrawAmount);
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Smart Contract Address
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                SFS ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                SFS balance
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                % income
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>

            {tokens.map((token, index) => (
              <tr>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">

                  </h5>
                  <p className="text-sm">{token['address']}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{token['sfs_id']}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{token['sfs_income']}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white"></p>
                  {((parseInt(token['sfs_income']) / parseInt(total)) * 100).toString()}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">

                    <input type="number"
                      className="border border-stroke rounded-md px-2 py-1 text-sm text-black"
                      placeholder="Enter amount"
                      onChange={(e) => setWidthdrawAmount(e.target.value)}
                    />
                    <br />
                    <button className="hover:text-primary"
                      onClick={() => widthdraw(token['sfs_id'])}
                    >
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        Withdraw
                      </p>
                    </button>
                  </div>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableFour;
