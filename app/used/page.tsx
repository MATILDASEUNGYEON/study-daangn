"use client";

import * as React from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Button } from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {SelectButton} from "@/components/ui/selectbutton";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { 
    setLocation, 
    setCategory, 
    setIsTrade, 
    setItemCategory, 
    setPriceButton, 
    setMinPrice, 
    setMaxPrice, 
    setKeyword,
    resetFilter 
} from '@/lib/usedFilterSlice';


export default function UsedPage(){
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.usedFilter);
    return(
        <div>
            <div className="flex w-full items-center gap-8 pb-10 justify-center">

                <div className="relative flex items-start self-start bg-black text-white rounded-full px-4 py-2 cursor-pointer h-12">
                    <img src="/utils/locationIcon.png" alt="Location Icon" className="size-5 mr-2 pointer-events-none items-center self-center"/>
                    <select
                        className="appearance-none bg-transparent pr-6 pl-1 self-center text-white text-sm focus:outline-none relative z-10"
                        value={filters.location}
                        onChange={(e) => dispatch(setLocation(e.target.value))}
                    >
                        <option className='text-black'>가산동</option>
                        <option className='text-black'>독산동</option>
                        <option className='text-black'>신림동</option>
                    </select>

                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-4 text-gray-200"
                    />
                </div>
                <div className="flow-root">
                    <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 w-[900px] h-12">

                        <div className="relative min-w-[90px] pointer-events-auto">
                            <select
                                className="appearance-none bg-transparent pr-6 pl-1 text-gray-700 text-sm focus:outline-none relative z-10"
                                value={filters.category}
                                onChange={(e) => dispatch(setCategory(e.target.value))}
                            >
                                <option>중고거래</option>
                                <option>알바</option>
                                <option>동네생활</option>
                            </select>

                            <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-4 text-gray-600"
                            />
                        </div>
                        <div className="h-5 w-px bg-gray-300 mx-3"></div>

                        <input
                        type="text"
                        placeholder="Search"
                        className="flex-grow bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                        value={filters.keyword}
                        onChange={(e) => dispatch(setKeyword(e.target.value))}
                        />
                        <button className="btn btn-circle text-white">
                            <img src="/utils/searchIcon.png" alt="searchIcon" width={30} height={30} className="object-contain"/>
                        </button>
                    </div>

                    <div className='flex text-sm text-gray-500 mt-1 gap-2'>
                        <p>인기 검색어</p>
                        <div className="h-5 w-px bg-gray-300 mx-3"></div>
                        <p>에어컨</p>
                        <p>에어컨 청소</p>
                        <p>노트북</p>
                        <p>원룸</p>
                        <p>현대 중고차</p>
                        <p>근처 맛집</p>
                        <p>근처 맛집</p>
                        <p>근처 맛집</p>
                    </div>
                </div>
            </div>
            <div className="py-8">
                <p className="text-sm text-gray-400">홈 {'>'}  중고거래</p>
                <div className="flex">
                    <p className="text-2xl font-bold">OOO시 OOO구 OOO동 중고거래</p>
                    <Button type="button" className="bg-amber-500 hover:bg-amber-600 ml-auto">
                        <div className= "flex">
                            <img src="/utils/plusIcon.png" alt="plusIcon" className='size-5 mr-2'/>
                            <p className="text-white">글쓰기</p>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="flex gap-13">
                <div className="flex-flow w-1/6">
                    <div className="flex justify-between items-center pb-5">
                        <p className="text-base font-bold">필터</p>
                        <p 
                            className="text-sm font-bold text-gray-400 ml-auto underline cursor-pointer"
                            onClick={() => dispatch(resetFilter())}
                        >
                            초기화
                        </p>
                    </div>
                    <div className="flex-flow border border-gray-300 rounded-xl p-4 mb-5">   
                        <div className="mt-1">
                            <Checkbox 
                                id="isTrade" 
                                name="isTrade" 
                                label="거래 가능만 보기" 
                                checked={filters.isTrade}
                                onChange={(checked) => dispatch(setIsTrade(checked))}
                            />
                        
                            <div className="flex-flow pt-4">
                                <p className="text-sm font-bold">위치</p>
                                <p className="text-sm text-gray-300">OOO시 OOO구</p>
                                <Checkbox id="comments" name="comments" label="OOO동" />
                                <Checkbox id="comments" name="comments" label="OOO동" />
                                <Checkbox id="comments" name="comments" label="OOO동" />
                            </div>
                            <div className="flex-flow pt-4">
                                <p className="text-sm font-bold">카테고리</p>
                                <Checkbox 
                                    id="digital" 
                                    name="digital" 
                                    label="디지털기기"
                                    checked={filters.itemCategory === "디지털기기"}
                                    onChange={(checked) => 
                                        dispatch(setItemCategory(checked ? "디지털기기" : ""))
                                    }
                                />
                                <Checkbox 
                                    id="appliance" 
                                    name="appliance" 
                                    label="생활가전"
                                    checked={filters.itemCategory === "생활가전"}
                                    onChange={(checked) => 
                                        dispatch(setItemCategory(checked ? "생활가전" : ""))
                                    }
                                />
                                <Checkbox 
                                    id="furniture" 
                                    name="furniture" 
                                    label="가구/인테리어"
                                    checked={filters.itemCategory === "가구/인테리어"}
                                    onChange={(checked) => 
                                        dispatch(setItemCategory(checked ? "가구/인테리어" : ""))
                                    }
                                />
                                <Checkbox 
                                    id="living" 
                                    name="living" 
                                    label="생활/주방"
                                    checked={filters.itemCategory === "생활/주방"}
                                    onChange={(checked) => 
                                        dispatch(setItemCategory(checked ? "생활/주방" : ""))
                                    }
                                />
                                <Checkbox 
                                    id="kids" 
                                    name="kids" 
                                    label="유아동"
                                    checked={filters.itemCategory === "유아동"}
                                    onChange={(checked) => 
                                        dispatch(setItemCategory(checked ? "유아동" : ""))
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2 pt-4 items-start">
                                <p className="text-sm font-bold pb-3">가격</p>

                                <SelectButton 
                                    label="나눔"
                                    isSelected={filters.priceButton === "나눔"}
                                    onClick={() => dispatch(setPriceButton(filters.priceButton === "나눔" ? null : "나눔"))}
                                />
                                <SelectButton 
                                    label="5,000원 이하"
                                    isSelected={filters.priceButton === "5,000원 이하"}
                                    onClick={() => dispatch(setPriceButton(filters.priceButton === "5,000원 이하" ? null : "5,000원 이하"))}
                                />
                                <SelectButton 
                                    label="10,000원 이하"
                                    isSelected={filters.priceButton === "10,000원 이하"}
                                    onClick={() => dispatch(setPriceButton(filters.priceButton === "10,000원 이하" ? null : "10,000원 이하"))}
                                />
                                <SelectButton 
                                    label="20,000원 이하"
                                    isSelected={filters.priceButton === "20,000원 이하"}
                                    onClick={() => dispatch(setPriceButton(filters.priceButton === "20,000원 이하" ? null : "20,000원 이하"))}
                                />

                                <div className="flex gap-3 items-center">
                                    <Input 
                                        placeholder="0" 
                                        className="text-gray-300 text-left"
                                        value={filters.minPrice}
                                        onChange={(e) => dispatch(setMinPrice(e.target.value))}
                                    />
                                    <p className="text-sm text-black">-</p>
                                    <Input 
                                        placeholder="최대" 
                                        className="text-gray-300 text-left"
                                        value={filters.maxPrice}
                                        onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-3">
                            <p className="text-sm font-bold text-gray-300 underline">적용하기</p>
                        </div>
                    </div>
                </div>
                <div className="flex-flow w-5/6">
                    <div className="py-5">
                        <p className="text-base font-bold mb-3">적용필터 확인란</p>
                        <div className="flex flex-wrap gap-2">
                            {filters.location && (
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                    위치: {filters.location}
                                </span>
                            )}
                            {filters.category && (
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                    카테고리: {filters.category}
                                </span>
                            )}
                            {filters.isTrade && (
                                <span className="px-3 py-1 bg-amber-100 rounded-full text-sm">
                                    거래 가능만 보기
                                </span>
                            )}
                            {filters.itemCategory && (
                                <span className="px-3 py-1 bg-blue-100 rounded-full text-sm">
                                    품목: {filters.itemCategory}
                                </span>
                            )}
                            {filters.priceButton && (
                                <span className="px-3 py-1 bg-green-100 rounded-full text-sm">
                                    가격: {filters.priceButton}
                                </span>
                            )}
                            {(filters.minPrice || filters.maxPrice) && (
                                <span className="px-3 py-1 bg-green-100 rounded-full text-sm">
                                    가격: {filters.minPrice || '0'}원 ~ {filters.maxPrice || '최대'}원
                                </span>
                            )}
                            {filters.keyword && (
                                <span className="px-3 py-1 bg-purple-100 rounded-full text-sm">
                                    검색어: {filters.keyword}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Card image="/utils/sampleImage.png" title="상품1" price={0} />
                        <Card image="/utils/sampleImage.png" title="상품2" price={0} />
                        <Card image="/utils/sampleImage.png" title="상품3" price={0} />
                        <Card image="/utils/sampleImage.png" title="상품4" price={0} />
                        <Card image="/utils/sampleImage.png" title="상품4" price={0} />
                        <Card image="/utils/sampleImage.png" title="상품4" price={0} />
                        <Card image="/utils/sampleImage.png" title="상품4" price={0} />
                        <Card image="/utils/sampleImage.png" title="상품4" price={0} />
                    </div>
                </div>
            </div>
            <div className="w-full mt-10">
                <img src="/utils/subfooter.png" alt="subfooter" className="w-full" />
            </div>
        </div>
    )
}