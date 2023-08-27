interface Image{
    asset:{
        url: String
    }
}

export interface Creator{
    _id:String,
    name:String,
    address:String,
    bio:String,
    slug:{
        current:String
    },
    image:Image
}

export interface Collection{
    _id:String,
    nftCollectionName:String,
    title:String,
    address:String,
    creator:Creator,
    slug:{
        current:String
    },
    mainImage:Image,
    prevImg:Image
}