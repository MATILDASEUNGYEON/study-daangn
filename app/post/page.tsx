'use client'

import React from "react"
import { useState } from "react";
import dynamic from "next/dynamic";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryItem } from "@/components/ui/categoryitem";

// Leaflet은 window 객체가 필요하므로 SSR 비활성화
const LeafletMap = dynamic(() => import("@/components/mapLeaflet"), {
  ssr: false,
  loading: () => <div className="w-full h-[380px] rounded-md overflow-hidden border flex items-center justify-center bg-gray-100">지도 로딩 중...</div>
});

export default function PostPage(){
    const [address, setAddress] = useState<{ region: string; dong: string } | null>(null);
    
    return(
        <div>
            <div className="w-full h-px bg-gray-100 my-4"></div>
            <div>
                <h2 className="text-2xl font-bold mb-4">글쓰기</h2>
                <p className="text-sm text-gray-500 mb-6">글을 작성해보세요.</p>
            </div>
            <div className="w-full h-px bg-gray-100 my-4"></div>
            <div className="flex gap-5 items-center mb-6">
                <p className="w-[50px] text-sm text-black ">제목</p>
                <Select options={['중고거래', '알바', '동네생활']} className="border border-gray-300 rounded-md"/>
                <Input placeholder="글 제목" className="border border-gray-300 rounded-md focus-visible:border-gray-300 focus-visible:ring-0"/>
            </div>
            <div className="col-span-full mb-6">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">파일첨부</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" className="mx-auto size-12 text-gray-300">
                            <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                        <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input id="file-upload" type="file" name="file-upload" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>      
            <div className="col-span-full mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900">카테고리 선택</label>
                <div className="flex gap-4">
                    <CategoryItem id="cat-digital" name="category" label="디지털기기" />
                    <CategoryItem id="cat-living" name="category" label="생활가전" />
                    <CategoryItem id="cat-furniture" name="category" label="가구/인테리어" />
                    <CategoryItem id="cat-kids" name="category" label="생활/주방" />
                    <CategoryItem id="cat-sports" name="category" label="유아동" />
                    <CategoryItem id="cat-etc" name="category" label="기타" />
                </div>
            </div>
            <div className="col-span-full mb-6">
                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">자세한 설명</label>
                <div className="mt-2">
                    <textarea id="about" name="about" rows={7} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                </div>
            </div>
            <div className="col-span-full mb-6">
                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">가격</label>
                <div className="gap-3 py-3">
                    <Button variant="ghost" className="mt-2 bg-amber-500 text-white hover:bg-amber-600 rounded-md">판매하기</Button>
                    <Button variant="ghost" className="mt-2 ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md">나눔하기</Button>
                </div>
                
                <div className="mt-2 w-50">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">₩</div>
                        <Input className="!border-0 !shadow-none !rounded-none focus-visible:!border-0 focus-visible:!ring-0" />
                    </div>
                </div>
            </div>
            <div className="col-span-full mb-6">
                <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-900"
                >
                    거래 정보
                </label>

                <div className="mt-2">
                    <LeafletMap
                    onSelectAddress={(addr) => {
                        console.log("선택한 주소:", addr);
                        setAddress(addr);
                    }}
                    />

                    <div className="mt-4 p-3 bg-gray-50 border rounded text-sm">
                    {address ? (
                        <div className="flex flex-col gap-1">
                            <span>📍 {address.region}</span>
                            <span className="text-gray-600 ml-5">{address.dong}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400">
                        지도를 클릭하여 위치를 선택하세요.
                        </span>
                    )}
                    </div>
                </div>
            </div>

            <div className="col-span-full mt-6 flex justify-end">
                <Button variant="ghost" size="lg" className="mt-2 bg-amber-500 text-base text-slate-900 hover:bg-amber-600 rounded-md">등록하기</Button>
                
            </div>
        </div>
    
    )
}