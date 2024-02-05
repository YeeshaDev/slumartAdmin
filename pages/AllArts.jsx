
//import { useState } from "react";
import { Link } from "react-router-dom";
//import { DonateData,} from "../src/assets/data";
import Cards from "../src/components/common/Cards";
import { useQuery } from "react-query";
import { fetchArtProducts } from "../src/utils/getArts";
import CardSkeleton from "../src/components/common/CardSkeleton";
//import Projects from "./Projects";
//import ProjectDetails from "../src/components/Modal/ProjectDetails";

//isLoading: productsLoadingisLoading: productsLoading
export default function AllArts() {
    const { data: products,isLoading: productsLoading  } = useQuery(
        "products",
        fetchArtProducts,
       
      );
      //console.log(products)
  return (
  <section className="relative" data-aos="fade-up" data-aos-duration={800}>
   <div className="bg-gray-800 flex items-center justify-center mt-5 max-w-[850px] mx-auto rounded-lg">
   <h1 className=" text-white text-2xl p-3 text-center   "> All Artworks on Slum Art </h1>
   </div>
  





<article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[90%] mx-auto my-7">
    {productsLoading
              ? Array.from({ length: 6 }, (_, index) => (
                  <CardSkeleton key={index} count={products?.length} />
                )) : products?.length > 0 && products.map((item) => {
        return (
           <>
           <Link to={`/edit_artwork/${item?.id}`}>
            <Cards key={item?.id}
            title={item?.name}
            img={item?.image1}
            price={item?.price}
            
             />
             </Link>
             </> 
        )
    })}
</article>

  </section>
  )
}
