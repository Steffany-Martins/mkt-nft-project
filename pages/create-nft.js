
import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { NFTContext } from '../context/NFTContext';
import { ButtonVariant, Input } from '../components';
import upload from '../assets/upload.png';

// const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
// const projectSecret = process.env.NEXT_PUBLIC_API_KEY_SECRET;
// const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
// const options = { host: 'ipfs.infura.io', protocol: 'https', port: 5001, headers: { authorization: auth } };

// const client = ipfsHttpClient(options);
// const dedicatedEndPoint = 'https://fanny.infura-ipfs.io';

const CreateItem = () => {
  const { isLoadingNFT, uploadToIPFS } = useContext(NFTContext);
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    console.log({ url });
    setFileUrl(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () => (
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? ' border-file-active ' : ''} 
       ${isDragAccept ? ' border-file-accept ' : ''} 
       ${isDragReject ? ' border-file-reject ' : ''}`),
    [isDragActive, isDragReject, isDragAccept],
  );

  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
  const router = useRouter();

  const createMarket = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    // const data = JSON.stringify({ name, description, image: fileUrl });
    try {
      // const added = await client.add(data);
      console.log(1);
      // const url = `${dedicatedEndPoint}/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      console.log(2);
      // await createSale(url, formInput.price);
      router.push('/');
      console.log(3);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  if (isLoadingNFT) {
    return (
      <div className="flexCenter" style={{ height: '51vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/5 md:w-full">
        <h1 className="text-2xl font-semibold font-poppins dark:text-white text-nft-black-1">Create new item</h1>

        <div className="mt-16">
          <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">Upload file</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flex-col text-center flexCenter">
                <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</p>

                <div className="flex justify-center w-full my-12">
                  <Image
                    src={upload}
                    width={100}
                    height={100}
                    alt="file upload"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                </div>

                <p className="text-sm font-semibold font-poppins dark:text-white text-nft-black-1">Drag and Drop File</p>
                <p className="mt-2 text-sm font-semibold font-poppins dark:text-white text-nft-black-1">Or browse media on your device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <Image
                    src={fileUrl}
                    width={100}
                    height={100}
                    alt="Asset_file"
                  />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="Asset Name"
          handleClick={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="Asset Description"
          handleClick={(e) => updateFormInput({ ...formInput, description: e.target.value })}
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />

        <div className="flex justify-end w-full mt-7">
          <ButtonVariant
            btnName="Create Item"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={createMarket}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
