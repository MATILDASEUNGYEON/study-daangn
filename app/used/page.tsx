'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
import { SelectButton } from '@/components/ui/selectbutton';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { List, ListItem } from '@/components/ui/list';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { toPriceFormat } from '@/utils/format';
import {
    setUserAddress,
    updateDong,
    setIsTrade,
    setItemCategory,
    setPriceButton,
    setMinPrice,
    setMaxPrice,
    setKeyword,
    resetFilter,
} from '@/lib/usedFilterSlice';
import { useRouter } from 'next/navigation';
import { useUserLocation } from '@/hooks/useUserLocation';
import { UserAddress } from '@/hooks/useUserLocation';
import { Modal } from '@/components/ui/modal';
import {
    fetchDongListByAddressMain,
    DongInfo,
} from '@/lib/services/location.service';
import { ItemInfo, ItemStatusType } from '@/types/item.types';
import { useCategories } from '@/hooks/useCategories';

import Image from 'next/image';
import locationIcon from '@/assets/icons/pingIcon.png';
import searchIcon from '@/assets/icons/searchIcon.png';
import composeIcon from '@/assets/icons/composeIcon.png';
import plusIcon from '@/assets/icons/plusIcon.png';
import subfooter from '@/assets/images/subfooter.png';
import sampleImage from '@/assets/images/sampleImage.png';

