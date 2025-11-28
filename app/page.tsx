'use client'

import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'



export default function Home() {
  const router = useRouter();

  return (
    <div className='flex justify-center flex-col items-center gap-6 mt-20'>
      <div className="p-6">
        <h1 className="text-3xl font-bold">OO에서 OO 찾고 계신가요?</h1>
      </div>

      <div className="flex items-center gap-3 pb-10">

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
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 w-[600px] h-12">

            <div className="relative min-w-[90px] pointer-events-auto">
              <select
                className="appearance-none bg-transparent pr-6 pl-1 text-gray-700 text-sm focus:outline-none relative z-10"
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

      <div className='flex gap-4 pb-20'>
        <div 
          className='w-30 h-25 bg-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow'
          onClick={() => router.push('/used')}
        >
          <img src="/utils/itemsIcon.png" alt="itemsIcon" width={60} height={60} className="object-contain p-4"/>
          <div className='px-4 pb-4'>
            <h2 className='font-bold text-lg'>중고거래</h2>
          </div>
        </div>
        <div 
          className='w-30 h-25 bg-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow'
          onClick={() => router.push('/jobs')}
        >
          <img src="/utils/storageIcon.png" alt="storageIcon" width={63} height={63} className="object-contain p-4"/>
          <div className='px-4 pb-4'>
            <h2 className='font-bold text-lg'>알바</h2>
          </div>
        </div>
        <div 
          className='w-30 h-25 bg-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow'
          onClick={() => router.push('/life')}
        >
          <img src="/utils/lifeIcon.png" alt="lifeIcon" width={60} height={60} className="object-contain p-4"/>
          <div className='px-4 pb-4'>
            <h2 className='font-bold text-lg'>동네생활</h2>
          </div>
        </div>
      </div>

    </div>
    
  );
}