"use client";
import {Button} from '@/components/ui/button';
import { CardAddLocation} from '@/components/ui/cardpluslocation';
import Link from "next/link";
interface Props {
  params: {
    id: string;
  };
}

export default function UsedDetailPage({ params }: Props) {
  const { id } = params;

  const temp = 36.5;

  const getEmoji = (t: number) => {
    if (t < 36) return "🥶";
    if (t < 37.5) return "😀";
    return "🥵";
  };

  return (
    <div className="p-8">
        <div className=" flex gap-1 text-sm text-gray-400">
            <p><Link href="/">홈</Link></p>
            <p> {'>'} </p>
            <p><Link href="/used">중고거래</Link></p>
            <p> {'>'} </p>
            <p>Product Item Title</p>
        </div>

        <div className="flex pt-3">
            <div className="w-2/5 pr-4">
                <div className="w-full">
                    <img
                    src={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                    alt="usedItemImage"
                    className="w-full h-96 object-cover rounded-md"
                    />

                    <div className="flex justify-between mt-4">
                        <div className="flex items-center">
                            <img
                            src={`${process.env.NEXT_PUBLIC_MINIO_URL}/profileIcon.png`}
                            alt="profile"
                            className="w-12 h-12 rounded-full"
                            />

                            <div className="flex flex-col justify-center ml-3">
                            <p className="text-lg font-bold leading-tight">username</p>
                            <p className="text-sm text-gray-600 leading-tight">
                                location
                            </p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between">
                            <p className="w-3/4 text-lg text-center">
                                {temp.toFixed(1)} °C
                            </p>
                            <p className="w-1/4 text-right">{getEmoji(temp)}</p>
                            </div>

                            <div>
                                <input
                                    type="range"
                                    min="34"
                                    max="40"
                                    step="0.1"
                                    value={temp}
                                    disabled
                                    className="
                                    w-full h-2 bg-gray-200 rounded-full
                                    appearance-none
                                    cursor-default
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:w-4
                                    [&::-webkit-slider-thumb]:h-4
                                    [&::-webkit-slider-thumb]:bg-gray-400
                                    [&::-webkit-slider-thumb]:rounded-full
                                    "
                                />
                                <p className="text-xs text-gray-400 text-right mt-1">
                                    매너온도
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/5 h-auto pl-6">
                <div>
                    <p className="text-2xl font-bold mb-4">Text Heading</p>
                    <div className='flex gap-4 items-center'>
                        <p className="text-sm underline text-gray-300">category</p>
                        <p className='text-sm text-gray-300'>OO시간전</p>
                    </div>
                    <p className="text-3xl font-bold my-6">₩ 000,000</p>
                    <p className="text-lg h-40">textarea</p>
                </div>
                <div className="flex-flow mt-10">
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-1">
                            <p className="text-xs text-gray-300 ">채팅</p>
                            <p className="text-xs text-gray-400 ">0</p>
                        </div>
                        <p>•</p>
                        <div className="flex gap-1">
                            <p className="text-xs text-gray-300 ">관심</p>
                            <p className="text-xs text-gray-400 ">0</p>
                        </div>
                        <p>•</p>
                        <div className="flex gap-1">
                            <p className="text-xs text-gray-300 ">조회</p>
                            <p className="text-xs text-gray-400 ">0</p>
                        </div>
                    </div>
                    <Button size="lg" variant="ghost" className="mt-6 w-full bg-amber-500 text-white hover:bg-amber-600"> 판매자에게 채팅보내기 </Button>
                </div>
            </div>
        </div>
        <div className="w-full h-px bg-gray-100 my-4"></div>
        <div className="flex justify-between">
            <p className="text-xl">`username` 의 판매물품</p>
            <a className="text-sm text-amber-500 after:content-['_>']" href="...">더 구경하기</a>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='name의 상품1' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='name의 상품2' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='name의 상품3' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='name의 상품4' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
        </div>
        <div className="w-full h-px bg-gray-100 my-4"></div>
        <div className="flex justify-between">
            <p className="text-xl">인기매물</p>
            <a className="text-sm text-amber-500 after:content-['_>']" href="...">더 구경하기</a>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 mt-4">
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='다른 판매자 상품1' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='다른 판매자 상품2' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='다른 판매자 상품3' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='다른 판매자 상품4' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='다른 판매자 상품5' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='다른 판매자 상품6' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
            <CardAddLocation image={`${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`} title='다른 판매자 상품7' price={0} location='구로구'uploadTime='2025-01-31T14:00:00'/>
        </div>
        <div className="w-full mt-10">
            <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/subfooter.png`} alt="subfooter" className="w-full" />
        </div>
    </div>
  );
}
