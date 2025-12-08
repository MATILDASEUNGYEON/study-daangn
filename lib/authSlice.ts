import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 사용자 정보 타입
interface User {
  id: string
  email: string
  address_main?: string
  address_dong?: string
}

interface AuthState {
  isLogin: boolean
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  isLogin: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그인 성공 시 사용자 정보와 토큰 저장
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isLogin = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    // 로그아웃
    logout(state) {
      state.isLogin = false
      state.user = null
      state.token = null
    },
    // 사용자 정보 업데이트
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { loginSuccess, logout, updateUser } = authSlice.actions
export default authSlice.reducer
