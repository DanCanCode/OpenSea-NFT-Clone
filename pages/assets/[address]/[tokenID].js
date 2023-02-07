import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAddress } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import TopNavbarLayout from "../../../layouts/TopNavbarLayout";
import NFTImage from "../../../components/NFTDetails/NFTImage";

const style = {
  wrapper: ``,
  nftContainer: ``,
};
const sdk = new ThirdwebSDK("goerli");

const NFTPage = () => {
  const address = useAddress();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState([]);
  const router = useRouter();
  const { tokenID } = router.query;

  const getListing = async () => {
    try {
      setLoading(true);
      const contract = await sdk.getContract(
        "0xD193C10e7B64Ea37B6c1132Df3b8565a052225f1",
        "marketplace"
      );
      const item = await contract.getListing(BigNumber.from(tokenID));
      setListing(item);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListing();
  }, []);

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

              <div className={style.leftElement}>{/* <NFTDetails/> */}</div>
            </div>

            <div className={style.rightContainer}>
              {/* <NFTBasicInfo/> */}

              <div className={style.buyoutContainer}>
                {/* <NFTSalesInfo/> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </TopNavbarLayout>
  );
};

export default NFTPage;
