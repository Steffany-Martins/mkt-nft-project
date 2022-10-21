import { useState } from 'react';

import { FontAwesomeIcon as IconAwesome } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line import/no-cycle
import { ButtonVariant } from './index';

import images from '../assets';

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default: return '/';
    }
  };
  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
            if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 
        ${
          active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'
        }`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;
  return hasConnected ? (
    <ButtonVariant
      btnName="Create"
      classStyles="mx-2 rounded-2xl"
      handleClick={() => {
        setActive('');
        router.push('/create-nft');
      }}
    />
  ) : (
    <ButtonVariant
      btnName="Connect"
      classStyles="mx-2 rounded-2xl"
      handleClick={() => {}}
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-10 flex-row w-full p-4 border-b flexBetween dark:bg-nft-dark bg:nft-white dark:border-nft-black-1 border-nft-gray-1">
      <div>
        <Link href="/">
          <div className="cursor-pointer flexCenter md:hidden">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="ml-1 text-lg font-semibold dark:text-white text-nft-black-1">
              CryptoKet
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              alt="logo"
              objectFit="contain"
              width={32}
              height={32}
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-end flex-initial">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="relative w-8 h-4 p-1 bg-black rounded-2xl flexBetween label"
          >
            <IconAwesome icon={faSun} />
            <IconAwesome icon={faMoon} />
            <div className="absolute w-3 h-3 bg-white rounded-full ball" />
          </label>
        </div>
        <div className="flex md:hidden">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>
      <div className="hidden ml-2 md:flex">
        {isOpen ? (
          <Image
            src={images.cross}
            objectFit="contain"
            width={20}
            alt="close"
            height={20}
            onClick={() => setIsOpen(false)}
            className={theme === 'light' && 'filter invert'}
          />
        ) : (
          <Image
            src={images.menu}
            objectFit="contain"
            width={25}
            alt="menu"
            height={25}
            onClick={() => setIsOpen(true)}
            className={theme === 'light' && 'filter invert'}
          />
        )}
        {isOpen && (
          <div className="fixed inset-0 z-10 flex flex-col justify-between bg-white top-65 dark:bg-nft-dark nav-h">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
