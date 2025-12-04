"use client";

import * as React from "react";

export function FooterImpl(){

    return(
        <footer className="w-full bg-white">
            <div className="w-full h-px bg-gray-100 my-4"></div>
            <div className="flex">
            
                <div className="w-1/9 flow-root">
                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/icon.png`} alt="icon" width={40} height={40} className="object-contain m-4"/>
                    <img src={`${process.env.NEXT_PUBLIC_MINIO_URL}/contactUs.png`} alt="contactUs" width={72} height={24} className="object-contain m-4"/>
                </div>
                <div className="w-2/9 flow-root">
                    <div className="flow-root">
                        <p className="py-2 text-sm font-bold">회사</p>
                        <p className="text-sm">회사 소개</p>
                        <p className="text-sm">서비스 소개</p>
                        <p className="text-sm">블로그</p>
                        <p className="text-sm">채용</p>
                    </div>
                    <div className="flow-root">
                        <p className="py-2 text-sm font-bold">문의</p>
                        <p className="text-sm">IR</p>
                        <p className="text-sm">PR</p>
                        <p className="text-sm">고객센터</p>
                    </div>
                </div>
                <div className="w-2/9 flow-root">
                    <p className="py-2 text-sm font-bold">탐색</p>
                    <p className="text-sm">중고거래</p>
                    <p className="text-sm">알바</p>
                    <p className="text-sm">동네생활</p>
                    <p className="text-sm">채팅하기</p>
                </div>
                <div className="w-2/9 flow-root">
                    <p className="py-2 text-sm font-bold">비즈니스</p>
                    <p className="text-sm">당근 비즈니스</p>
                    <p className="text-sm">제휴 문의</p>
                    <p className="text-sm">광고 문의</p>
                </div>
                <div className="w-2/9 flex flex-col">
                    <p className="py-2 text-sm font-bold">Karrot</p>
                    <a className="text-sm text-black after:content-['_↗']" href="https://www.naver.com/">Canada</a>
                    <a className="text-sm text-black after:content-['_↗']" href="https://www.naver.com/">United States</a>
                    <a className="text-sm text-black after:content-['_↗']" href="https://www.naver.com/">United Kingdom</a>
                    
                </div>
                
            </div>
            <div className="w-full h-px bg-gray-100 my-4"></div>
            <div className="p-4">
                <div className="whitespace-pre-wrap text-sm text-gray-600">
                    {`(주) 당근마켓
대표 김용현, 황도연 | 사업자번호 123-45-00000
직업정보제공사업 신고번호 A12121212121212
통신판매업 신고번호 2025-1234-2211
호스팅 사업자 Amazon Web Service(AWS)
주소 서울특별시 구로구 디지털로 300, 10층 (당근서비스)
전화 1877-1234 | 고객문의 cd@daangnservice.com`}
                </div>
                <div className="flex pt-4 text-sm text-gray-600">
                    <p className="font-medium pr-3">이용약관</p>
                    <p className="font-medium px-3">개인정보처리방침</p>
                    <p className="font-medium px-3">운영정책</p>
                    <p className="font-medium px-3">위치기반서비스 이용약관</p>
                    <p className="font-medium px-3">이용자보호 비전과 계획</p>
                    <p className="font-medium px-3">청소년보호정책</p>
                </div>
            </div>
        </footer>
    )
}