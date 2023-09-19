import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { HomeIn } from '../Redux/Page.js/Homeslice';
import { deleteIN } from '../Redux/Page.js/Deleteslice';
import { Link } from 'react-router-dom';
import css from './Collection.module.css';

function Collection() {

  const dispatch = useDispatch();

  const { HomeIn: { data = [] } } = useSelector(state => state.RootReducer.Page);
  const listing = data || [];
  console.log(listing, '&&&  &&& => listing');
  

  const listings = listing?.filter(
    r => r.attributes?.publicData && r.attributes?.publicData.types === "collections");
  useEffect(() => {
    dispatch(HomeIn());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteIN(id))
      .unwrap()
      .then((response) => {
        // Handle success
        dispatch(HomeIn());
        console.log('response', response)
      })
      .catch((error) => {
        // Handle error
        console.error('Delete failed:', error);
      });
  };
  return (
    <div className={css.mainWrapper}>
      <Navbar />
      <div className={css.fullWidthBox}>
        <h1 className={css.headingName}>Product</h1>
        {/* {listing && Array.isArray(listing)
          ? listing.map((e) => (
            <div key={e.id.uuid}>
               {listing.images && listing.images.length
                  ? listing.images.map((image, i) => (
                    i == 0 && <div key={image.id.uuid}>
                      <img src={image.attributes.variants['square-small'].url} alt="Image" />
                    </div>
                  ))
                  : <p>Image not found</p>}
         
          
                <div>{e.attributes.title}  
                <span style={{marginLeft:"20px"}}>{e.attributes.description}</span>
              
                </div>
                <span onClick={() => handleDelete(e.id.uuid)}>delete</span>
          
            </div>
          ))
          : null} */}

        <div className={css.contentBox}>
          {listings && Array.isArray(listings)
            ? listings.map((listing) => (
              <div className={css.scrollableContentCard} key={listing.id.uuid}>

                {listing.images && listing.images.length
                  ? listing.images.map((image, i) => (
                    i == 0 && <div key={image.id.uuid} className={css.collectionImage}>
                      <img src={image.attributes.variants['square-small'].url} alt="Image" />
                    </div>
                  ))
                  : <div className={css.noImageOuter}>
                    <div className={css.noImageCard}>Image not found</div>
                  </div>}
                <span>
                  <div className={css.cardTitle}>
                    <div>{listing.attributes.title}</div>
                    <div>{listing.attributes.description}</div>
                  </div>
                  <span className={css.closeButton} onClick={() => handleDelete(listing.id.uuid)}><svg width="20px" height="20px" viewBox="0 0 0.4 0.4" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" fill-rule="evenodd" d="M0.282 0.082a0.025 0.025 0 1 1 0.035 0.035L0.235 0.2l0.082 0.082a0.025 0.025 0 0 1 -0.035 0.035L0.2 0.235l-0.082 0.082a0.025 0.025 0 0 1 -0.035 -0.035L0.165 0.2 0.082 0.118a0.025 0.025 0 0 1 0.035 -0.035L0.2 0.165l0.082 -0.082Z" /></svg></span>
                </span>
              </div>
            ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default Collection