

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchArtProducts } from '../src/utils/getArts';
export default function EditArtForm() {
    const {id} = useParams()
    const { data: products,  } = useQuery(
        "products",
        fetchArtProducts);
    const art =products?.length > 0 && products.find((item) => item.id == id)
    console.log(art)
    const { register, handleSubmit, formState: { errors },setValue } = useForm();
    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
    const [tinyLoader, setTinyLoader] = useState(false);


    const preFillForm = () => {
        if (art) {
            setValue("name", art.name);
            setValue("size", art.size);
            setValue("materials", art.materials);
            setValue("story", art.story);
            setValue("price", art.price);
            setValue("in_stock", art.in_stock);
            // You may need to adjust this based on the structure of your API response
            setSelectedFiles([art.image1, art.image2, art.image3]);
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
        formData.append("name", data.name);
        formData.append("size", data.size);
        formData.append("materials", data.materials);
        formData.append("story", data.story);
        formData.append("price", data.price);
        formData.append("in_stock", data.in_stock);
        console.log(data.price)
        // Assuming you have three images to upload
        for (let i = 0; i < 3; i++) {
            const imageKey = `image${i + 1}`;
            if (data.images && data.images[i]) {
                formData.append(imageKey, data.images[i][0]);
            }
        }

        try {
            const response = await axios.patch("https://slumart-production.up.railway.app/slum/sell/artpiece/",formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            if (response?.status === 201 || response?.data) {
                console.log("Product submitted successfully");
                setTinyLoader(false)
                toast.success("Art Work submitted successfully")
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


            <label htmlFor="size">Size (Sizes Must have a comma between them)</label>
            <input type="text" placeholder="Size" {...register("size", { required: true, maxLength: 100 })} defaultValue={art?.size}/>
            {errors?.size && <span className="text-red-500">Product Size is required</span>}
            <label htmlFor="materials">Materials</label>
            <input type="text" placeholder="Materials" {...register("materials", { required: true, maxLength: 100 })} defaultValue={art?.materials} />

            <label htmlFor="story">Story</label>
            <textarea placeholder="Story" className='py-2 h-40' {...register("story", { required: true, maxLength: 1000 })} defaultValue={art?.story}/>
            {errors?.story && <span className="text-red-500">Art Story is required (max length: 1000 characters)</span>}
            <label htmlFor="price">Price</label>
            <input type="text" placeholder="Price" {...register("price", {required: true, pattern: /^\d+(\.\d{1,2})?$/})} defaultValue={art?.price}/>
            {errors?.price && <span className="text-red-500">Product Price is required</span>}
            

     <label htmlFor="images">Images</label>
            {Array.from({ length: 3 }).map((_, index) => (
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

<label htmlFor="in_stock" className='flex flex-row items-center justify-start gap-x-4'>
            <input
                type="checkbox"
                className='h-10'
                {...register("in_stock")}
                defaultChecked={art?.in_stock}
            />
            In Stock
            </label>
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
                    "Edit Art Work"
                  )}
                
                </button>
        </form>
    );
}



