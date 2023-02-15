import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            //найди объект в данном массиве
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                //если он есть, то увеличь его кол-во на 1
                findItem.count++
            }
            else {
                //иначе добавляй новый объект
                state.items.push({ ...action.payload, count: 1 })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload)

            if (findItem && findItem.count > 0) {
                //если он есть, то увеличь его кол-во на 1
                findItem.count--
            }
        },


        removeItem(state, action) {

            state.items = state.items.filter(obj => obj.id !== action.payload)

        }, clearItems(state) {
            state.items = []
            state.totalPrice = []
        },
    }
})
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions
export default cartSlice.reducer