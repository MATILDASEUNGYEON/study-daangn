'use client'

import React from 'react';

import { User, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <div>
        <div className="flex flex-col items-center pt-20 pb-30 px-4">
            <div className="flex flex-col items-center mb-10">
                <img src="/utils/logo.png" alt="logo" width={200} height={60} className="object-contain"/>
            </div>
            
            <div className="w-full max-w-3xl rounded-xl border border-gray-300 p-10 shadow-sm">
                <form className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                        ID <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input 
                                        placeholder="아이디를 입력해주세요."
                                        className="border-gray-600 bg-[%050505] pl-10 text-gray-500 placeholder:text-gray-500"
                                        required
                                    />
                            </div>
                            <Button
                                type="button"
                                className="bg-amber-500 text-white hover:bg-amber-600"
                                >
                                중복확인
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                            Password <span className="text-red-400">*</span>{" "}
                            <span className="text-xs text-red-400">
                                (대소문자, 숫자, 특수문자 포함 8~20자 입력)
                            </span>
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요."
                                    className="border-gray-600 pl-10 text-gray-500 placeholder:text-gray-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                            Re-enter Password <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="password"
                                    placeholder="비밀번호를 재입력해주세요."
                                    className="border-gray-600 bg-[%050505] pl-10 text-gray-500 placeholder:text-gray-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                            E-mail <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input    
                                    placeholder="이메일을 입력해주세요."
                                    className="border-gray-600 pl-10 text-gray-500 placeholder:text-gray-500"
                                    required
                                />
                            </div>
                            <span className="flex items-center text-gray-500">@</span>
                            <div className="relative w-40">
                                <Input
                                    list="email-domains"
                                    placeholder="선택 또는 입력"
                                    className="border-gray-600 bg-[%050505] pl-2 text-gray-500 placeholder:text-gray-500"
                                    required
                                />
                                <datalist id="email-domains">
                                    <option value="gmail.com" />
                                    <option value="naver.com" />
                                    <option value="daum.net" />
                                    <option value="kakao.com" />
                                    <option value="hanmail.net" />
                                    <option value="nate.com" />
                                    <option value="hotmail.com" />
                                    <option value="outlook.com" />
                                    <option value="yahoo.com" />
                                </datalist>
                            </div>
                            <Button
                                type="button"
                                className="bg-gray-700 text-white hover:bg-gray-600"
                            >
                                인증요청
                            </Button>
                        </div>    
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="이메일 인증번호를 입력해주세요. (코드는 10분간 유효합니다.)"
                                    className="border-gray-600 bg-[%050505] pl-10 text-gray-500 placeholder:text-gray-500"
                                />
                            </div>
                            <Button
                                type="button"
                                className="bg-gray-700 text-white hover:bg-gray-600"
                            >
                                확 인
                            </Button>
                        </div>
                    </div>
            
                    <button
                        type="submit"
                        className="w-full rounded-md bg-amber-500 py-2 text-white font-semibold hover:bg-amber-600"
                    >
                        Sign In
                    </button>

                </form>
            </div>

        </div>
        <div className="w-full mt-10">
            <img src="/utils/subfooter.png" alt="subfooter" className="w-full" />
        </div>
    </div>
  );
}
