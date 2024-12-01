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

import CharityFundReducer from '@/shared/reducer/charity-fund-slice/CharityFundSlice'
import ProjectFundReducer from '@/shared/reducer/project-fund-slice/ProjectFundSlice'
import CategoryReducer from '@/shared/reducer/category-slice/CategorySlice'
import { combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  charityFund: CharityFundReducer,
  projectFund: ProjectFundReducer,
  category: CategoryReducer,
 
});

export default rootReducer;
