
//import { useState } from "react";
import { Link } from "react-router-dom";
//import { DonateData,} from "../src/assets/data";
import Cards from "../src/components/common/Cards";
import { useQuery } from "react-query";
import {  fetchProjects } from "../src/utils/getArts";
import CardSkeleton from "../src/components/common/CardSkeleton";
//import Projects from "./Projects";
//import ProjectDetails from "../src/components/Modal/ProjectDetails";

//isLoading: productsLoadingisLoading: productsLoading
export default function AllProjects() {
    const { data: project,isLoading: projectLoading  } = useQuery(
        "projects",
        fetchProjects,
       
      );
      //console.log(products)
  return (
  <section className="relative" data-aos="fade-up" data-aos-duration={800}>
  
  <div className="bg-gray-800 flex items-center justify-center mt-5 max-w-[850px] mx-auto rounded-lg">
   <h1 className=" text-white text-2xl p-3 text-center   "> All Slum Art Projects</h1>
   </div>





<article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[90%] mx-auto my-7">
    {projectLoading
              ? Array.from({ length: 6 }, (_, index) => (
                  <CardSkeleton key={index} count={project?.length} />
                )) : project?.length > 0 && project.map((item) => {
        return (
           <>
           <Link to={`/edit_project/${item?.id}`}>
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
