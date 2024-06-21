import Carousel from "../features/home/Carousel"
import Featured from "../features/home/Featured"
import HowItWorks from "../features/home/HowItWorks"
import { useOidc, useOidcIdToken } from '@axa-fr/react-oidc'

import { useDispatch } from 'react-redux';
import { getBasket} from '../features/cart/basketSlice';
import { useEffect } from "react";

function Home() {

    const { login, logout, isAuthenticated } = useOidc()
    const { idToken, idTokenPayload } = useOidcIdToken();
  
    if (isAuthenticated) {
      localStorage.setItem('access_token', idToken)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBasket());
    }, [dispatch]);


    return (
        <>
            <Carousel />
            <Featured />
            <HowItWorks />
        </>
    );
}

export default Home;