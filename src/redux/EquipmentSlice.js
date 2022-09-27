import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    equipment: [],
    error: "", 
}
export const fetchEquipment = createAsyncThunk("equipment/fetchEquipment", async () => {
    return axios.get("http://localhost:8800/api/equipment")
    .then(res => res.data)
})
// export const updateEquipment = createAsyncThunk("request/updateEquipment", async (value) => {
//     axios.put(`http://localhost:8800/api/request/${value.id}`, value)
//     return await axios.get("http://localhost:8800/api/request").then(res => res.data)
// })

const EquipmentSlice = createSlice({
    name: "equipment",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchEquipment.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchEquipment.fulfilled, (state, action) => {
            state.loading = false
            state.equipment = action.payload
            state.error = ""
        })
        builder.addCase(fetchEquipment.rejected, (state, action) => {
            state.loading = false
            state.equipment = []
            state.error = action.error.message
        })
        // builder.addCase(updateEquipment.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(updateEquipment.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.equipment = action.payload
        //     state.error = ""
        // })
        // builder.addCase(updateEquipment.rejected, (state, action) => {
        //     state.loading = false
        //     state.request = []
        //     state.error = action.error.message
        // })
    }
})

export default EquipmentSlice.reducer