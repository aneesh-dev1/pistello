export const categories = [
  {
    name: 'cars',
    image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
  },
  {
    name: 'wallpaper',
    image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
  },
  {
    name: 'web development',
    image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
  },
  {
    name: 'food',
    image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
  },
  {
    name: 'nature',
    image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
  },{
    name: 'travel',
    image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
  },
  {
    name: 'Anime',
    image: 'https://i0.wp.com/thenerddaily.com/wp-content/uploads/2018/08/Reasons-To-Watch-Anime.jpg?w=1000&ssl=1',
  }, 
  {
    name: 'others',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];










export const userQuery = (userId) => {
    const query =`*[_type =="user" && _id =='${userId}']`;
    return query;
}
export const searchQuery = (searchTerm) => {
    const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy -> {
                _id,
                username,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  username,
                  image
                },
              },
            }`
    return query;
  };
export const feedQuery = `*[_type == "pin"]  {
    image{
        asset->{
            url
        }
    },
    _id, destination,
    postedBy -> {
         _id,
         username,
         image   
    },
    save[]{
        _key,
        postedBy -> {
            _id,
            username,
            image
        },
    },

}`
export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
   save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
    comment[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    }
  }`;
  return query;
};
export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};


export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      username,
      image
    },
    save[]{
      postedBy->{
        _id,
        username,
        image
      },
    },
  }`;
  return query;
};