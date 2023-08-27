import React, { useEffect, useState } from 'react'
import { useMetamask, useDisconnect, useAddress, useNFTDrop, ThirdwebNftMedia, Web3Button, useLazyMint, useMintNFT } from '@thirdweb-dev/react'

import { sanityClient, urlFor } from '../../sanity';

import toast, { Toaster } from 'react-hot-toast';
import { useContract,useNFTs,useNFT } from '@thirdweb-dev/react'



function NftDropPage( {collection} ) {

    const {contract} = useContract('0x92f4f426FF343d93d6b1d2de19c653C01f2d019C','nft-drop');

    const { data: nfts , isLoading : loading} = useNFTs(contract, {start:0,count:5})
   
    const { data : nft , isLoading : loadingNft} = useNFT(contract, 3) 

    const {mutateAsync:lazymint ,isLoading:lazyload } = useLazyMint(contract)

   

   


    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
    const [isLoading, setIsLoading] = useState(false);

    const nftDrop = useNFTDrop(collection.address.toString())
    const [claimedSupply, setClaimedSupply] = useState(0);
    const [totalSupply, setTotalSupply] = useState();

    useEffect(() => {
        setIsLoading(true)
        if (!nftDrop) {
            return
        }

        const fetchNftDropSupply = async () => {

            const claimed = await nftDrop.getAllClaimed()
            const total = await nftDrop.totalSupply()

            setClaimedSupply(claimed.length)
            setTotalSupply(total)
            setIsLoading(false)
        }

        fetchNftDropSupply();

    }, [nftDrop])



    const mintNFT = () => {

        if(!address || !nftDrop) return;

        const quantity = 1;

        setIsLoading(true)
        const notification = toast.loading('Minting ..',{
            style:{
                background:'white',
                color:'green',
                fontWeight:'bolder',
                padding:'20px',
                fontSize:'17px'
            }
        })

        if (address)
            nftDrop?.claimTo(address, quantity)
                .then(async (tx) => {

                    const receipt = tx[0].receipt
                    const claimedTokenId = tx[0].id
                    const claimedNFT = await tx[0].data()

                    toast('yahoo! you successfully minted!',{
                        duration:4000,
                        style:{
                            background:'green',
                            color:'white',
                            padding:'20px',
                            fontWeight:'bolder',
                            fontSize:'17px'
                        }
                    })
                    console.log('claimed ', receipt)

                })
                .catch((error) => {
                    toast('oopss!! something went wrong',{
                    style:{
                        background:'red',
                        color:'white',
                        padding:'20px',
                        fontWeight:'bolder',
                        fontSize:'17px'
                    }
                    })
                    console.log(error)
                })
                .finally(() => {
                    setIsLoading(false)
                    toast.dismiss(notification)
                })
    }







    return (
        <div className='flex h-full bg-white flex-col lg:grid lg:grid-cols-10'>

            <Toaster position='bottom-center'  />

            {/* left part */}
            <div className='bg-gradient-to-br from-cyan-900 to-rose-500 
        p-5  flex justify-center items-center space-y-2
        lg:col-span-4 flex-col lg:min-h-screen'>
                <div className='bg-gradient-to-br  from-pink-600 to-blue-400 p-2 rounded-xl'>
                    {/* <img
                        src={urlFor(collection.mainImage).url()}
                        className='w-44 rounded-xl object-cover lg:h-96 lg:w-72' /> */}
                        {nfts && <ThirdwebNftMedia metadata={nfts[0].metadata}  className='w-44 rounded-xl object-cover lg:h-96 lg:w-72'/>}
                </div>
                <div className='text-center space-y-4'>
                    <h1 className='text-5xl text-white font-bold'>{collection.title}</h1>
                    <h2 className='text-2xl text-gray-300'>{collection.nftCollectionName}</h2>
                </div>
            </div>
            {/* right part */}

            <div className='lg:col-span-6 flex flex-1 flex-col p-12'>
                {/* head */}
                <header className='flex justify-between items-center'>
                    <h1 className='text-extralight text-3xl cursor-pointer'>the {'  '}<span className='font-extrabold'>somybit</span>{'  '} nft market page</h1>
                    <button className='px-3 py-2 bg-pink-500 font-bold rounded-full '
                        onClick={() => { address ? disconnect() : connectWithMetamask() }}>{address ? 'sign out' : 'sign in'}</button>
                </header>
                <hr className='my-2 border border-gray-900/50' />
                <h3 className='text-sm text-pink-500 text-center font-semibold'>{address ? 'you are connected with ' + address.substring(0, 5) + '..' + address.substring(address.length - 5) : 'you are not connected'}</h3>
                {/* middle */}
                <div className='flex flex-1  flex-col p-12 lg:justify-center items-center space-y-6 pt-10 text-center '>


                    {/* <img src={urlFor(collection.prevImg).url()}
                        className='object-cover w-80 lg:w-3/4  lg:h-56'
                    /> */}
                    {nft && <ThirdwebNftMedia metadata={nft.metadata} className='object-cover w-80 lg:w-3/4  lg:h-56' />}
                    <h1 className='text-4xl font-bold'>the SOmybit ape coding club | NFT drop</h1>
                    {isLoading ?

                        <h2 className='text-green-400 text-lg animate-pulse'>supply count is loading..</h2>
                        :

                        <h2 className='text-green-400 text-lg'>{claimedSupply}/{totalSupply?.toString()} nfts claimed</h2>
                    }

                    {isLoading &&
                        <img src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" className='object-contain h-36' />
                    }
                </div>
                {/* min button */}
                <Web3Button contractAddress='0x92f4f426FF343d93d6b1d2de19c653C01f2d019C' 
                theme='dark'
                action={mintNFT}
                onSuccess={(res)=>toast(res.toString())}
                onError={(er)=>toast(er.toString(),{duration:15000})}
                isDisabled={isLoading || claimedSupply === totalSupply?.toNumber() || !address}
                   className='bg-pink-500 w-full font-bold disabled:bg-gray-500 text-white text-xl rounded-full p-4'>
                    {isLoading ?
                        <>Loading</>
                        : claimedSupply === totalSupply?.toNumber() ?
                            <>sold out</> :
                            !address ?
                                <>sign in to mint</>
                                : <span>Mint your nft (0.001 eth)</span>
                    }
                </Web3Button>
            </div>


        </div>
    )
}

export default NftDropPage

export const getServerSideProps = async ({ params }) => {

    const query = `*[_type=="collection" && slug.current == $id][0]{
        _id,
        address,
        title,
        nftCollectionName,
        mainImage{
        asset
        },prevImg{
        asset
        },
        slug{
          current
        },
      creator->{
        _id,
        address,
        slug{
          current
        }
      } 
    }`

    const collection = await sanityClient.fetch(query, { id: params?.id })

    if (!collection) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            collection
        }
    }

}