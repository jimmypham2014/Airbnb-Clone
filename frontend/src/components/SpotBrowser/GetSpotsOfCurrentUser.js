
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
    <div className="content-wrap flex justify-center">
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 gap-[50px] max-w-sm max-auto md:max-w-none md:mx-0 gap-y-8 h-[100px]">

    {currentSpots.map((spot)=>{
        return(
        <SingleEditForm spot={spot}/>
        )
            
    }
      
    
    )}
   
    
    </main>

    </div>

)



}

export default GetSpotsOfCurrentUser