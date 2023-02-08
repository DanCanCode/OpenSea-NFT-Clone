import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import TopNavbarLayout from "../../../layouts/TopNavbarLayout";
import NFTImage from "../../../components/NFTDetails/NFTImage";
import NFTSalesInfo from "../../../components/NFTDetails/NFTSalesInfo";
import NFTDetails from "../../../components/NFTDetails/NFTDetails";
import NFTBasicInfo from "../../../components/NFTDetails/NFTBasicInfo";

const style = {
  wrapper: `h-screen mx-auto flex max-w-2xl flex-col space-y-4 py-4 dark:bg-[#202226] lg:max-w-none lg:py-8 lg:px-24`,
  nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
  leftContainer: `flex flex-col space-y-4`,
  leftElement: `hidden lg:block`,
  rightContainer: `flex flex-1 flex-col space-y-4`,
  buyoutContainer: `flex-1`,
};

const NFTPage = () => {
  const { contract } = useContract(
    "0xD193C10e7B64Ea37B6c1132Df3b8565a052225f1"
  );
  console.log("helloo", contract);
  const address = useAddress();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState([]);
  const router = useRouter();
  const { tokenID } = router.query;

  const getListing = async () => {
    try {
      setLoading(true);
      const item = await contract.getListing(BigNumber.from(tokenID));
      setListing(item);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const buyNFT = async () => {
    try {
      await contract.buyoutListing(tokenID, 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListing();
  }, [contract]);

  useEffect(() => {
    if (!address) router.replace("/");
  }, [address]);
  return (
    <TopNavbarLayout>
      <div className={style.wrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={style.nftContainer}>
            <div className={style.leftContainer}>
              <div className={style.leftElement}>
                <NFTImage image={listing?.asset?.image} />
              </div>

              <div className={style.leftElement}>
                <NFTDetails />
              </div>
            </div>

            <div className={style.rightContainer}>
              <NFTBasicInfo name={listing?.asset?.name} />

              <div className={style.buyoutContainer}>
                <NFTSalesInfo
                  price={listing?.buyoutCurrencyValuePerToken?.displayValue}
                  buyNFT={buyNFT}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </TopNavbarLayout>
  );
};

export default NFTPage;
