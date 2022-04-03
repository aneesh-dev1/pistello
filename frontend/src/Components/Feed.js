import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from '../connect';
import MasonryLayout from './MasonryLayout';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState()

  useEffect(() => {
    setLoading(true);
    if(categoryId){
      const query = searchQuery(categoryId);
      connect.fetch(query)
        .then(data => {
          setPins(data);
          setLoading(false);
        })
    }
    else{
      
      connect.fetch(feedQuery)
        .then(data => {
          setPins(data);
          setLoading(false);
        })
    }
  
  }, [categoryId])
  






  if(loading) {
    return(
      <Spinner message={"We are adding new ideas...."} />
    );
  }



  return (
    <div>{pins && <MasonryLayout pins = {pins} />}</div>
  )
}

export default Feed