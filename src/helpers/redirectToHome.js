import {useHistory} from 'react-router-dom'
import useStore from '../Zustand/AuthZustand'
import {useEffect} from 'react'
const RedirectToHome = () => {
    const history = useHistory()
    const login = useStore((state) => state.login);
    useEffect(()=>{
      if(!login){
          history.push('/')
      }
    }, [login])
    }

export default RedirectToHome;