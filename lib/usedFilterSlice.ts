import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserAddress {
    dong: string;
    city: string;
    borough: string;
    main: string;
    full: string;
}

interface UsedFilterState {
    location: string;
    userAddress: UserAddress | null;
    category: string;
    isTrade: boolean;
    itemCategory: string;
    priceButton: string | null;
    minPrice: string;
    maxPrice: string;
    keyword: string;
}
const initialState: UsedFilterState = {
    location: '',
    userAddress: null,
    category: '중고거래',
    isTrade: false,
    itemCategory: '',
    priceButton: null,
    minPrice: '',
    maxPrice: '',
    keyword: '',
};

const UsedFilterSlice = createSlice({
    name: 'usedFilter',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        setUserAddress: (state, action: PayloadAction<UserAddress | null>) => {
            state.userAddress = action.payload;
            if (action.payload) {
                state.location = action.payload.dong;
            }
        },
        updateDong: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
            if (state.userAddress) {
                state.userAddress.dong = action.payload;
                state.userAddress.full = `${state.userAddress.city} ${state.userAddress.borough} ${action.payload}`;
            }
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setIsTrade: (state, action: PayloadAction<boolean>) => {
            state.isTrade = action.payload;
        },
        setItemCategory: (state, action: PayloadAction<string>) => {
            state.itemCategory = action.payload;
        },
        setPriceButton: (state, action: PayloadAction<string | null>) => {
            state.priceButton = action.payload;
            if (action.payload !== null) {
                state.minPrice = '';
                state.maxPrice = '';
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
            state.itemCategory = '';
            state.priceButton = null;
            state.minPrice = '';
            state.maxPrice = '';
            state.keyword = '';
        },
    },
});

export const {
    setLocation,
    setUserAddress,
    updateDong,
    setCategory,
    setIsTrade,
    setItemCategory,
    setPriceButton,
    setMinPrice,
    setMaxPrice,
    setKeyword,
    resetFilter,
} = UsedFilterSlice.actions;
export default UsedFilterSlice.reducer;
