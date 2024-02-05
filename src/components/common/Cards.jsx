

export default function Cards({title,img,date,price,handleClick}) {
  return (
    <div className="border border-[#96938F] rounded-xl overflow-hidden shadow-xl" onClick={handleClick}>
        <figure className=" flex items-center justify-center w-full h-[300px]">
            <img src={img}  alt={title} className="w-full h-full object-cover" />
        </figure>
        <div className="!bg-white px-3 py-5">
            <h3>{title}</h3>
            {price && <h4 className="text-orange text-xl font-semibold">${price}</h4>}
           {date &&  <p className="text-[#96938F]">{date}</p>}
        </div>
    </div>
  )
}
