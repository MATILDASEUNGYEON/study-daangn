"use client"

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ItemInfo, ITEM_STATUS_LABEL, ItemStatusType } from '@/types/item.types';
import { useRouter } from 'next/navigation';

export default function MyLikeList() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [items, setItems] = useState<ItemInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchLikedItems = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/buy-sell/likelist?username=${user.id}`);
                const result = await response.json();
                
                if (response.ok) {
                    setItems(result.data || []);
                } else {
                    setError(result.error || '관심상품 조회에 실패했습니다.');
                }
            } catch {
                setError('관심상품 조회 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchLikedItems();
    }, [user?.id]);

    const handleUnlike = async (itemId: number) => {
        if (!user?.id) return;

        try {
            const response = await fetch(`/api/buy-sell/${itemId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user.id }),
            });

            if (response.ok) {
                setItems(prev => prev.filter(item => item.item_id !== itemId));
            } else {
                alert('좋아요 취소에 실패했습니다.');
            }
        } catch {
            alert('좋아요 취소 중 오류가 발생했습니다.');
        }
    };

    const getStatusBadgeColor = (statusId: number) => {
        switch (statusId) {
            case 1: // SELLING
                return 'bg-green-100 text-green-800';
            case 2: // RESERVED
                return 'bg-yellow-100 text-yellow-800';
            case 3: // SOLD
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('ko-KR') + '원';
    };

    const handleItemClick = (itemId: number) => {
        router.push(`/used/${itemId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            </div>
        );
    }

    if (!user?.id) {
        return (
            <div className="text-center text-gray-500 py-10">
                로그인이 필요합니다.
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {error}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                관심 상품이 없습니다.
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-6">관심상품 내역</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <div 
                        key={item.item_id} 
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {/* 이미지 */}
                        <div 
                            className="w-full h-48 cursor-pointer"
                            onClick={() => handleItemClick(item.item_id)}
                        >
                            {item.item_post_images && item.item_post_images.length > 0 ? (
                                <img 
                                    src={item.item_post_images[0]} 
                                    alt={item.item_post_title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">이미지 없음</span>
                                </div>
                            )}
                        </div>

                        {/* 상품 정보 */}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 
                                    className="font-semibold text-lg cursor-pointer hover:text-orange-500 truncate flex-1"
                                    onClick={() => handleItemClick(item.item_id)}
                                >
                                    {item.item_post_title}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusBadgeColor(item.item_status_id)}`}>
                                    {ITEM_STATUS_LABEL[item.item_status_id as ItemStatusType] || '알 수 없음'}
                                </span>
                            </div>
                            <p className="text-orange-500 font-bold mb-1">{formatPrice(item.item_post_price)}</p>
                            <p className="text-sm text-gray-500 mb-3">{item.item_post_location}</p>
                            
                            <button
                                onClick={() => handleUnlike(item.item_id)}
                                className="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                관심 해제
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
