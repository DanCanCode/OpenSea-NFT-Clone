import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useContract, useMarketplace } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Listings = () => {
  //   const marketplace =
  //     useMarketplace(0xd193c10e7b64ea37b6c1132df3b8565a052225f1);
  //   const marketplace = useContract(
  //     0xd193c10e7b64ea37b6c1132df3b8565a052225f1,
  //     "marketplace"
  //   );

  const sdk = new ThirdwebSDK("goerli");
  const getListings = async () => {
    try {
      const contract = await sdk.getContract(
        "0xD193C10e7B64Ea37B6c1132Df3b8565a052225f1",
        "marketplace"
      );
      const listings = await contract.getActiveListings();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return <div>Listings</div>;
};

export default Listings;
