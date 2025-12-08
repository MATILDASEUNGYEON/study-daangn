"use client"

import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store'

export default function MyPage(){
    const userAddress = useSelector((state: RootState) => state.usedFilter.userAddress);
    const user = useSelector((state: RootState)=> state.auth.user);
    return(
        <div>
        <div className='flex justify-center'>
            <div className='flow-root border border-gray-200 rounded-xl p-10 m-10 w-90 h-auto '>
                <div className='flex flow-root justify-items-center pb-5'>
                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/profileIcon.png`} alt="profileIcon" width={60} height={60} className="object-contain m-4"/>
                    <p className='text-lg font-bold'>{user?.id}</p>
                </div>
                <div className="flex pb-3">
                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/locationIcon.png`} alt="mapIcon" className='size-5'/>
                    <p className='text-base pl-3'>동네 설정</p>
                </div>
                <div className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-500 focus:border-amber-500 focus:ring-amber-500">
                    
                    {userAddress == null ? '동네 설정이 필요합니다.' : `${userAddress.main} ${userAddress.dong}`}
                </div>
            </div>
            <div className='flow-root border border-gray-200 rounded-xl p-6 m-10 w-150 h-auto'>
                    <p className='text-lg font-bold text-center pb-5'>활동 대시보드</p>
                    <div className='flex flex-wrap gap-4 justify-center'>
                        <div className='flow-root bg-gray-100 rounded-xl w-50 h-25 p-5 '>
                            <div className='flex gap-4 pb-3'>
                                <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/storageIcon.png`} alt="storageIcon" className='size-6'/>
                                <p className='text-sm font-bold'>중고거래 내역</p>
                            </div>
                            <div className='text-center font-bold'>1</div>
                        </div>
                        <div>
                            <div className='flow-root bg-gray-100 rounded-xl w-50 h-25 p-5 '>
                                <div className='flex gap-4 pb-3'>
                                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/likeIcon.png`} alt="likeIcon" className='size-6'/>
                                    <p className='text-sm font-bold'>관심상품 내역</p>
                                </div>
                                <div className='text-center font-bold'>2</div>
                            </div>
                        </div>
                        <div>
                            <div className='flow-root bg-gray-100 rounded-xl w-50 h-25 p-5 '>
                                <div className='flex gap-4 pb-3'>
                                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/writeIcon.png`} alt="listIcon" className='size-6'/>
                                    <p className='text-sm font-bold'>작성 내역</p>
                                </div>
                                <div className='text-center font-bold'>2</div>
                            </div>
                        </div>
                        <div>
                            <div className='flow-root bg-gray-100 rounded-xl w-50 h-25 p-5 '>
                                <div className='flex gap-4 pb-3'>
                                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/chatIcon.png`} alt="chatIcon" className='size-6'/>
                                    <p className='text-sm font-bold'>채팅 내역</p>
                                </div>
                                <div className='text-center font-bold'>2</div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            <div className="w-full mt-10">
                <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/subfooter.png`} alt="subfooter" className="w-full" />
            </div>
        </div>
    )
}