import {createStore, applyMiddleware, compose,combineReducers} from 'redux'
import sessionReducer from './session';
import thunk from 'redux-thunk'
import { spotReducer } from './spot';
import { reviewReducer } from './reviews';
import { imageReducer } from './images';
import bookingReducer from './booking';

const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotReducer,
    reviews:reviewReducer,
    images:imageReducer,
    bookings:bookingReducer
})



let enhancer;
 if (process.env.NODE_ENV === 'production'){
    enhancer = applyMiddleware(thunk)
 } else{
    const logger = require('redux-logger').default
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;
 