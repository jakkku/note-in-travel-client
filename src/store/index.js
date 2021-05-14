import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "../reducers/userSlice";
import myCoursesReducer from "../reducers/myCoursesSlice";
import favoriteCoursesReducer from "../reducers/favoriteCoursesSlice";
import favoriteSitesReducer from "../reducers/favoriteSitesSlice";
import modeReducer from "../reducers/modeSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    myCourses: myCoursesReducer,
    favoriteCourses: favoriteCoursesReducer,
    favoriteSites: favoriteSitesReducer,
    mode: modeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== "production",
});
