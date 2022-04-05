import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const connect = sanityClient({
    projectId:process.env.REACT_APP_SANITY_PROJECTID,
    dataset:'production',
    apiVersion:'2022-04-01',
    useCdn:true,
    token:process.env.REACT_APP_SANITY_TOKEN
});
const builder= imageUrlBuilder(connect);
export const urlFor = (source) => builder.image(source);
