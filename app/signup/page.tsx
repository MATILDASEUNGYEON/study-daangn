'use client'

import React, { useState } from 'react';

import { User, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from "@/assets/icons/logo.png";
import subfooter from "@/assets/images/subfooter.png";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    emailLocal: '',
    emailDomain: '',
  });
  
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'id') {
      setIsIdChecked(false);
    }
  };

  const handleCheckId = async () => {
    if (!formData.id) {
      alert('아이디를 입력해주세요.');
      return;
    }
    
    try {
      const res = await fetch(`/api/auth/check-id?id=${formData.id}`);
      const data = await res.json();
      
      if (data.exists) {
        alert('이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
      } else {
        alert('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      }
    } catch {
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isIdChecked) {
      setError('아이디 중복확인을 해주세요.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 규칙 검사 (대소문자, 숫자, 특수문자 포함 8~20자)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(formData.password)) {
      setError('비밀번호는 대소문자, 숫자, 특수문자를 포함한 8~20자여야 합니다.');
      return;
    }

    const email = `${formData.emailLocal}@${formData.emailDomain}`;

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: formData.id,
          password: formData.password,
          email: email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || '회원가입에 실패했습니다.');
      }

      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        <div className="flex flex-col items-center pt-20 pb-30 px-4">
            <div className="flex flex-col items-center mb-10">
                <Image src={logo} alt="logo" width={200} height={60} className="object-contain"/>
            </div>
            
            <div className="w-full max-w-3xl rounded-xl border border-gray-300 p-10 shadow-sm">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-500">
                        ID <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input 
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        placeholder="아이디를 입력해주세요."
                                        className="border-gray-600 bg-[%050505] pl-10 text-gray-500 placeholder:text-gray-500"
                                        required
                                    />
                            </div>
                            <Button
                                type="button"
                                variant='ghost'
                                className={`text-white ${isIdChecked ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'}`}
                                onClick={handleCheckId}
                                >
                                {isIdChecked ? '확인완료' : '중복확인'}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                                    name="passwordConfirm"
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
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
                                    name="emailLocal"
                                    value={formData.emailLocal}
                                    onChange={handleChange}
                                    placeholder="이메일을 입력해주세요."
                                    className="border-gray-600 pl-10 text-gray-500 placeholder:text-gray-500"
                                    required
                                />
                            </div>
                            <span className="flex items-center text-gray-500">@</span>
                            <div className="relative w-40">
                                <Input
                                    list="email-domains"
                                    name="emailDomain"
                                    value={formData.emailDomain}
                                    onChange={handleChange}
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
                                variant="ghost"
                                className="bg-amber-500 text-white hover:bg-amber-600"
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
                                variant="ghost"
                                className="bg-amber-500 text-white hover:bg-amber-600"
                            >
                                확 인
                            </Button>
                        </div>
                    </div>
            
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-amber-500 py-2 text-white font-semibold hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    > 
                        {isLoading ? '가입 중...' : 'Sign Up'}
                    </button>

                </form>
            </div>

        </div>
        <div className="w-full mt-10">
            <Image src={subfooter} alt="subfooter" className="w-full" />
        </div>
    </div>
  );
}
