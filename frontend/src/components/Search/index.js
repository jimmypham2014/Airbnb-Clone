
import React from 'react'
import { useSelector } from 'react-redux'

function Searching(){
 const searches = useSelector(state => state.search)
const spots = useSelector(state=> Object.values(state.spots))
 return(

    <div>
    <div>
       {spots.map(spot => spot.city === searches.searchLocation &&(
           <div>
           {spot.city}
           </div>
       ))}
       </div>
    </div>
 )
}

export default Searching