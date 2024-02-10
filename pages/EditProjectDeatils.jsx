

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {  fetchProjects } from '../src/utils/getArts';
export default function EditEventForm() {
    const {id} = useParams()
    const { data: project,  } = useQuery(
        "projects",
        fetchProjects,
       
      );
    const art =project?.length > 0 && project.find((item) => item.id == id)
    //console.log(art)
    const { register, handleSubmit, formState: { errors },setValue } = useForm();
    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
    const [tinyLoader, setTinyLoader] = useState(false);


    const preFillForm = () => {
        if (art) {
            setValue("name", art.name);
            setValue("description", art.description);
            setValue("date", art.date);
            setValue("key_features", art.key_features);
           
            // You may need to adjust this based on the structure of your API response
            setSelectedFiles([art.image1, art.image2, art.image3,art?.image4]);
        }
    };

    useEffect(() => {
        preFillForm();
    }, [art]);

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const imageUrl = URL.createObjectURL(file);
                setSelectedFiles(prevFiles => {
                    const newFiles = [...prevFiles];
                    newFiles[index] = imageUrl;
                    return newFiles;
                });
            } catch (error) {
                console.error("Error creating object URL:", error);
            }
        }
    };

    const onSubmit = async (data) => {
        setTinyLoader(true)
        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("description", data?.description);
        formData.append("date", data?.date);
        formData.append("key_features", data?.key_features);
       
        // Assuming you have three images to upload
        for (let i = 0; i < 4; i++) {
            const imageKey = `image${i + 1}`;
            if (data.images && data.images[i]) {
                formData.append(imageKey, data.images[i][0]);
            }
        }

        try {
            const response = await axios.patch("https://slumart-production.up.railway.app/slum/project/",formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            if (response?.status === 201 || response?.data) {
                console.log("Project submitted successfully");
                setTinyLoader(false)
                toast.success("Project submitted successfully")
            } else {
                console.error("Error submitting product:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting product:", error.response);
            console.log(error)
        }
    };

    console.log()
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5 mt-5 bg-white rounded-lg mx-10 max-w-[800px] p-5' encType='multipart/form-data'>
            {/* ... Your existing form fields ... */}
            <label htmlFor="name">Product Name</label>
            <input type="text" placeholder="Product Name" {...register("name", { required: true, maxLength: 80 })} defaultValue={art?.name} />
            {errors?.name && <span className="text-red-500">Product Name is required</span>}


            <label htmlFor="description">Description</label>
            <textarea type='text' placeholder="Description" className=' !justify-start h-40 pt-2' {...register("description", { required: true, maxLength: 1500 })} defaultValue={art?.description}/>
            {errors?.description && <span className="text-red-500">Project Description is required (max length: 1500 characters)</span>}

            <label htmlFor="key_features">Key Features</label>
            <textarea type='text' placeholder="Key Features" className=' !justify-start h-40 pt-2' {...register("key_features", { required: true, maxLength: 1500 })} defaultValue={art?.key_features} />
            {errors?.key_feature && <span className="text-red-500">Project Key Feature is required (max length: 1500 characters)</span>}
            <label htmlFor="project date">Project Date (YYYY-MM-DD)</label>

            <input type='text' placeholder="When event took place"  {...register("date", { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ })} defaultValue={art?.date} />
            {errors?.date && <span className="text-red-500">Please enter a valid date in the format YYYY-MM-DD</span>}

     <label htmlFor="images">Images</label>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-y-2">
                    <input
                        type="file"
                        accept="image/*"
                        className='py-3'
                        onChange={(e) => handleImageChange(e, index)}
                        {...register(`images[${index}]`, { required: false })}
                        
                    />
                     {errors?.images && errors.images[index] && <span className="text-red-500">Image {index + 1} is required</span>}
                    {selectedFiles[index] && (
                        <img src={selectedFiles[index]} alt={`Image Preview ${index + 1}`} className="max-h-40 mt-2 w-[100px] h-[100px] object-cover" />
                    )}
                </div>
            ))}


            <button type='submit' className='flex items-center justify-center'>
            {tinyLoader ? (
                    <Oval
                      height={30}
                      width={30}
                      color="#fff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#f6f6f6"
                      strokeWidth={7}
                      strokeWidthSecondary={7}
                    />
                  ) : (
                    "Edit Event"
                  )}
                
                </button>
        </form>
    );
}



