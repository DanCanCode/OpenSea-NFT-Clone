import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useContract, useMarketplace } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import NFTCard from "./NFTCard";

const style = {
  wrapper: `mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24 
  md:grid-cols-2 md:pt-0 lg:grod-cols-3 xl:grid-cols-4 2xl:grid-cols-5`,
};

const Listings = () => {
  //   const marketplace =
  //     useMarketplace(0xd193c10e7b64ea37b6c1132df3b8565a052225f1);
  //   const marketplace = useContract(
  //     0xd193c10e7b64ea37b6c1132df3b8565a052225f1,
  //     "marketplace"
  //   );

  const sdk = new ThirdwebSDK("goerli");
  const [listing, setListing] = useState([]);
  const getListings = async () => {
    try {
      const contract = await sdk.getContract(
        "0xD193C10e7B64Ea37B6c1132Df3b8565a052225f1",
        "marketplace"
      );
      const listings = await contract.getActiveListings();
      setListing(listings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className={style.wrapper}>
      {listing.length ? (
        <>
          {listing.map((item, index) => (
            <Link
              key={index}
              href={`/assets/${item.assetContractAddress}/${item.id}`}
            >
              <NFTCard listing={item} />
            </Link>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Listings;
