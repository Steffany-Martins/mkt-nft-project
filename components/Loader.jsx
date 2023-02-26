import Image from 'next/image';

import loader from '../assets/loader.gif';

const Loader = () => (
  <div className="w-full my-4 flexCenter">
    <Image src={loader} alt="loader" width={100} objectFit="contain" />
  </div>
);

export default Loader;
