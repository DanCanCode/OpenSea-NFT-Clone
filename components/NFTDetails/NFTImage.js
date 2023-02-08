import React from "react";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

const style = {
  wrapper: `rounded -lg border dark:border-transparent dark:bg-[#313339]`,
  nftHeader: `flex items-center justify-between p-4`,
  likesContainer: `flex items-center justify-end space-x-2`,
  heartIcon: `h-5 w-5 text-gray-500 dark:text-gray-400`,
  likeCount: `text-sm font-semibold text-gray-500 dark:text-gray-400`,
  nftImage: `rounded-b-lg object-cover`,
};

const NFTImage = ({ image }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.nftHeader}>
        <Image src="/eth-logo.svg" height={20} width={20} alt="eth" />

        <div className={style.likesContainer}>
          <AiOutlineHeart className={style.heartIcon} />
          <div className={style.likeCount}>200</div>
        </div>
      </div>

      <div className={style.nftImage}>
        {image && <Image src={image} height={448} width={448} alt="nft" />}
      </div>
    </div>
  );
};

export default NFTImage;
