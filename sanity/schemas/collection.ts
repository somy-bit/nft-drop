import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'nftCollectionName',
      title: 'Tha Name of Nft-Collection',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adress',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: {type: 'creator'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'prevImg',
      title: 'Preview image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
   
   
  ],

 
  
 
})
