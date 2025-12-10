export const toPriceFormat = (input: string) => {
  const numeric = input.replace(/[^0-9]/g, "");
  return numeric ? numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};

export const getTimeAgo = (dateString: string | Date | null | undefined) => {
  if (!dateString) return "";
  
  const normalizedDate = typeof dateString === 'string' 
    ? dateString.replace(' ', 'T') 
    : dateString;
  
  const date = new Date(normalizedDate);
  
  // 유효하지 않은 날짜 체크
  if (isNaN(date.getTime())) return "";
  
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 30) return `${diffDay}일 전`;
  
  // 30일 이상이면 날짜 표시
  return date.toLocaleDateString('ko-KR');
};