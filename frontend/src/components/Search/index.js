
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function Searching(){
 const searches = useSelector(state => state.search)
 const params = useParams()


 console.log(params,'PARAAMSSS')
const spots = useSelector(state=> Object.values(state.spots))

const searchedSpots = spots.filter(spot =>spot.city.toLowerCase() === params.location.toLowerCase())
console.log(searchedSpots)
 return(

   <div>

   <div className='flex flex-col items-center justify-center'>
   <p>
   300+ Stays for {params.guest > 1 ? `${params.guest} guests` : `${params.guest} guest`} 
   </p>
   <h1 className='text-3xl font-semibold nt-2 mb-6 p-2'>
   Stays in {params.location}
   </h1>
   </div>

    <div className='content-wrap flex justify-center'>

   
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 gap-[50px] max-w-sm max-auto md:max-w-none md:mx-0 gap-y-8 h-[100px]'>
       {searchedSpots.map(spot=>{
          return(
            <div className="spot_each_display ">
            <Link key={spot.id} to={`/spots/${spot.id}`}>
        
        
            <div className="spot-image">
           <img src={spot.previewImage} alt=''/>
            </div>
        
            <div className="secondary-text">
            <h4>{spot.city}, {spot.state}</h4>
            </div>
        
            
            <div className="primary-text">{spot.name}</div>
            <div className="price text-2x">${spot.pricePerNight} Night</div>
            
            
            </Link>
            </div>
          )
       })}
       </div>
    </div>
    </div>
 )
}

export default Searching