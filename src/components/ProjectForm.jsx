
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

export default function ProjectForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
    const [tinyLoader, setTinyLoader] = useState(false);
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
        formData.append("key_features", data?.key_features);
       
        console.log(data.price)
        // Assuming you have three images to upload
        for (let i = 0; i < 4; i++) {
            const imageKey = `image${i + 1}`;
            if (data.images && data.images[i]) {
                formData.append(imageKey, data.images[i][0]);
            }
        }

        try {
            const response = await axios.post("https://slumart-production.up.railway.app/slum/project/",formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            if (response?.status === 201 || response?.data) {
                console.log("Product submitted successfully");
                setTinyLoader(false)
                toast.success("Art Work submitted successfully")
            } else {
                console.error("Error submitting product:", response.status);
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
            <label htmlFor="name">Project Name</label>
            <input type="text" placeholder="Product Name" {...register("name", { required: true, maxLength: 80 })} />
            {errors?.name && <span className="text-red-500">Project Name is required</span>}
            <label htmlFor="key_features">Description</label>
            <textarea type='text' placeholder="description" className=' !justify-start h-40' {...register("key_features", { required: true, maxLength: 1000 })} />
            {errors?.key_feature && <span className="text-red-500">Project Description is required (max length: 1000 characters)</span>}

     <label htmlFor="images"> Project Images</label>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-y-2">
                    <input
                        type="file"
                        accept="image/*"
                        className='py-3'
                        onChange={(e) => handleImageChange(e, index)}
                        {...register(`images[${index}]`, { required: true })}
                    />
                     {errors?.images && errors.images[index] && <span className="text-red-500">Image {index + 1} is required</span>}
                    {selectedFiles[index] && (
                        <img src={selectedFiles[index]} alt={`Image Preview ${index + 1}`} className="max-h-40 mt-2 w-[300px]" />
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
                    "Submit Project"
                  )}
                
                </button>
        </form>
    );
}



