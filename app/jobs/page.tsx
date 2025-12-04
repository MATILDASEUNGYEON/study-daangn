import React from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Button } from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import { SelectButton } from "@/components/ui/selectbutton";
import {Select} from "@/components/ui/select";
import { JobStyleCard } from "@/components/ui/jobstylecard";

export default function JobsPage(){
    return(
        <div>
            <div className="flex w-full items-center gap-8 pb-10 justify-center">

                <div className="relative flex items-start self-start bg-black text-white rounded-full px-4 py-2 cursor-pointer h-12">
                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/locationIcon.png`} alt="Location Icon" className="size-5 mr-2 pointer-events-none items-center self-center"/>
                    <select
                        className="appearance-none bg-transparent pr-6 pl-1 self-center text-white text-sm focus:outline-none relative z-10"
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
                            >
                                <option>알바</option>
                                <option>중고거래</option>
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
                        />
                        <button className="btn btn-circle text-white">
                            <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/searchIcon.png`} alt="Search Icon" width={30} height={30}/>
                        </button>
                    </div>

                    <div className='flex text-sm text-gray-500 mt-1 gap-2'>
                        <p>인기 검색어</p>
                        <div className="h-5 w-px bg-gray-300 mx-3"></div>
                        <p>소일거리</p>
                        <p>짐 옮기기</p>
                        <p>이사짐</p>
                        <p>배달</p>
                        <p>등하원</p>
                        <p>도우미</p>
                        <p>요양보호</p>
                        <p>아이돌봄</p>
                    </div>
                </div>
            </div>
            <div className="py-8">
                <p className="text-sm text-gray-400">홈 {'>'}  알바</p>
                <div className="flex">
                    <p className="text-2xl font-bold">OOO시 OOO구 OOO동 알바</p>
                    <Button type="button" className="bg-amber-500 hover:bg-amber-600 ml-auto">
                        <div className= "flex">
                            <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/plusIcon.png`} alt="plusIcon" className='size-5 mr-2'/>
                            <p className="text-white">글쓰기</p>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="flex gap-13">
                <div className="flex-flow w-1/5">
                    <div className="flex justify-between items-center pb-5">
                        <p className="text-base font-bold">필터</p>
                        <p className="text-sm font-bold text-gray-400 ml-auto underline">초기화</p>
                    </div>
                    <div className="flex-flow border border-gray-300 rounded-xl p-4 mb-5"> 
                        <div className="mt-1">
                            <div className="flex-flow pt-4">
                                <p className="text-sm font-bold">근무 유형</p>
                                <Checkbox id="type" name="type" label="1개월 이상" />
                                <Checkbox id="type" name="type" label="단기" />
                            </div>
                            <div className="flex-flow pt-4">
                                <p className="text-sm font-bold">하는일</p>
                                <Checkbox id="type" name="type" label="서빙" />
                                <Checkbox id="type" name="type" label="주방보조/설거지" />
                                <Checkbox id="type" name="type" label="주방장/조리사" />
                                <Checkbox id="type" name="type" label="매장관리/판매" />
                                <Checkbox id="type" name="type" label="음료 제조" />
                                <Checkbox id="type" name="type" label="베이킹" />
                                <Checkbox id="type" name="type" label="편의점" />
                            </div>
                            <div className="flex-flow pt-4">
                                <p className="text-sm font-bold">근무 요일</p>
                                <div className="flex flex-wrap gap-2 pt-4">
                                <SelectButton label="월"/>
                                <SelectButton label="화"/>
                                <SelectButton label="수"/>
                                <SelectButton label="목"/>
                                <SelectButton label="금"/>
                                <SelectButton label="토"/>
                                <SelectButton label="일"/>
                                </div>
                            </div>
                            <div className="flex-flow pt-4">
                                <p className="text-sm font-bold">근무 시간</p>
                                <div className ="flex gap-2 items-center pt-4">
                                    <div className="flex-flow">
                                        <p className="text-xs text-gray-300">시작</p>
                                        <Select options={["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00"]} />
                                    </div>
                                    <p className="text-sm text-black">-</p>
                                    <div className="flex-flow">
                                        <p className="text-xs text-gray-300">종료</p>
                                        <Select options={["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00"]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <p className="text-sm font-bold text-gray-300 underline">적용하기</p>
                        </div>
                    </div>
                </div>
                <div className="flex-flow w-4/5">
                    <div className="py-5">
                        <p>적용필터 확인란</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <JobStyleCard 
                            title="Title" 
                            categories={["배달", "단기", "시급"]}
                            price="시급 15,000원"
                            tags={[
                            { text: "당일지급", bgColor: "bg-green-200", textColor: "text-green-900" },
                            { text: "후기25개", bgColor: "bg-gray-200", textColor: "text-gray-900" }
                            ]}
                            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                        />
                        <JobStyleCard 
                            title="Title" 
                            categories={["배달", "단기", "시급"]}
                            price="시급 15,000원"
                            tags={[
                            { text: "당일지급", bgColor: "bg-green-200", textColor: "text-green-900" },
                            { text: "후기25개", bgColor: "bg-gray-200", textColor: "text-gray-900" }
                            ]}
                            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                        />
                        <JobStyleCard 
                            title="Title" 
                            categories={["배달", "단기", "시급"]}
                            price="시급 15,000원"
                            tags={[
                            { text: "당일지급", bgColor: "bg-green-200", textColor: "text-green-900" },
                            { text: "후기25개", bgColor: "bg-gray-200", textColor: "text-gray-900" }
                            ]}
                            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                        />
                        <JobStyleCard 
                            title="Title" 
                            categories={["배달", "단기", "시급"]}
                            price="시급 15,000원"
                            tags={[
                            { text: "당일지급", bgColor: "bg-green-200", textColor: "text-green-900" },
                            { text: "후기25개", bgColor: "bg-gray-200", textColor: "text-gray-900" }
                            ]}
                            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                        />
                        
                    </div>
                </div>
            </div>
            <div className="w-full mt-10">
                <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/subfooter.png`} alt="subfooter" className="w-full" />
            </div>
        </div>
    )
}