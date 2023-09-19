import { combineReducers } from "@reduxjs/toolkit";
import HomeIn from "./Homeslice";
import collectionIN from './Collectionslice'
import deleteIN from './Deleteslice'
import  imageUploadIN  from "./ImageUploadslice";

const Page = combineReducers({
  HomeIn,
  collectionIN,
  deleteIN,
  imageUploadIN,
});

export default Page;
