import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { category,
            sortBy,
            order,
            search,
            currentPage,
            searchValue
        } = params
        const { data } = await axios.get(
            `https://639262efac688bbe4c62c42b.mockapi.io/items/?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`,
        );
        return data
    }
)

const initialState = {
    items: []
}
const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            console.log((state, "идет отправка"))
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            console.log((state, "отправленно"))
        },
        [fetchPizzas.rejected]: (state, action) => {
            console.log(("ошибка отправки"))
        }
    }
})
export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer