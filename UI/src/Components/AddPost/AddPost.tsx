import { FileImage,Smile,Type,Camera} from "lucide-react";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from 'sonner';
import { addPost } from "../../services/api/user/apiMethods";
import CropImage from "./CropImage";

import {  Spinner } from "flowbite-react";

  



function AddPost({updatePost}:any) {

  const selectUser = (state: any) => state.auth.user || ''; 
  const user = useSelector(selectUser) || '';
  const userId = user._id || '';

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hideLikes, setHideLikes] = useState(false);
  const [hideComments, setHideComment] = useState(false);
  const [croppedImage, setCroppedImage] = useState("");
  const [isCroppeSelected, setIsCroppeSelected] = useState(false);

  const handleHideLikesToggle = () => {
    setHideLikes(!hideLikes);
  };

  const handleHideCommentToggle = () => {
    setHideComment(!hideComments);
  };

  const handleCreatePostClick = () => {
    setShowModal(true);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: any) => {
    e.preventDefault();

    fileInputRef.current?.click();
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required("Image file required")
       ,
        title: Yup.string().trim() .required("Title is required"),
        description: Yup.string().trim().required("Description is required"),
    }),
    onSubmit: async () => {
      setLoading(true);
      const {  title, description} = formik.values;

      try {
        const response = await fetch(croppedImage);
        const blob = await response.blob();
      
        const formData = new FormData();
        formData.append("file", blob);       
         formData.append("upload_preset", "ctmfcyuf");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dngp3n0ql/image/upload",
          formData
        );
        if (res.status === 200) {
          const imageUrl = res.data.secure_url;
     
          addPost({ userId, imageUrl, title, description,hideLikes,hideComments })
            .then((response: any) => {
              console.log('response from addPost',response.data);
              
              const data = response.data;
              if (response.status === 200) {
                toast.success(data.message);
                updatePost(data.posts)
                handleCancelClick();
              } else {
                console.log(response.message);
                toast.error(data.message);
              }
            })
            .catch((error:any) => {
              toast.error(error?.message);
              console.log(error?.message);
            }) .finally(() => {
              setLoading(false);
            });
        }
       
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleCancelClick = () => {
    setShowModal(false);
    formik.values.image = "";
    setCroppedImage("")
 
  };
  const handleCloseCanvas = () => {
    setIsCroppeSelected(!isCroppeSelected);
  };
  return (
    <>
      <div className="home-addpost-section bg-white flex flex-col justify-between p-4">
        <div className="home-addpost-text text-gray-500 font-medium text-xs">
          Whats Happening?........
        </div>
        <div className="flex items-center justify-between align-middle">
          <div className="home-addpost-button-section flex">
            <ul className="flex gap-2 ">
              <li>
                <FileImage color="gray" strokeWidth={1.5} size={20} />
              </li>
              <li>
                <Smile color="gray" strokeWidth={1.5} size={20} />
              </li>
              <li>
                <Type color="gray" strokeWidth={1.5} size={20} />
              </li>
              <li>
                <Camera color="gray" strokeWidth={1.5} size={20} />
              </li>
            </ul>
          </div>
          <button
            onClick={handleCreatePostClick}
            className="text-xs mb-4 bg-black text-white px-4 py-2 mt-6 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
          >
            Create Post
          </button>
        </div>
        <hr />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="addpost-modal rounded-xl bg-white mx-auto w-full sm:w-600 p-4 shadow-lg max-w-2xl">
    <p className="font-semibold mb-2">Create Post</p>
    <hr />
    <form onSubmit={formik.handleSubmit}>
      <div className="post-info-section flex flex-col md:flex-row gap-4">
        <div className="post-inputs flex-1">
          <input
            type="text"
            placeholder="Title"
            className="rounded-lg border mt-3 border-gray-300 p-2 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 outline-none text-xs font-normal"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="title"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-600 text-xs">{formik.errors.title}</p>
          )}
          <textarea
            className="rounded-lg description sec p-3 mt-4 h-60 border focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 border-gray-300 outline-none text-xs font-normal"
            spellCheck="false"
            placeholder="Describe everything about this post here"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-600 text-xs">{formik.errors.description}</p>
          )}
        </div>
        <div className="flex flex-col justify-center items-center ">
          <button type="button" onClick={handleButtonClick}>
            <div className="image-preview flex items-center justify-center cursor-pointer w-full h-40">
              {(!formik.values.image || formik.errors.image) && (
                <div className="flex flex-col gap-10 items-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V8m0 0l-3 3m3-3l3 3M13 16v-8m0 0l-3 3m3-3l3 3m-3 8h7m0 0v-8m0 0l-3 3m3-3l3 3"
                    />
                  </svg>
                  <p className="text-xs">Select Image</p>
                </div>
              )}
              {croppedImage && !formik.errors.image && (
                <img
                  className="rounded-lg w-full h-auto"
                  src={croppedImage}
                  alt="img"
                />
              )}
            </div>
          </button>
          {formik.values.image && isCroppeSelected && !formik.errors.image && (
            <CropImage
              imgUrl={formik.values.image}
              aspectInit={{ value: 1.59 / 1 }}
              setCroppedImg={setCroppedImage}
              handleNextImage={handleCloseCanvas}
            />
          )}
          {formik.errors.image && (
            <p className="text-red-600 text-xs">{formik.errors.image}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-10 p-3">
        <div>
          <p className="text-xs font-semibold text-grey-600">Hide Likes</p>
          <p className="hide text-xs">
            Enabling hide likes will hide the likes count from others
          </p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={hideLikes}
            onChange={handleHideLikesToggle}
          />
          <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
      </div>
      <div className="flex justify-between gap-10 p-3">
        <div>
          <p className="text-xs font-semibold text-grey-600">Hide Comments</p>
          <p className="hide text-xs">
            Enabling hide comments will remove the commenting option from the
            post
          </p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={hideComments}
            onChange={handleHideCommentToggle}
          />
          <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
      </div>
      <div className="icons flex text-gray-500 m-2">
        <svg
          className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <svg
          className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <button onClick={handleButtonClick}>
          <svg
            className="mr-2 hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const file = files[0];
              const imageUrl = URL.createObjectURL(file);
              formik.setFieldValue("image", imageUrl);
              setIsCroppeSelected(!isCroppeSelected);
            }
          }}
        />
      </div>
      <div className="buttons flex">
        <div
          onClick={handleCancelClick}
          className="text-xs rounded btn border border-gray-300 px-4 py-2 cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white"
        >
          Cancel
        </div>
        {loading && (
          <button
            className="bg-gray-900 rounded ml-2 flex items-center"
            style={{ height: "35px" }}
          >
            <Spinner aria-label="Spinner button example" />
            <span className="pl-3 text-xs">Posting...</span>
          </button>
        )}
        {!loading && (
          <button
            type="submit"
            className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900 hover:bg-green-600"
          >
            Publish Post
          </button>
        )}
      </div>
    </form>
  </div>
</div>





 
      
      )}
    </>
  );
}

export default AddPost;