export default function UsedPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.usedFilter);
    const userAddress = useSelector(
        (state: RootState) => state.usedFilter.userAddress,
    );
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const { categories } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dongList, setDongList] = useState<DongInfo[]>([]);
    const [items, setItems] = useState<ItemInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const recommendedLocations: ListItem[] = [
        { id: 1, label: '인천광역시,연수구,송도동' },
        { id: 2, label: '서울특별시,강남구,역삼동' },
        { id: 3, label: '경상남도,양산시,물금읍' },
        { id: 4, label: '경기도,화성시,봉담읍' },
        { id: 5, label: '서울특별시,서초구,서초동' },
        { id: 6, label: '서울특별시,마포구,망원동' },
        { id: 7, label: '경기도,양주시,옥정동' },
        { id: 8, label: '서울특별시,관악구,신림동' },
        { id: 9, label: '충청남도,천안시 서북구,불당동' },
        { id: 10, label: '대전광역시,유성구,봉명동' },
    ];

    const handleLocationSelect = (item: ListItem) => {
        const parts = item.label.split(',');
        if (parts.length >= 3) {
            const city = parts[0];
            const borough = parts[1];
            const dong = parts[2];
            dispatch(
                setUserAddress({
                    city,
                    borough,
                    dong,
                    main: `${city} ${borough}`,
                    full: item.label,
                }),
            );
            setIsModalOpen(false);
        }
    };

    const handleLocationDetect = useCallback(
        (address: UserAddress) => {
            if (address) {
                dispatch(setUserAddress(address));
            }
        },
        [dispatch],
    );

    useUserLocation(handleLocationDetect);

    useEffect(() => {
        const loadDongList = async () => {
            if (userAddress?.main) {
                const dongs = await fetchDongListByAddressMain(
                    userAddress.main,
                );
                setDongList(dongs);
            }
        };
        loadDongList();
    }, [userAddress?.main]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/buy-sell/getitems');
                const data = await response.json();
                console.log('아이템 목록:', data);
                setItems(data.data || []);
            } catch (error) {
                console.error('아이템 조회 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);
    return (
        <div>
            <div className="flex w-full items-center gap-8 pb-10 justify-center">
                <div
                    className="relative flex items-start self-start bg-black rounded-full px-3 py-2 cursor-pointer h-12"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Image
                        src={locationIcon}
                        alt="locationIcon"
                        width={20}
                        height={20}
                        className="object-contain mr-2 pointer-events-none items-center self-center"
                    />
                    <span className="self-center text-white text-sm pr-5">
                        {userAddress?.dong || '위치 선택'}
                    </span>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-4 text-white"
                    />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="지역 변경"
                >
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="지역이나 동네로 검색하기"
                            icon={
                                <Image
                                    src={searchIcon}
                                    alt="searchIcon"
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />
                            }
                        />
                        <Button
                            variant="ghost"
                            size="full"
                            className="bg-amber-100"
                        >
                            <Image
                                src={composeIcon}
                                alt="composeIcon"
                                width={20}
                                height={20}
                                className="object-contain mr-2"
                            />
                            <p className="text-amber-600">
                                현재 내 위치 사용하기
                            </p>
                        </Button>
                        <p className="text-xs text-blue-500 font-bold">추천</p>
                        <List
                            items={recommendedLocations}
                            onItemClick={handleLocationSelect}
                        />
                    </div>
                </Modal>
                <div className="flow-root">
                    <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2 w-[900px] h-12">
                        <div className="relative min-w-[90px] pointer-events-auto">
                            <Select
                                options={['중고거래', '알바', '동네생활']}
                            />
                        </div>
                        <div className="h-5 w-px bg-gray-300 mx-3"></div>

                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-grow bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                            value={filters.keyword}
                            onChange={(e) =>
                                dispatch(setKeyword(e.target.value))
                            }
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
            <div className="py-8">
                <div className="flex gap-1 text-sm text-gray-400">
                    <p>
                        <Link href="/">홈</Link>
                    </p>
                    <p> {'>'} </p>
                    <p>
                        <Link href="/used">중고거래</Link>
                    </p>
                </div>
                <div className="flex">
                    <p className="text-2xl font-bold">
                        {userAddress?.main} {userAddress?.dong || '내 동네'}{' '}
                        중고거래
                    </p>
                    <Button
                        variant="ghost"
                        className="bg-amber-500 hover:bg-amber-600 ml-auto"
                        onClick={() => {
                            if (!isLogin) {
                                alert('로그인이 필요한 서비스입니다.');
                                return;
                            }
                            router.push('/used/add');
                        }}
                    >
                        <div className="flex">
                            <Image
                                src={plusIcon}
                                alt="plusIcon"
                                width={20}
                                height={20}
                                className="object-contain mr-2"
                            />
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
                                onChange={(checked) =>
                                    dispatch(setIsTrade(checked))
                                }
                            />

                            <div className="flex-flow pt-4">
                                <p className="text-sm font-bold">위치</p>
                                <p className="text-sm text-gray-400">
                                    {userAddress?.main}
                                </p>
                                {dongList.length > 0 ? (
                                    dongList.map((dong) => (
                                        <Checkbox
                                            key={dong.name}
                                            id={`dong-${dong.name}`}
                                            name={`dong-${dong.name}`}
                                            label={dong.displayName}
                                            checked={
                                                filters.location === dong.name
                                            }
                                            onChange={(checked) => {
                                                const newDong = checked
                                                    ? dong.name
                                                    : '';
                                                dispatch(updateDong(newDong));
                                            }}
                                        />
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        동네 정보를 불러올 수 없습니다.
                                    </p>
                                )}
                            </div>
                            <div className="flex-flow pt-4 ">
                                <p className="text-sm font-bold pb-3">
                                    카테고리
                                </p>
                                {categories.map((category) => (
                                    <Checkbox
                                        key={category.id}
                                        id={`category-${category.id}`}
                                        name={`category-${category.id}`}
                                        label={category.text}
                                        checked={
                                            filters.itemCategory ===
                                            category.text
                                        }
                                        onChange={(checked) =>
                                            dispatch(
                                                setItemCategory(
                                                    checked
                                                        ? category.text
                                                        : '',
                                                ),
                                            )
                                        }
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 pt-4 items-start">
                                <p className="text-sm font-bold pb-3">가격</p>

                                <SelectButton
                                    label="나눔"
                                    isSelected={filters.priceButton === '나눔'}
                                    onClick={() =>
                                        dispatch(
                                            setPriceButton(
                                                filters.priceButton === '나눔'
                                                    ? null
                                                    : '나눔',
                                            ),
                                        )
                                    }
                                />
                                <SelectButton
                                    label="5,000원 이하"
                                    isSelected={
                                        filters.priceButton === '5,000원 이하'
                                    }
                                    onClick={() =>
                                        dispatch(
                                            setPriceButton(
                                                filters.priceButton ===
                                                    '5,000원 이하'
                                                    ? null
                                                    : '5,000원 이하',
                                            ),
                                        )
                                    }
                                />
                                <SelectButton
                                    label="10,000원 이하"
                                    isSelected={
                                        filters.priceButton === '10,000원 이하'
                                    }
                                    onClick={() =>
                                        dispatch(
                                            setPriceButton(
                                                filters.priceButton ===
                                                    '10,000원 이하'
                                                    ? null
                                                    : '10,000원 이하',
                                            ),
                                        )
                                    }
                                />
                                <SelectButton
                                    label="20,000원 이하"
                                    isSelected={
                                        filters.priceButton === '20,000원 이하'
                                    }
                                    onClick={() =>
                                        dispatch(
                                            setPriceButton(
                                                filters.priceButton ===
                                                    '20,000원 이하'
                                                    ? null
                                                    : '20,000원 이하',
                                            ),
                                        )
                                    }
                                />

                                <div className="flex gap-3 items-center">
                                    <Input
                                        placeholder="0"
                                        className="text-gray-300 text-left"
                                        value={filters.minPrice}
                                        onChange={(e) =>
                                            dispatch(
                                                setMinPrice(e.target.value),
                                            )
                                        }
                                    />
                                    <p className="text-sm text-black">-</p>
                                    <Input
                                        placeholder="최대"
                                        className="text-gray-300 text-left"
                                        value={filters.maxPrice}
                                        onChange={(e) =>
                                            dispatch(
                                                setMaxPrice(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-3">
                            <p className="text-sm font-bold text-gray-300 underline">
                                적용하기
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-flow w-5/6">
                    <div className="py-5">
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
                                    가격: {filters.minPrice || '0'}원 ~{' '}
                                    {filters.maxPrice || '최대'}원
                                </span>
                            )}
                            {filters.keyword && (
                                <span className="px-3 py-1 bg-purple-100 rounded-full text-sm">
                                    검색어: {filters.keyword}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {isLoading ? (
                            <p className="text-gray-500">로딩 중...</p>
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <Card
                                    key={item.item_id}
                                    image={
                                        item.item_images?.[0] || sampleImage.src
                                    }
                                    title={item.item_title}
                                    price={toPriceFormat(
                                        String(item.item_price),
                                    )}
                                    status={
                                        item.item_status_id as ItemStatusType
                                    }
                                    location={item.item_location}
                                    onClick={() =>
                                        router.push(`/used/${item.item_id}`)
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">
                                등록된 상품이 없습니다.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full mt-10">
                <Image src={subfooter} alt="subfooter" className="w-full" />
            </div>
        </div>
    );
}
