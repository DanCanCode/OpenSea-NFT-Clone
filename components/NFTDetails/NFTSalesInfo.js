import React from "react";

const NFTSalesInfo = ({ price, buyNFT }) => {
  return (
    <div>
      NFTSalesInfo
      <h2>{price}</h2>
      <button onClick={buyNFT}>BUY NFT</button>
    </div>
  );
};

export default NFTSalesInfo;
