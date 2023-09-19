import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { HomeIn } from '../Redux/Page.js/Homeslice';

function CollectionProduct() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.RootReducer.Page);
    const { data = [] } = user.HomeIn|| {};
    const details = data?.data
    const images = data?.included
const productimg=[]
if (images) {
    images.forEach(image => {
      // Get the image ID from the image details
      const imageId = image.id; // Use the correct property to access the image ID
      productimg.push(imageId);
    });
  }

    
    useEffect(() => {
      dispatch(HomeIn());
    }, []);


    const imageIds = [];
    const productIds = [];
  
    if (details) {
      details.forEach(collection => {
        if (collection.attributes?.publicData?.types === 'collections') {
          // Get the image ID from the collection details
          const imageId = collection.relationships.images.data[0]?.id;
          imageIds.push(imageId);
  
          // Get the product IDs from the collection's products array
          const products = collection.attributes?.publicData?.products;
          productIds.push(...products);
        }
      });
    }
  return (
    <div>
        <Navbar/>
        CollectionProduct</div>
  )
}

export default CollectionProduct