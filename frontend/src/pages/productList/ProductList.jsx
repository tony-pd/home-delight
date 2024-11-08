import { useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/loader/Loader";
import Product from "../../components/product/Product";
import useFetchData from "../../hooks/useFetchData";
import Pagination from "../../components/pagination";
import './productList.css'
import { baseUrl } from "../../constants";

const ProductList = () => {

    const { categoryName } = useParams();
    const { 
        isLoading, 
        error, 
        data: products
    } = useFetchData(
        baseUrl + `/api/v1/product/`
        //${ categoryName ? 'category': '' }`        
    );

    // Adding Pagination logic
    const itemsPerPage = 3; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredProducts = products?.elements?.filter(product => product?.category === categoryName);
    const currentProducts = filteredProducts?.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const totalPages = Math.ceil(currentProducts?.length / itemsPerPage);
    
    return (
        <div className="products">
            {
                isLoading ? (
                    <Loader />
                ): (
                    <>
                        <div className="product-list">
                            {
                                currentProducts?.length && currentProducts                      
                                .map((product)=>{
                                    return <Product key={product._id} product={product}/>   
                                })                                                             
                            }
                        </div>
                        <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} /> 
                    </>
                )
            }
        </div>
    )
}

export default ProductList;