'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Select } from '@/components/ui/select';
import locationIcon from '@/assets/icons/locationIcon_black.png';
import searchIcon from '@/assets/icons/searchIcon.png';
import usedIcon from '@/assets/icons/itemsIcon.png';
import storageIcon from '@/assets/icons/storageIcon.png';
import lifeIcon from '@/assets/icons/lifeIcon.png';

const words = [
    '중고거래',
    '알바',
    '동네생활',
    '채팅하기',
    '당근페이',
    '당근마켓 비즈니스',
];

export default function Home() {
    const router = useRouter();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-center flex-col items-center gap-6 mt-20">
            <div className="flex p-6">
                <Image
                    src={locationIcon}
                    alt="locationIcon"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <span
                    key={index}
                    className="
          pl-2
          text-3xl 
          font-bold
          inline-block
          animate__animated
          animate__fadeInUp
          animate__duration-700
        "
                >
                    당근에서 {words[index]} 찾고 계신가요?
                </span>
            </div>

            <div className="flex items-center gap-3 pb-10">
                <div className="flow-root">
                    <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 w-[800px] h-12">
                        <div className="relative min-w-[90px] pointer-events-auto">
                            <Select
                                options={['중고거래', '알바', '동네생활']}
                                className="pl-1 text-gray-700 text-lg font-bold"
                            />
                        </div>
                        <div className="h-5 w-px bg-gray-300 mx-3"></div>

                        <input
                            type="text"
                            placeholder="검색어를 입력해주세요"
                            className="flex-grow bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                        />
                        <button className="btn btn-circle text-white">
                            <Image
                                src={searchIcon}
                                alt="searchIcon"
                                width={30}
                                height={30}
                                className="object-contain"
                            />
                        </button>
                    </div>

                    <div className="flex text-sm text-gray-500 mt-1 gap-2">
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

            <div className="flex gap-4 pb-20">
                <div
                    className="w-30 h-25 bg-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push('/used')}
                >
                    <Image
                        src={usedIcon}
                        alt="usedIcon"
                        width={60}
                        height={60}
                        className="object-contain p-4"
                    />
                    <div className="px-4 pb-4">
                        <h2 className="font-bold text-lg">중고거래</h2>
                    </div>
                </div>
                <div
                    className="w-30 h-25 bg-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push('/jobs')}
                >
                    <Image
                        src={storageIcon}
                        alt="storageIcon"
                        width={60}
                        height={60}
                        className="object-contain p-4"
                    />
                    <div className="px-4 pb-4">
                        <h2 className="font-bold text-lg">알바</h2>
                    </div>
                </div>
                <div
                    className="w-30 h-25 bg-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push('/life')}
                >
                    <Image
                        src={lifeIcon}
                        alt="lifeIcon"
                        width={60}
                        height={60}
                        className="object-contain p-4"
                    />
                    <div className="px-4 pb-4">
                        <h2 className="font-bold text-lg">동네생활</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
