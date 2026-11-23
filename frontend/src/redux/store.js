
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import medicalRecordsReducer from "./medicalRecordsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    medicalRecords: medicalRecordsReducer,
  },
});

export default store;
