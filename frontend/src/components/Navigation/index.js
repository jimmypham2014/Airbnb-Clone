// frontend/src/components/Navigation/index.js
import React, {useState, useEffect,useRef} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGlobe,faUser,faBars} from '@fortawesome/free-solid-svg-icons'
import * as sessionActions from '../../store/session';
import { optionTabs } from '../../locationTab/options';
import globeIcon from '../../icons/globe.svg'
import logo from '../../images/renting.jpeg'
import account from '../../icons/account.svg'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import { addDays } from 'date-fns';
import {BsPeople} from 'react-icons/bs'
import { searching } from '../../store/search';;

function Navigation({ isLoaded }){
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const [open, setOpen] = useState(false)
  const [searchInput,setSearchInput]=useState(false)
  const [numGuests, setNumGuests] = useState(1)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [checkInDate, setCheckInDate] =useState( new Date(state[0].startDate))
  const [checkOutDate, setCheckOutDate] =useState(new Date(state[0].endDate))
  const [searchLocation, setSearchLocation] = useState('')
  let menuRef = useRef()


console.log(state[0].startDate,'hellooooo')
console.log(checkInDate)


 
  const search = () =>{


    const payload ={
      searchLocation,
      checkInDate,
      checkOutDate,
      numGuests
    }

    dispatch(searching(payload))
    history.push(`/search/${searchLocation}/${checkInDate}/${checkOutDate}/${numGuests}`)
    console.log(searchLocation, checkInDate, checkOutDate, numGuests)
  }


  console.log(state.map(state=> new Date(state.startDate[0])))
  console.log(state.map(state=> state.endDate.toLocaleDateString()[3]))

  useEffect(()=>{
  let handleSubmit = (e)=>{
    if(!menuRef.current.contains(e.target)){
    setOpen(false)
    
    } else{
      setOpen(true)
    }
  }
  document.addEventListener('mousedown',handleSubmit)

},[])






const scrollLeft = ()=>{
  console.log('hi')
   const slider = document.getElementById("options_content")
  slider.scrollLeft = slider.scrollLeft - 600
}

const scrollRight = ()=>{
  const slider = document.getElementById("options_content")
  slider.scrollLeft = slider.scrollLeft + 600
}

const demo = async (e)=>{
  
  const user = {
    credential: 'Demo-lition',
    password: 'password'
  }
  await dispatch(sessionActions.login(user))
  history.push('/')
}

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (

        <ProfileButton user={sessionUser}  />
      
      
    );
  } else {
    sessionLinks = (
      <div>
             <LoginFormModal/>
             <SignupFormModal/>
       </div>
    );
  }



  return (
    <>
    <div className='header '>
    
        <div  className='header__left'> 
        <NavLink exact to="/"> 
        <img className='w-[100px]'  src={logo}/>
        
        </NavLink>
        </div>

        <div className='header__center flex'>
            <button onClick={()=>{setSearchInput(!searchInput)}}>Anywhere</button>
            <span></span>
            <button onClick={()=>{setSearchInput(!searchInput)}}>Any week</button>
            <span></span>
            <button onClick={()=>{setSearchInput(!searchInput)}}>Add Guests 
            
            <div className='search__icon'>
              <FontAwesomeIcon icon={faSearch} className='icon'/>
            </div>
            </button> 

            
        </div>

        <div className={`search-menu flex items-center justify-center ${searchInput ? 'active' :'inactive'} `} ref={menuRef} >
          <div className='border w-[895px] flex flex-col col-span-3 mx-auto bg-white'>

          <div className='flex items-center justify-between p-4'>
          <span className='text-xl font-extrabold outline-none '>Where</span>
          
          <input
          type='text'
          required
          value={searchLocation}
          onChange={(e)=> setSearchLocation(e.target.value)}
          placeholder='Search a place'
          className='border w-[650px] h-[50px] pl-2'
          >
          
          </input>
          
          </div>



          <div>
          <DateRangePicker
          onChange={item => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          rangeColors={["#FD5B61"]}
          width='700px'
          />
          </div>

          <div className='flex items-center  justify-between'>
          <span className='text-xl font-extrabold pl-5'>Number of Guests</span>

          <div className='flex items-center '>
          <BsPeople size={30}/>
          <input
          value={numGuests}
          onChange={(e) =>setNumGuests(e.target.value)}
          min={1}
          type='number'
          className='w-[50px] pl-5 outline-none'
          >
          </input>
          </div>
          
          </div>


          <div className='button-container flex items-center justify-center'>
            <button onClick={() => setSearchInput(false)}>Cancel</button>
            <button className='search-button' onClick={search} >Search</button>
          
          </div>

       
          </div>
          
        </div>
        
        

        <div className='header__right'>
        {sessionUser &&
           <NavLink className='header__right_btn grey-hover text-xl ' to='/spots/form'>Become a host
           </NavLink>
        }
            <button className='header__right_btn grey-hover' >
            <img src={globeIcon} className='globe' alt='globe'/>
            </button>

         
          <button className='' onClick={()=>{setOpen(!open)}} >
          <div className='header__menu'>
          <FontAwesomeIcon icon={faBars} className='menu__bar'/>
          <img src={account} atl='' className='user'/>
          </div>

          </button>
          <div className={`dropdown-menu ${open ? 'active' :'inactive'} `} ref={menuRef} >
           
            {isLoaded}
            <div >
            {sessionLinks}
            </div>
            
            {!sessionUser ?
            <button className='hover:bg-gray-300' onClick={demo} >Sign in as Demo user
              </button>:null
            }
            <span></span>
            <div className='host_your_home'>
              <button>Help</button>

            </div>
          
          </div>

        </div>
    
    </div>

    <div className='flex items-center justify-center'>

    <div>
    <button onClick={scrollLeft} className='p-2 m-2 rounded-full bg-gray-50 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300'><AiOutlineArrowLeft/></button>
    </div>

   <div  className='flex items-center justify-center '>
    <div id='options_content' className=' flex items-center justify-start md:w-[50rem] h-full m-3 overflow-y-auto whitespace-nowrap scroll-smooth scrollbar-hide sm:w-[30rem] lg:w-[50rem] 2xl:w-[90rem]'>

      {optionTabs.map(option => {
        return(
        <div  >

        <div className='flex flex-col items-center justify-around p-2'>
        <img className='w-6' src={option.image}/>
        <div>
        {option.label}
        </div>
        
        </div>
        </div>
        )
      })}
    </div>
    </div>
    
    <div>
    <button onClick={scrollRight} className='p-2 m-2 rounded-full bg-gray-50 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300' ><AiOutlineArrowRight/></button>
  </div>

  </div>
 

    </>
  );
}

export default Navigation;