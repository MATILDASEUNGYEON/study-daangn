import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    // id: string
    user_id: number;
    username: string;
    email: string;
    address_main?: string;
    address_dong?: string;
}

interface AuthState {
    isLogin: boolean;
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    isLogin: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(
            state,
            action: PayloadAction<{ user: User; token: string }>,
        ) {
            state.isLogin = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.isLogin = false;
            state.user = null;
            state.token = null;
        },
        updateUser(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
