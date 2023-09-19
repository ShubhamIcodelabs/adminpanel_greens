
import {Routes,Route} from 'react-router-dom'
import Dashboard from './Components/dashboard.js';
import Collection from './Components/Collection.js';
import Login from './Components/Login .js';
import CollectionProduct from './Components/CollectionProduct.js';



function Router() {
  return (
    <>
 
   <Routes>
    
   <Route path="/" element={<Login/>} />
     <Route path="/dashboard" element={<Dashboard/>} />
     <Route path="/collection" element={<Collection />} />
     <Route path="/products/:id" element={<CollectionProduct />} />
   </Routes> 
   
   

   

   </>
  );
}

export default Router;