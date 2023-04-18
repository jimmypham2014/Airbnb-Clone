import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useEffect ,useState} from "react";
import { useHistory } from "react-router-dom";

const DemoButton =({credential,password})=>{
    const dispatch = useDispatch();
    const history = useHistory()

 useEffect(() =>{
    dispatch(sessionActions.login({credential, password}))

 },[dispatch])


history.push('/')

}
export default DemoButton