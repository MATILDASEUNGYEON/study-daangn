import * as React from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Button } from "@/components/ui/button";


export default function LifePage(){
    return(
        <div>
            <div className="flex w-full items-center gap-8 pb-10 justify-center">

                <div className="relative flex items-start self-start bg-black text-white rounded-full px-4 py-2 cursor-pointer h-12">
                    <img src="/utils/locationIcon.png" alt="Location Icon" className="size-5 mr-2 pointer-events-none items-center self-center"/>
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
                            <img src="/utils/searchIcon.png" alt="Search Icon" width={30} height={30}/>
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
                <p className="text-sm text-gray-400">홈 {'>'}  동네생활</p>
                <div className="flex">
                    <p className="text-2xl font-bold">OOO시 OOO구 OOO동 동네생활</p>
                    <Button type="button" className="bg-amber-500 hover:bg-amber-600 ml-auto">
                        <div className= "flex">
                            <img src="/utils/plusIcon.png" alt="plusIcon" className='size-5 mr-2'/>
                            <p className="text-white">글쓰기</p>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="flex gap-13">
                <div className="flex-flow w-1/7 text-gray-500 space-y-2">
                    <p>🔥 인기글</p>
                    <p>전체</p>
                    <p>맛집</p>
                    <p>동네행사</p>
                    <p>반려동물</p>
                    <p>운동</p>
                    <p>생활/편의</p>
                    <p>분실/실종</p>
                    <p>병원/약국</p>
                    <p>고민/사연</p>
                    <p>동네친구</p>
                    <p>이사/시공</p>
                    <p>주거/부동산</p>

                </div>
                <div className="flex-flow w-6/7">
                    <div className="py-5">
                        <p>적용필터 확인란</p>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="flex w-full border border-gray-300 rounded-md p-4 mb-5 ml-auto">
                            <div className="w-4/5 flex flex-col items-start justify-center">
                                <p className="text-lg font-bold">Title</p>
                                <p className="text-2xl text-gray-400">Context Preview</p>
                                <div className="flex text-sm text-gray-300 gap-2">
                                    <p>Category</p>
                                    <p>Category</p>
                                    <p>Category</p>
                                </div>
                                <div className="flex pt-3">
                                    <div className="flex gap-2 items-center mr-4">
                                        <img src="/utils/likeIcon.png" alt="likeIcon" className='size-4'/>
                                        <p className="text-s text-gray-400">0</p>   
                                    </div>
                                    <div className="flex gap-2 items-center mr-4">
                                        <img src="/utils/commentIcon.png" alt="commentIcon" className='size-4'/>
                                        <p className="text-s text-gray-400">0</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 flex justify-center">
                                <img src="/utils/sampleImage.png" alt="sampleImage" className="size-40 object-cover m-3"/>
                            </div>
                        </div>
                        <div className="flex w-full border border-gray-300 rounded-md p-4 mb-5 ml-auto">
                            <div className="w-4/5 flex flex-col items-start justify-center">
                                <p className="text-lg font-bold">Title</p>
                                <p className="text-2xl text-gray-400">Context Preview</p>
                                <div className="flex text-sm text-gray-300 gap-2">
                                    <p>Category</p>
                                    <p>Category</p>
                                    <p>Category</p>
                                </div>
                                <div className="flex pt-3">
                                    <div className="flex gap-2 items-center mr-4">
                                        <img src="/utils/likeIcon.png" alt="likeIcon" className='size-4'/>
                                        <p className="text-s text-gray-400">0</p>   
                                    </div>
                                    <div className="flex gap-2 items-center mr-4">
                                        <img src="/utils/commentIcon.png" alt="commentIcon" className='size-4'/>
                                        <p className="text-s text-gray-400">0</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 flex justify-center">
                                <img src="/utils/sampleImage.png" alt="sampleImage" className="size-40 object-cover m-3"/>
                            </div>
                        </div>
                        <div className="flex w-full border border-gray-300 rounded-md p-4 mb-5 ml-auto">
                            <div className="w-4/5 flex flex-col items-start justify-center">
                                <p className="text-lg font-bold">Title</p>
                                <p className="text-2xl text-gray-400">Context Preview</p>
                                <div className="flex text-sm text-gray-300 gap-2">
                                    <p>Category</p>
                                    <p>Category</p>
                                    <p>Category</p>
                                </div>
                                <div className="flex pt-3">
                                    <div className="flex gap-2 items-center mr-4">
                                        <img src="/utils/likeIcon.png" alt="likeIcon" className='size-4'/>
                                        <p className="text-s text-gray-400">0</p>   
                                    </div>
                                    <div className="flex gap-2 items-center mr-4">
                                        <img src="/utils/commentIcon.png" alt="commentIcon" className='size-4'/>
                                        <p className="text-s text-gray-400">0</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 flex justify-center">
                                <img src="/utils/sampleImage.png" alt="sampleImage" className="size-40 object-cover m-3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-10">
                <img src="/utils/subfooter.png" alt="subfooter" className="w-full" />
            </div>
        </div>
    )
}