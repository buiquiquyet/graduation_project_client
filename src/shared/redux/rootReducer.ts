// // // rootReducer.js
// import { combineReducers } from '@reduxjs/toolkit';
// import reducer from '../Reducer/useReducerMessager/reducer';
// import reducerUploadImage from '../Reducer/useReducerUpdateImageUser/reducer';
// import feedTextSlice from '../Reducer/feedText/feedTextSlice';
// import loadingSlice from '../Reducer/loadingSlice';

// const rootReducer = combineReducers({
//   messager: reducer,
//   imageUpload: reducerUploadImage,
//   feed: feedTextSlice,
//   loading: loadingSlice
// });

// export default rootReducer;
// // rootReducer.js

import CharityFundReducer from '../reducer/charity-fund-slice/CharityFundSlice'
import { combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  charityFund: CharityFundReducer,
 
});

export default rootReducer;
