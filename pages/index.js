import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard, NFTCard, SearchBar, Loader } from '../components';

// IMAGES ASSETS
import creatorNft from '../assets/creator1.png';
import left from '../assets/left.png';
import right from '../assets/right.png';

import { NFTContext } from '../context/NFTContext';
import { shortenAddress, getCreators } from '../utils';

const Home = () => {
  const { theme } = useTheme();
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [activeSelect, setActiveSelect] = useState('Recently added');
  const [nftsCopy, setnftsCopy] = useState([]);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHideButton, setIsHideButtons] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        setNfts(items);
        setnftsCopy(items);
        setisLoading(false);
        console.log(items);
      });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNfts.length) {
      setNfts(filteredNfts);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setIsHideButtons(false);
    } else {
      setIsHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  const handleScrollCarousel = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const creators = getCreators(nftsCopy);

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <Banner
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          name={(<>Discover, collect and sell <br /> extraordinary NFTs</>)}
        />
        {!isLoading && !nfts.length ? (
          <h1 className="ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0">That&apos;s weird... No NFTs for Sale!</h1>
        ) : isLoading ? <Loader /> : (
          <>
            <div>
              <h1 className="ml-4 text-2xl font-semibold font-poppin dark:text-white text-nft-black-1 minlg:text-4xl sx:ml-0">Top Sellers</h1>
              <div className="relative flex flex-1 max-w-full mt-3" ref={parentRef}>
                <div className="flex flex-row overflow-x-scroll select-none w-max no-scrollbar" ref={scrollRef}>
                  {creators.map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImage={creatorNft}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.price}
                    />
                  ))}
                  {!isHideButton && (
                    <>
                      <div onClick={() => handleScrollCarousel('left')} className="absolute left-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45">
                        <div className="relative w-full h-full">
                          <Image src={left} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : ''} />
                        </div>
                      </div>
                      <div onClick={() => handleScrollCarousel('right')} className="absolute right-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45">
                        <div className="relative w-full h-full">
                          <Image src={right} layout="fill" objectFit="contain" alt="right_arrow" className={`w-8 h-8 minlg:w-12 minlg:h-12 ${theme === 'light' ? 'filter invert' : undefined}`} />
                        </div>
                      </div>

                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="mx-4 flexBetween xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h2 className="flex-1 text-2xl font-semibold font-poppin dark:text-white text-nft-black-1 minlg:text-4xl sm:mb-4">Hot NFTs</h2>
                <div className="flex flex-row flex-2 sm:w-full sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-start w-full mt-3 md:justify-center">
                {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `NFT ${i}`,
                  seller: mockUsrs[i],
                  owner: mockUsrs[10 - i],
                  price: (10 - i * 0.531).toFixed(2),
                  description: 'Cool NFT on Sale',
                }}
              />
            ))} */}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
export default Home;
