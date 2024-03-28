import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const TableThree = (props) => {
  const tokens = props.val;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Token
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Supply
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Price
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
                    {token[7]} ({token[8]})
                  </h5>
                  <p className="text-sm">{token[1]}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{token[4]}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{token[2].toString()}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{token[3].toString()}</p>

                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link className="hover:text-primary"
                      to={'/profile?id=' + (parseInt(index) + 1).toString()}
                    >
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        BUY
                      </p>
                    </Link>
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

export default TableThree;
