
import { useContext, useEffect, useState } from 'react';
import { Loader, NFTCard } from '../components';
import { NFTContext } from '../context/NFTContext';

const createdNFTS = () => {
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('fetchItemsListed')
      .then((items) => {
        setNfts(items);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flexStart">
        <Loader />
      </div>
    );
  }
  // if (!isLoading && nfts.length === 0) {
  //   return (
  //     <div className="min-h-screen p-16 flexCenter sm:p-4">
  //       <h1 className="text-3xl font-extrabold font-poppins dark:text-white text-nft-black-1">No NFTs listed for Sale</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center min-h-screen p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="mt-2 ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 sm:ml-2">NFTs listed for sale</h2>
          <div className="flex flex-wrap justify-start w-full mt-3 md:justify-center">
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default createdNFTS;
