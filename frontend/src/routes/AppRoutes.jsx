import { memo } from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useFetchData from '../hooks/useFetchData';
import Navbar from "../components/navbar/Navbar";
import ProductLinks from '../components/productLinks/ProductLinks';
import { baseUrl } from '../constants';

const Header = lazy(()=> import('../components/header/Header'));
const NotFound = lazy(()=> import('../pages/notFound/NotFound'));
const Loader = lazy(()=> import('../components/loader/Loader'));
const About = lazy(()=> import('../pages/about/About'));
const ProductList = lazy(()=> import('../pages/productList/ProductList'));
const CartItems = lazy(()=> import('../pages/cartItems'));
const Contact = lazy(()=> import('../pages/contact/Contact'));

const AppRoutes = () => {
  const { 
    secIsLoading, 
    secError, 
    data: sections 
  } = useFetchData(baseUrl + "/categories", []);

  const { 
    isLoading, 
    error, 
    data: categories 
  } = useFetchData(baseUrl + "/products/categories", []);
          
    return (
        <>       
          <Suspense fallback={<Loader />}>   
          <Router>  
            {
              isLoading ? (
                <Loader />
              ): (
                <>
                  <Navbar categories={sections}/>            
                  <Header/>    
                  <About/>
                  <div className="products">
                    <ProductLinks className="product-links" categories={categories}/>   
                    <Routes>
                      <Route path='/:categoryName' element={<ProductList />} />
                      <Route path='/cart' element={<CartItems />} />
                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </div>                 
                  <Contact />
                </>
              )
            }
            </Router>
            </Suspense>      
        </>
    )

}

export default memo(AppRoutes);