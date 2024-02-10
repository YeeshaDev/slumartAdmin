import { useState } from "react";
import { Oval } from "react-loader-spinner";


export default function Cards({title,img,date,price,handleClick,deleteItem}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    // Set isDeleting to true to show a loading state or disable the button
    setIsDeleting(true);
  
    try {
      // Perform delete operation here
      // For example, make an API call to delete the item
      await deleteItem();
  
      // Update UI to reflect deletion (remove item from list, etc.)
      // You can update the UI state directly if using local state
      // Or dispatch an action to update the state if using Redux or Context
  
      // Hide the delete confirmation modal
      setShowDeleteConfirmation(false);
  
      // Reload the window after deletion is complete
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle deletion error
      // For example, display an error message to the user
    } finally {
      // Reset isDeleting state to false after deletion attempt is complete
      setIsDeleting(false);
    }
  };
  

  const handleCancelDelete = () => {
    // This function will be called when the user cancels deletion
    setShowDeleteConfirmation(false);
  };
  return (
    <div className="border border-[#96938F] rounded-xl overflow-hidden shadow-xl" >
        <figure className=" flex items-center justify-center w-full h-[300px]" onClick={handleClick}>
            <img src={img}  alt={title} className="w-full h-full object-cover" />
        </figure>
        <div className="!bg-white px-3 py-5">
          <div onClick={handleClick}>
          <h3>{title}</h3>
            {price && <h4 className="text-orange text-xl font-semibold">${price}</h4>}
           {date &&  <p className="text-[#96938F]">{date}</p>}
          </div>
           <div className="flex items-center gap-x-3">
           <button onClick={handleDelete} className="!bg-red-600 flex items-center justify-center text-white !w-[100px] h-12 mt-3">
          Delete
          </button>
          <button onClick={handleClick} className=" !w-[100px] h-12 mt-3">
            Edit
          </button>
           </div>
          
           {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white px-10 py-20 rounded-xl text-center">
              <p className="mb-5">Are you sure you want to delete?</p>
              <div className="flex justify-center mt-3">
                <button onClick={handleConfirmDelete} className="!bg-red-600 text-white px-4 py-2 mr-3 !w-[150px] flex items-center justify-center">
                {isDeleting ? (
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
                    "Yes"
                  )}
                </button>
                <button onClick={handleCancelDelete} className="px-4 py-2 !w-[150px]">
                Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
    </div>
  )
}
