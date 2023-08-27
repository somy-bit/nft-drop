import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import type { GetServerSideProps, NextPage } from 'next'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import Link from 'next/link'



interface Props {
  collection: Collection[]
}



export default function Home({ collection }: Props) {
  return (
    <div
      className={`flex max-w-7xl mx-auto min-h-screen bg-slate-300 flex-col p-10 justify-center items-center`}
    >
      <Head>
        <title>nft drop</title>
      </Head>

     
        <main className='grid space-x-3 rounded-2xl space-y-6  p-6 shadow-2xl 
                     shadow-gray-700/50 pt-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>

          {collection.map(col => (
            <Link  key={col._id.toString()}  href={`/nft/${col.slug.current}`}>

              <div className='border-4 border-gray-600  
                            rounded-3xl p-6  cursor-pointer transition-all
                            duration-200 hover:scale-105'>

                <img src={urlFor(col.mainImage).url()} className='h-96 w-64 object-cover rounded-2xl' />
                <p className='text-gray-800 mt-6 font-bold text-lg'>{col.nftCollectionName}</p>
                <p className='text-extralight text-gray-400 '>{col.title}</p>

              </div>
            </Link>
          ))}
        </main>
   

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {

  const query = `*[_type == "collection"]{
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

  const collection = await sanityClient.fetch(query);

  console.log(collection)
  return {
    props: {
      collection
    }
  }

}
