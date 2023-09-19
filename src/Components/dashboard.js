import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { HomeIn } from "../Redux/Page.js/Homeslice";
import { collectionIN } from '../Redux/Page.js/Collectionslice';
import Navbar from './Navbar';
import css from './dashboard.module.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { imageUploadIN } from '../Redux/Page.js/ImageUploadslice';

const imageUpload = (
  <svg fill="#000000" width="80px" height="80px" viewBox="0 0 51.2 51.2" xmlns="http://www.w3.org/2000/svg"><title>image</title><path d="M9.6 41.6q-1.4 0 -2.3 -0.9T6.4 38.4V12.8q0 -1.4 0.9 -2.3T9.6 9.6h32q1.4 0 2.3 0.9t0.9 2.3v25.6q0 1.4 -0.9 2.3t-2.3 0.9h-32ZM18.4 24q2 0 3.4 -1.4t1.4 -3.4q0 -2 -1.4 -3.4t-3.4 -1.4q-2 0 -3.4 1.4t-1.4 3.4q0 2 1.4 3.4t3.4 1.4ZM40 36.8v-6.4L33.6 24 24 33.6l-5.6 -5.7 -8.8 8.9H40Z" fill="#33414E" /></svg>
);

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const [message, setMessage] = useState('');
  const [collection, setCollection] = useState([]);
  const [title, setTitle] = useState(''); // Add state for title input
  const [description, setDescription] = useState(''); // Add state for description input
  const [imgIncludes, setImgIncludes] = useState([]); // Add state for description input
console.log(uploadedImageId, '&&&  &&& => uploadedImageId');

  const { HomeIn: { data = [] } } = useSelector(state => state.RootReducer.Page);
  const list = data || [];

  const listings = list?.filter( 
    r => r.attributes?.publicData && r.attributes?.publicData.types !== "collections");

  useEffect(() => {
    dispatch(HomeIn());
  }, []);

  const handleFileChange = (e) => {
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
    return dispatch(imageUploadIN({ file: e.target.files[0] }))
      .then(image => {
        setUploadedImageId(image.payload.data.id.uuid);
      
      });
  };
  // URL.createObjectURL(event.target.files[0])
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCollectionCreate = async (e) => {
    e.preventDefault();
    // if (!uploadedImageId) {
    //   setMessage('Please select an image to upload.');
    //   return;
    // }
    const payload = {
      title: title,
      description: description,
      products: collection,
      images: uploadedImageId // Include the collection array in the payload
    };

    try {
      const res = await dispatch(collectionIN(payload)).unwrap();
      navigate("/collection");
      if (res && res.status === 200) {

      } else {
        console.error('error', res.data?.message);
      }
    } catch (error) {
      console.error('error', 'something went wrong!!', error);
    }
  };


  const fn = (e) => {
    const productId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add the product ID to the collection
      setCollection((prevCollection) => [...prevCollection, productId]);
    } else {
      // Remove the product ID from the collection
      setCollection((prevCollection) =>
        prevCollection.filter((id) => id !== productId)

      );
    }
  };

  return (
    <div className={css.mainWrapper}>
      <Navbar />
      <div className={css.fullWidthBox}>
        <form onSubmit={handleCollectionCreate}>
          <h2>Admin</h2>
          <div className={css.gridBox}>
            <div className={css.leftBox}>
              <div className={css.dashboardFromBox}>
                <div className={css.imageUpload}>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  <span className={css.imageUploadIcon}>
                    {imageUpload}
                  </span>
                </div>
                <div className={css.formGroup}>
                  <label>Title</label>
                  <div className={css.inputWrapper}>
                    <input
                      className={css.inputBox}
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                </div>
                <div className={css.formGroup}>
                  <label>description</label>
                  <div className={css.inputWrapper}>
                    <input
                      className={css.inputBox}
                      type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
              </div>
              <div className={css.dashboardFromBox}>
                <h3 className={css.productHeading}>Products</h3>
                <div className={css.listingCardWrapper}>
                  {listings && Array.isArray(listings)
                    ? listings.map((listing) => (
                      <div className={css.listinGroup} key={listing.id.uuid}>
                        <div className={css.checkButton}>
                          <input
                            type="checkbox"
                            onChange={fn}
                            value={listing.id?.uuid}
                            checked={collection.includes(listing.id?.uuid)}
                          />
                        </div>
                        {listing.images && listing.images.length
                          && listing.images.map((image, i) => (
                            i == 0 && <div className={css.productImage} key={image.id.uuid}>
                              <img src={image.attributes.variants['square-small'].url} alt="Image" />
                            </div>
                          ))}
                        <span className={css.productTitle}>
                          {listing.attributes.title}
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
              <div className={css.collectionButton}>
                <button type="submit">Create Collection</button>
              </div>
            </div>
            <div className={css.rightBox}>
              <div className={css.uploadedImage}>
                <h3 className={css.productHeading}>Uploaded Image</h3>
                {uploadedImage
                  ? (
                    <div className={css.imageUploadBox}>
                      <img src={uploadedImage} alt="Uploaded" height={200} width={200} />
                    </div>
                  )
                  : null}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;