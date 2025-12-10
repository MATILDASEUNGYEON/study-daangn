import { useState, useEffect, useMemo } from 'react';

export interface Category {
    id: number;
    text: string;
}

// 카테고리 캐시 (앱 전체에서 공유)
let categoryCache: Category[] | null = null;

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>(categoryCache || []);
    const [isLoading, setIsLoading] = useState(!categoryCache);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 이미 캐시가 있으면 API 호출 스킵
        if (categoryCache) {
            setCategories(categoryCache);
            return;
        }

        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/buy-sell/category');
                const data = await response.json();
                categoryCache = data.categories;
                setCategories(data.categories);
            } catch (err) {
                console.error('카테고리 조회 실패:', err);
                setError('카테고리를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // id로 카테고리 텍스트 빠르게 조회하기 위한 Map
    const categoryMap = useMemo(() => {
        return new Map(categories.map(cat => [cat.id, cat.text]));
    }, [categories]);

    // id로 카테고리 이름 가져오기
    const getCategoryName = (categoryId: number): string => {
        return categoryMap.get(categoryId) || '기타';
    };

    return {
        categories,
        categoryMap,
        getCategoryName,
        isLoading,
        error
    };
}

// 카테고리 캐시 초기화 (필요시)
export function clearCategoryCache() {
    categoryCache = null;
}
