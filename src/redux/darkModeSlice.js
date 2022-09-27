import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    darkMode: false
}

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        modeDark(state) {
            state.darkMode = !state.darkMode
        }
    },
})

export const {modeDark, modeLight} = darkModeSlice.actions

export default darkModeSlice.reducer