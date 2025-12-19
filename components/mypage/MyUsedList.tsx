"use client"

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ItemInfo, ITEM_STATUS, ITEM_STATUS_LABEL, ItemStatusType } from '@/types/item.types';
import {toPriceFormat,getTimeAgo} from '@/utils/format';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

export default function MyUsedList() {
    const user = useSelector((state: RootState) => state.auth.user);
    const [items, setItems] = useState<ItemInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchMyItems = async () => {
            if (!user?.username) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/buy-sell/myitems?username=${user.username}`);
                const result = await response.json();
                
                if (response.ok) {
                    setItems(result.data || []);
                } else {
                    setError(result.error || '아이템 조회에 실패했습니다.');
                }
            } catch {
                setError('아이템 조회 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, [user?.username]);

    const handleStatusChange = async (itemId: number, newStatus: number) => {
        try {
            const response = await fetch(`/api/buy-sell/${itemId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setItems(prev => 
                    prev.map(item => 
                        item.item_id === itemId 
                            ? { ...item, item_status_id: newStatus }
                            : item
                    )
                );
            } else {
                alert('상태 변경에 실패했습니다.');
            }
        } catch {
            alert('상태 변경 중 오류가 발생했습니다.');
        }
    };

    const handleApprove = async (itemId: number) => {
        if (confirm('판매를 승인하시겠습니까? 상태가 "판매완료"로 변경됩니다.')) {
            await handleStatusChange(itemId, ITEM_STATUS.SOLD);
        }
    };

    const handleCancel = async (itemId: number) => {
        if (confirm('예약을 취소하시겠습니까? 상태가 "판매중"으로 변경됩니다.')) {
            await handleStatusChange(itemId, ITEM_STATUS.SELLING);
        }
    };

    const getStatusBadgeColor = (statusId: number) => {
        switch (statusId) {
            case ITEM_STATUS.SELLING:
                return 'bg-green-100 text-green-800';
            case ITEM_STATUS.RESERVED:
                return 'bg-yellow-100 text-yellow-800';
            case ITEM_STATUS.SOLD:
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            </div>
        );
    }

    if (!user?.user_id) {
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
                등록된 중고거래 상품이 없습니다.
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-6">내 중고거래 내역</h2>
            <div className="grid gap-4">
                {items.map((item) => (
                    <div 
                        key={item.item_id} 
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                        <div 
                            className="w-24 h-24 flex-shrink-0 cursor-pointer"
                            onClick={() => router.push(`/used/${item.item_id}`)}
                        >
                            {item.item_images && item.item_images.length > 0 ? (
                                <Image 
                                    src={item.item_images[0]} 
                                    alt={item.item_title}
                                    width={50}
                                    height={50}
                                    unoptimized={typeof item.item_images?.[0] === 'string'}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">이미지 없음</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-grow">
                            <h3 
                                className="font-semibold text-lg cursor-pointer hover:text-orange-500"
                                onClick={() => router.push(`/used/${item.item_id}`)}
                            >
                                {item.item_title}
                            </h3>
                            <p className="text-orange-500 font-bold">{toPriceFormat(String(item.item_price))}원</p>
                            <p className="text-sm text-gray-500">{item.item_location}</p>
                            <p className="text-xs text-gray-400">{getTimeAgo(item.item_date)}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(item.item_status_id)}`}>
                                {ITEM_STATUS_LABEL[item.item_status_id as ItemStatusType] || '알 수 없음'}
                            </span>
                            
                            {item.item_status_id === ITEM_STATUS.RESERVED ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleApprove(item.item_id)}
                                        className="text-sm px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                    >
                                        승인
                                    </button>
                                    <button
                                        onClick={() => handleCancel(item.item_id)}
                                        className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        취소
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
