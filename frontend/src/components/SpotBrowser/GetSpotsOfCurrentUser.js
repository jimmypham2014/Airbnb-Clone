
import { useEffect, useState } from 'react';
import { getAllSpots } from '../../store/spot';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink,Link, useParams, useHistory } from 'react-router-dom';
import EditSpotForm from './EditSpotForm';
import SingleEditForm from './SingleEditForm';
import { deleteSpot } from '../../store/spot';

const GetSpotsOfCurrentUser=()=>{
    const [showEditSpotForm, setShowEditSpotForm] = useState(false)
    const history =useHistory()
    const {spotId} = useParams()
    
const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllSpots())
        setShowEditSpotForm(false)
        
        },[dispatch])
        
        const spot = useSelector(state =>{
          return state.spots
        })

        
      

        
        const allSpots = Object.values(spot)

    const sessionUser = useSelector(state => state.session.user);

    const currentSpots = allSpots.filter(spot => spot.ownerId === sessionUser.id)

    const deletedSpot = (e) => {

        currentSpots.forEach(spot =>{
            if(spot.id === spotId){
            dispatch(deleteSpot(spot.id))
            }
        })
        
        history.push('/spots/myspots')
      };
      


return(

    <main className="spot__display">

    {currentSpots.map((spot)=>{

 return <SingleEditForm spot={spot}/>
            
    }
      
    
    )}
   
    
    </main>

)



}

export default GetSpotsOfCurrentUser