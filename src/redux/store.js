import { configureStore } from "@reduxjs/toolkit";
import requestReducer from "./RequestSlice";
import equipmentReducer from "./EquipmentSlice";
import darkModeReducer from "./darkModeSlice";
import usersReducer from "./usersSlice";
import cycleReducer from "./cycle";

const store = configureStore({
  reducer: {
    request: requestReducer,
    equipment: equipmentReducer,
    darkMode: darkModeReducer,
    users: usersReducer,
    cycle: cycleReducer,
  },
});

export default store;
