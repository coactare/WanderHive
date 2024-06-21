import { useAppDispatch } from "../../store/configureStore";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/configureStore';
import { decrement, increment } from './counterSlice';

function Counter() {
    const dispatch = useDispatch();
    const { data, title } = useAppSelector(state => state.counter);


    return (
        <>
            <h3>{title}</h3>
            <h4>The data is: {data}</h4>
            <button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrement</button>
            <button onClick={() => dispatch(increment(1))} variant='contained' color='primary'>Increment</button>
            <button onClick={() => dispatch(increment(5))} variant='contained' color='secondary'>Increment by 5</button>
        </>
    );
}

export default Counter;