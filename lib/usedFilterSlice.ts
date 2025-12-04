import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface UsedFilterState {
    location: string;
    category: string;
    isTrade: boolean;
    itemCategory: string;
    priceButton: string | null;
    minPrice: string;
    maxPrice: string;
    keyword: string;
}
const initialState: UsedFilterState = {
    location: "",
    category: "중고거래",
    isTrade: false,
    itemCategory: "",
    priceButton: null,
    minPrice: "",
    maxPrice: "",
    keyword: "",
}

const UsedFilterSlice= createSlice({
    name: 'usedFilter',
    initialState,
    reducers:{
        setLocation: (state, action:PayloadAction<string>)=>{
            state.location = action.payload;
        },
        setCategory: (state, action:PayloadAction<string>)=>{
            state.category = action.payload;
        },
        setIsTrade: (state, action:PayloadAction<boolean>)=>{
            state.isTrade = action.payload;
        },
        setItemCategory: (state, action:PayloadAction<string>)=>{
            state.itemCategory = action.payload;
        },
        setPriceButton: (state, action:PayloadAction<string | null>)=>{
            state.priceButton = action.payload;
            if( action.payload !==null){
                state.minPrice = "";
                state.maxPrice = "";
            }
        },
        setMinPrice: (state, action: PayloadAction<string>) => {
            state.minPrice = action.payload;
            state.priceButton = null;
        },
        setMaxPrice: (state, action: PayloadAction<string>) => {
            state.maxPrice = action.payload;
            state.priceButton = null;
        },
        setKeyword: (state, action: PayloadAction<string>) => {
        state.keyword = action.payload;
        },

        resetFilter: (state) => {
            state.location = "";
            state.itemCategory = "";
            state.priceButton = null;
            state.minPrice = "";
            state.maxPrice = "";
            state.keyword = "";
        },
    }
})

export const {
    setLocation,
    setCategory,
    setIsTrade,
    setItemCategory,
    setPriceButton,
    setMinPrice,
    setMaxPrice,
    setKeyword,
    resetFilter
} = UsedFilterSlice.actions
export default UsedFilterSlice.reducer