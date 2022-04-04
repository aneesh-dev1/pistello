import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { connect } from "../connect";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);

      connect.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Image upload error", err);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () =>{
    if(title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type:"pin",
        title,
        about,
        destination,
        image: {
          _type:'image',
          asset:{
            _type:"reference",
            _ref: imageAsset?._id
          }
        }
        ,
        userId:user._id,
        postedBy:{
          _type:"postedBy",
          _ref:user._id
        },
        category

      }
      connect.create(doc).then(()=> {
        navigate('/')
      })
    }
    else{
      setFields(true);
      setTimeout(() => setFields(false),2000)
    }

  }
  

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          {" "}
          Please Fill All The Details...
        </p>
      )}
      <div className="flex flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-4/5  ">
          <div className="flex flex-col justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong Image Type </p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full ">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl ">
                      {" "}
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg"> Click To Upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Recommendation : Use High Quality Photos...
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="image"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:flex-row justify-evenly gap-6 lg:pl-5 mt-5 w-full">
          <div className="left flex flex-col w-3/5 ">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add Title"
            className="outline-none text-xl sm:text-xl font-bold border-b-2 border-gray-200 p-2 w-full mt-2"
          />
          
          <input
            type="text"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            placeholder="Add About"
            className="outline-none text-base sm:text-lg font-bold border-b-2 border-gray-200 p-2 mt-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
            placeholder="Destination"
            className="outline-none text-base sm:text-lg font-bold border-b-2 border-gray-200 p-2 mt-2"
          />
          </div>
          <div className="right">
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  {" "}
                  Select Category
                </option>
                {categories.map((category) => (
                  <option className="text-base capitalize border-0 outline-none bg-white text-black">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5"><button type="button" onClick={savePin} className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none">Save Pin</button></div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
