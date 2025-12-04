"use client";

import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import {RootState} from '../lib/store';
import {logout} from '../lib/authSlice';
import Link from "next/link";

export function HeaderImpl(){
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return(
        <header className="w-full h-20 bg-white flex items-center">
            <Link href="/" className="flex cursor-pointer ">
                <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/logo.png`} alt="logo" width={180} height={60} className="object-contain" />
            </Link>

            <div className="flex-1"></div>

            <div className="flex items-center gap-6">
                {isLoggedIn ? (
                    <>
                        <Link href="/mypage">
                            <button className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                                마이페이지
                            </button>
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <button className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                                로그인
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                                회원가입
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>

    )
}