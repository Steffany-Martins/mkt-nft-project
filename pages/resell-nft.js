
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { Loader, ButtonVariant, Input } from '../components';
import { NFTContext } from '../context/NFTContext';

const ResellNFT = () => {
  const { createSale, isLoadingNFTs } = useContext(NFTContext);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;

  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    if (tokenURI)fetchNFT();
  }, [tokenURI]);

  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId);
    router.push('/');
  };

  if (isLoadingNFTs) {
    return (
      <div className="min-h-screen flexStart">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/5 md:w-full">
        <h1 className="text-2xl font-semibold font-poppins dark:text-white text-nft-black-1">Resell NFT</h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}
        />
        {image && <Image src={image} className="mt-4 rounded" />}
        <div className="flex justify-end w-full mt-7">
          <ButtonVariant
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>

    </div>
  );
};

export default ResellNFT;
