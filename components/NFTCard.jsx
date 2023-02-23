import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import { shortenAddress } from '../utils';

const NFTCard = ({ nft, onProfilePage }) => {
  const { nftCurrency } = useContext(NFTContext);
  return (
    <Link href={{ pathname: '/nft-details', query: nft }} passHref>
      <div className="flex-1 p-4 m-4 bg-white shadow-md cursor-pointer min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 rounded-2xl minlg:m-8 sm:my-2 sm:mx-2">
        <div className="relative w-full overflow-hidden h-52 sm:h-36 mind:h-60 minlg:h-300 rounded-2xl">
          <Image src={nft.image || images[`nft${nft.i}`]} width={200} height={200} alt={`nft${nft.i}`} />
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-sm font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl">{nft.name}</p>
          <div className="flex-row mt-1 flexBetween minlg:mt-3 xs:flex-col xs:items-start xs:mt-3">
            <p className="text-xs font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-l">{nft.price} <span className="normal">{nftCurrency}</span></p>
            <p className="text-xs font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-l">{shortenAddress(onProfilePage ? nft.owner : nft.seller)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
