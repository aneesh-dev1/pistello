import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "../connect";
import MasonryLayout from "./MasonryLayout";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";
import {Link} from 'react-router-dom';
import {IoMdAdd} from 'react-icons/io'

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      connect.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      connect.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message={"We are adding new ideas...."} />;
  }

  if (!pins?.length)
    return (
      <div className="w-full h-60 flex flex-col justify-center items-center">
        <h1>No Post Available...</h1>
        <Link
          to="/create-pin"
          className="bg-black text-white mt-5 rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd fontSize={25}/>
          
        </Link>
      </div>
    );

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
