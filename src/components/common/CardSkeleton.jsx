import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardSkeleton({count}) {
  return (
   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[90%] mx-auto my-7'>
    <Skeleton className=' w-[330px] h-[350px]' count={count || 3} />
   </div>
  )
}
