import Carousel from "../features/home/Carousel"
import Featured from "../features/home/Featured"
import HowItWorks from "../features/home/HowItWorks"

import { useDispatch } from 'react-redux';
import { getBasket} from '../features/cart/basketSlice';
import { useEffect } from "react";

function Home() {

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