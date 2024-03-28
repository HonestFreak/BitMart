const CardThree = (props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <p style={{fontSize:"35px"}}>🤝</p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {props.val}
          </h4>
          <span className="text-sm font-medium">Happy Customers</span>
        </div>
      </div>
    </div>
  );
};

export default CardThree;
