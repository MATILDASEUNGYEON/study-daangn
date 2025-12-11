"use client";
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { CardAddLocation } from '@/components/ui/cardpluslocation';
import { ItemInfo, ITEM_STATUS, ITEM_STATUS_LABEL, ItemStatusType } from "@/types/item.types";
import { useCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import {toPriceFormat,getTimeAgo} from "@/utils/format";
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface Props {
  params: Promise<{
    id: string;
  }>;
}



export default function UsedDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { getCategoryName } = useCategories();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [item, setItem] = useState<ItemInfo | null>(null);
  const [sellerItems, setSellerItems] = useState<ItemInfo[]>([]);
  const [popularItems, setPopularItems] = useState<ItemInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  const temp = 36.5; 

  const getEmoji = (t: number) => {
    if (t < 36) return "🥶";
    if (t < 37.5) return "😀";
    return "🥵";
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const url = user?.id 
          ? `/api/buy-sell/${id}/like?username=${user.id}`
          : `/api/buy-sell/${id}/like`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setIsLiked(data.data.liked);
          setLikeCount(data.data.likeCount);
        }
      } catch (error) {
        console.error('좋아요 상태 조회 실패:', error);
      }
    };
    
    if (id) {
      fetchLikeStatus();
    }
  }, [id, user?.id]);

  const handleLikeToggle = async () => {
    if (!user?.id) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    setIsLikeLoading(true);
    
    const prevLiked = isLiked;
    const prevCount = likeCount;
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      const response = await fetch(`/api/buy-sell/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.id }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLiked(data.data.liked);
        setLikeCount(data.data.likeCount);
      } else {
        setIsLiked(prevLiked);
        setLikeCount(prevCount);
        alert(data.error || '좋아요 처리에 실패했습니다.');
      }
    } catch (error) {
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      console.error('좋아요 처리 오류:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLikeLoading(false);
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/buy-sell/${id}`);
        const data = await response.json();
        
        if (data.data) {
          setItem(data.data);
          
          if (data.data.seller_id) {
            const sellerResponse = await fetch(`/api/buy-sell/myitems?seller_id=${data.data.seller_id}`);
            const sellerData = await sellerResponse.json();
            console.log('Seller Items:', sellerData);
            const otherItems = (sellerData.data || [])
              .filter((i: ItemInfo) => i.seller_id === data.data.seller_id && i.item_id !== data.data.item_id)
              .slice(0, 4);
            setSellerItems(otherItems);
            
            const popular = (sellerData.data || [])
              .filter((i: ItemInfo) => i.seller_id !== data.data.seller_id)
              .slice(0, 8);
            // setPopularItems(popular);
          }
        }
      } catch (error) {
        console.error('아이템 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItem();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="p-8 flex flex-col justify-center items-center min-h-screen">
        <p className="text-gray-500 mb-4">상품을 찾을 수 없습니다.</p>
        <Button onClick={() => router.push('/used')}>목록으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div className="p-8">
        <div className=" flex gap-1 text-sm text-gray-400">
            <p><Link href="/">홈</Link></p>
            <p> {'>'} </p>
            <p><Link href="/used">중고거래</Link></p>
            <p> {'>'} </p>
            <p>{item.item_post_title}</p>
        </div>

        <div className="flex pt-3">
            <div className="w-2/5 pr-4">
                <div className="w-full p-4">
                    <img
                    src={item.item_post_images?.[0] || `${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                    alt={item.item_post_title}
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
                            <p className="text-lg font-bold leading-tight">{item.seller_username || item.seller_id}</p>
                            <p className="text-sm text-gray-600 leading-tight">
                                {item.item_post_location}
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
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs text-white rounded ${
                            item.item_status_id === 1 ? 'bg-green-500' : 
                            item.item_status_id === 2 ? 'bg-amber-500' : 'bg-gray-500'
                        }`}>
                            {ITEM_STATUS_LABEL[item.item_status_id as ItemStatusType]}
                        </span>
                    </div>
                    <p className="text-2xl font-bold mb-4">{item.item_post_title}</p>
                    <div className='flex gap-4 items-center'>
                        <p className="text-sm underline text-gray-300">{getCategoryName(item.category_id)}</p>
                        <p className='text-sm text-gray-300'>{getTimeAgo(item.item_post_date)}</p>
                    </div>
                    <p className="text-3xl font-bold my-6">
                        {item.item_post_price === 0 ? '나눔' : `₩ ${toPriceFormat(String(item.item_post_price))}`}
                    </p>
                    <p className="text-lg h-40 whitespace-pre-wrap">{item.item_post_description}</p>
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
                            <p className="text-xs text-gray-400 ">{likeCount}</p>
                        </div>
                        {/* <p>•</p>
                        <div className="flex gap-1">
                            <p className="text-xs text-gray-300 ">조회</p>
                            <p className="text-xs text-gray-400 ">{item.item_post_views_count || 0}</p>
                        </div> */}
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            size="lg" 
                            variant="ghost" 
                            className="mt-6 w-7/8 bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50"
                            onClick={async () => {
                                if (!user?.id) {
                                    alert('로그인이 필요합니다.');
                                    router.push('/login');
                                    return;
                                }
                                if (item?.item_status_id === ITEM_STATUS.RESERVED) {
                                    alert('이미 예약중인 상품입니다.');
                                    return;
                                }
                                if (item?.item_status_id === ITEM_STATUS.SOLD) {
                                    alert('이미 판매완료된 상품입니다.');
                                    return;
                                }
                                
                                setIsReserving(true);
                                try {
                                    const response = await fetch(`/api/buy-sell/${id}/status`, {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ status: ITEM_STATUS.RESERVED }),
                                    });
                                    
                                    if (response.ok) {
                                        alert('예약이 완료되었습니다!');
                                        setItem(prev => prev ? { ...prev, item_status_id: ITEM_STATUS.RESERVED } : null);
                                    } else {
                                        const data = await response.json();
                                        alert(data.error || '예약 처리에 실패했습니다.');
                                    }
                                } catch (error) {
                                    console.error('예약 처리 오류:', error);
                                    alert('예약 처리 중 오류가 발생했습니다.');
                                } finally {
                                    setIsReserving(false);
                                }
                            }}
                            disabled={isReserving || item?.item_status_id !== ITEM_STATUS.SELLING}
                        > 
                            {isReserving ? '처리중...' : item?.item_status_id === ITEM_STATUS.SELLING ? '구매하고싶어요!' : ITEM_STATUS_LABEL[item?.item_status_id as ItemStatusType]} 
                        </Button>
                        <Button 
                            size="lg" 
                            variant="ghost" 
                            className={`mt-6 w-1/8 ${isLiked ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'} text-white transition-colors`}
                            onClick={handleLikeToggle}
                            disabled={isLikeLoading}
                        > 
                            {isLiked ? '❤️' : '🤍'} 
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="w-full h-px bg-gray-100 my-4"></div>
        <div className="flex justify-between">
            <p className="text-xl">`{item.seller_username || item.seller_id}` 의 판매물품</p>
            <Link className="text-sm text-amber-500 after:content-['_>']" href="/used">더 구경하기</Link>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
            {sellerItems.length > 0 ? (
                sellerItems.map((sellerItem) => (
                    <CardAddLocation 
                        key={sellerItem.item_id}
                        image={sellerItem.item_post_images?.[0] || `${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                        title={sellerItem.item_post_title}
                        price={`${toPriceFormat(String(sellerItem.item_post_price))} 원`}
                        location={sellerItem.item_post_location}
                        uploadTime={sellerItem.item_post_date}
                        onClick={() => router.push(`/used/${sellerItem.item_id}`)}
                    />
                ))
            ) : (
                <p className="text-gray-400 col-span-4">판매자의 다른 상품이 없습니다.</p>
            )}
        </div>
        <div className="w-full h-px bg-gray-100 my-4"></div>
        <div className="flex justify-between">
            <p className="text-xl">인기매물</p>
            <Link className="text-sm text-amber-500 after:content-['_>']" href="/used">더 구경하기</Link>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-6 mt-4">
            {popularItems.length > 0 ? (
                popularItems.map((popItem) => (
                    <CardAddLocation 
                        key={popItem.item_id}
                        image={popItem.item_post_images?.[0] || `${process.env.NEXT_PUBLIC_MINIO_URL}/sampleImage.png`}
                        title={popItem.item_post_title}
                        price={`${toPriceFormat(String(popItem.item_post_price))} 원`}
                        location={popItem.item_post_location}
                        uploadTime={popItem.item_post_date}
                        onClick={() => router.push(`/used/${popItem.item_id}`)}
                    />
                ))
            ) : (
                <p className="text-gray-400 col-span-4">인기 매물이 없습니다.</p>
            )}
        </div>
        <div className="w-full mt-10">
            <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/subfooter.png`} alt="subfooter" className="w-full" />
        </div>
    </div>
  );
}
