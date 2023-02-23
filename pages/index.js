import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard, NFTCard } from '../components';
import { makeId } from '../utils';
import images from '../assets';

const Home = () => {
  const { theme } = useTheme();

  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHideButton, setIsHideButtons] = useState(false);

  const handleScrollCarousel = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
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
  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs=text-xl text-left"
        />
        <div>
          <h1 className="ml-4 text-2xl font-semibold before:first:font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0">
            Best Creators
          </h1>
          <div className="relative flex flex-1 max-w-full mt-3" ref={parentRef}>
            <div
              className="flex flex-row overflow-x-scroll select-none w-max no-scrollbar"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}
                  `}
                  creatorEths={10 - i * 0.5} // the topper sellers have more etherium start from 10 to the lower
                />
              ))}
              {!isHideButton && (
                <>
                  <div
                    onClick={() => handleScrollCarousel('left')}
                    className="absolute left-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45"
                  >
                    <Image
                      src={images.left}
                      alt="left_arrow"
                      className={theme === 'light' && 'filter invert'}
                    />
                  </div>
                  <div
                    onClick={() => handleScrollCarousel('right')}
                    className="absolute right-0 w-8 h-8 cursor-pointer minlg:w-12 minlg:h-12 top-45"
                  >
                    <Image
                      src={images.right}
                      width={20}
                      height={20}
                      alt="right_arrow"
                      className={theme === 'light' && 'filter invert'}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="mx-4 flexBetween xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 text-2xl font-semibold before:first:font-poppins dark:text-white text-nft-black-1 minlg:text-4xl sm:mb-4">
              Hot Bids
            </h1>
            <div className="flex flex-row flex-2 sm:w-full sm:flex-col">SearchBar</div>
          </div>
          <div className="flex flex-wrap justify-start w-full mt-3 md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NET ${i}`,
                  price: (10 - i * 0.537).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: 'Cool NFT on Sale',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
