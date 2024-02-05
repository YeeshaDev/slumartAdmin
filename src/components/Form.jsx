
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';

export default function ProductForm() {
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
            const response = await axios.post("https://slumart-production.up.railway.app/slum/sell/artpiece/",formData,{
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
            <input type="text" placeholder="Product Name" {...register("name", { required: true, maxLength: 80 })} />
            {errors?.name && <span className="text-red-500">Product Name is required</span>}


            <label htmlFor="size">Size (More than one? Add a comma)</label>
            <input type="text" placeholder="Size" {...register("size", { required: true, maxLength: 100 })} />
            {errors?.size && <span className="text-red-500">Product Size is required</span>}
            <label htmlFor="materials">Materials </label>
            <input type="text" placeholder="Materials" {...register("materials", { required: true, maxLength: 100 })} />

            <label htmlFor="story">Story</label>
            <textarea placeholder="Story" className='py-2 h-40' {...register("story", { required: true, maxLength: 1000 })} />
            {errors?.story && <span className="text-red-500">Art Story is required (max length: 1000 characters)</span>}
            <label htmlFor="price">Price</label>
            <input type="text" placeholder="Price" {...register("price", {required: true, pattern: /^\d+(\.\d{1,2})?$/})} />
            {errors?.price && <span className="text-red-500">Product Price is required</span>}
            

     <label htmlFor="images">Images</label>
            {Array.from({ length: 3 }).map((_, index) => (
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

<label htmlFor="in_stock" className='flex flex-row items-center justify-start gap-x-4'>
            <input
                type="checkbox"
                className='h-10'
                {...register("in_stock")}
            />
            In Stock
            </label>
            <button type='submit'>
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
                    "Submit Art Work"
                  )}
                
                </button>
        </form>
    );
}



//import React from 'react';
/*import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProductForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
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

    console.log(`${selectedFiles[0]}`)
    const onSubmit = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5 mt-5 bg-white rounded-lg mx-10 max-w-[600px] p-5'>
      <label htmlFor="Product Name">
      Product Name
      <input type="text" placeholder="Product Name" {...register("First name", {required: true, maxLength: 80})} />
      </label>
      <label htmlFor="Materials">
      Materials
      <input type="text" placeholder="Materials" {...register("Materials", {required: true, maxLength: 100})} />
      </label>
     <label htmlFor="Condition">
        Condition
     <input type="text" placeholder="Condition" {...register("Condition", {required: true,maxLength: 80})} />
     </label>
     
     <label htmlFor="Price">
     Price
     <input type="number" placeholder="Price" {...register("price", {required: true, minLength: 2, maxLength: 12})} />
     </label>
     
     <label htmlFor="location">
     <select {...register("Title", { required: true })}>

<option value="from_home">From Home</option>
<option value="Mrs">Mrs</option>
<option value="Miss">Miss</option>
<option value="Dr">Dr</option>
</select>

     </label>
     
     <label htmlFor="Images">
        Images
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-y-2">
            <input
              type="file"
              accept="image/*"
              className=''
              onChange={(e) => handleImageChange(e, index)}
              {...register(`image[${index + 1}]`, { required: true })}
            />
    <div className="flex items-center justify-between bg-[var(--white)] border border-solid border-[var(--input-border)] w-full h-10 rounded-lg pl-4 mt-3  space-x-2">
          <div className=" outline-none ">
            <span className="truncate ">
              {selectedFiles[index]
                ? selectedFiles[index].name
                : "No file selected"}
            </span>
          </div>
          <button
            className=" text-black px-3  text-sm"
            type="button"
            onClick={() => {
              // Add logic to trigger the file input when the button is clicked
              const fileInput = document.querySelector('input[type="file"]');
              if (fileInput) {
                fileInput.click();
              }
            }}
          >
        upload
          </button>
        </div>
            <div>

            </div>
            {selectedFiles[index] && (
                <img src={selectedFiles[index]} alt={`Image Preview ${index + 1}`} className="max-h-40 mt-2 w-[300px]" />
              )}
          </div>
        ))}
      </label>

     

      <button type='submit'>Submit Product</button>
    </form>
  );
}*/
/** <input {...register("Developer", { required: true })} type="radio" value="Yes" />
      <input {...register("Developer", { required: true })} type="radio" value="No" /> */