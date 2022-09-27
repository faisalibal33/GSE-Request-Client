import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    users: [],
    error: "", 
}
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    return axios.get("http://localhost:8800/api/users")
    .then(res => res.data)
})
// export const updateEquipment = createAsyncThunk("request/updateEquipment", async (value) => {
//     axios.put(`http://localhost:8800/api/request/${value.id}`, value)
//     return await axios.get("http://localhost:8800/api/request").then(res => res.data)
// })

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ""
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
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

export default usersSlice.reducer