import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard } from '../components';
import { makeId } from '../utils/makeId';
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
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            {' '}
            Best Creators{' '}
          </h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
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
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                  >
                    <div className="relative">
                      <Image
                        src={images.left}
                        layout="fill"
                        object="contain"
                        alt="left_arrow"
                        className={theme === 'light' && 'filter invert'}
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => handleScrollCarousel('right')}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                  >
                    <div className="relative">
                      <Image
                        src={images.right}
                        layout="fill"
                        object="contain"
                        alt="right_arrow"
                        className={theme === 'light' && 'filter invert'}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
