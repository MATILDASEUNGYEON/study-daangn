export interface DongBoundary {
  name: string;
  boundingBox: { south: number; north: number; west: number; east: number };
  geojson: GeoJSON.Geometry | null;
}

export interface DongInfo {
  name: string;
  displayName: string;
}

interface OverpassElement {
  tags?: {
    name?: string;
    "name:ko"?: string;
  };
}

/**
 * 주소 main (예: "서울특별시 구로구")을 입력받아 해당 구의 동 리스트를 가져옵니다.
 * @param addressMain 시/도 + 구/군 (예: "서울특별시 구로구")
 */
export async function fetchDongListByAddressMain(
  addressMain: string
): Promise<DongInfo[]> {
 
  const parts = addressMain.trim().split(" ");
  if (parts.length < 2) {
    console.error("주소 형식이 올바르지 않습니다:", addressMain);
    return [];
  }

  const city = parts[0];
  const borough = parts[1];

  const url = `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
    city
  )}+${encodeURIComponent(borough)}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "DaangnClone (study-project@example.com)",
      },
    });

    const data = await response.json();
    if (!data || data.length === 0) return [];

    // Overpass API를 사용하여 해당 구 내의 동 목록 가져오기
    const dongList = await fetchDongListFromOverpass(city, borough);
    
    return dongList;
  } catch (error) {
    console.error("동 리스트 조회 실패:", error);
    return [];
  }
}

/**
 * Overpass API를 사용하여 특정 구의 동 목록을 가져옵니다.
 * @param city 시/도
 * @param borough 구/군
 */
async function fetchDongListFromOverpass(
  city: string,
  borough: string
): Promise<DongInfo[]> {
  // Overpass API 쿼리 - 행정구역 레벨 10 (동/읍/면)
  const query = `
    [out:json][timeout:25];
    area["name"="${city}"]->.city;
    area["name"="${borough}"]->.borough;
    (
      relation["admin_level"="10"](area.borough);
      relation["admin_level"="9"](area.borough);
      relation["admin_level"="8"]["name"~"동$|리$"](area.borough);
    );
    out tags;
  `;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    const data = await response.json();

    if (!data || !data.elements || data.elements.length === 0) {
      return getDefaultDongList(city, borough);
    }

    const dongList: DongInfo[] = data.elements
      .filter((el: OverpassElement) => el.tags && el.tags.name)
      .map((el: OverpassElement) => ({
        name: el.tags!.name!,
        displayName: el.tags!["name:ko"] || el.tags!.name!,
      }))
      .filter(
        (dong: DongInfo, index: number, self: DongInfo[]) =>
          index === self.findIndex((d) => d.name === dong.name)
      )
      .sort((a: DongInfo, b: DongInfo) => a.name.localeCompare(b.name, "ko"));

    return dongList.length > 0 ? dongList : getDefaultDongList(city, borough);
  } catch (error) {
    console.error("Overpass API 호출 실패:", error);
    return getDefaultDongList(city, borough);
  }
}

function getDefaultDongList(city: string, borough: string): DongInfo[] {
  const defaultDongMap: Record<string, string[]> = {
    "서울특별시 구로구": [
      "가리봉동",
      "개봉동",
      "고척동",
      "구로동",
      "궁동",
      "신도림동",
      "오류동",
      "온수동",
      "천왕동",
      "항동",
    ],
    "서울특별시 금천구": [
      "가산동",
      "독산동",
      "시흥동",
    ],
    "서울특별시 강남구": [
      "개포동",
      "논현동",
      "대치동",
      "도곡동",
      "삼성동",
      "세곡동",
      "수서동",
      "신사동",
      "압구정동",
      "역삼동",
      "율현동",
      "일원동",
      "자곡동",
      "청담동",
    ],
    "서울특별시 서초구": [
      "내곡동",
      "반포동",
      "방배동",
      "서초동",
      "신원동",
      "양재동",
      "염곡동",
      "우면동",
      "원지동",
      "잠원동",
    ],
    "서울특별시 마포구": [
      "공덕동",
      "노고산동",
      "대흥동",
      "도화동",
      "동교동",
      "마포동",
      "망원동",
      "상수동",
      "서교동",
      "성산동",
      "신수동",
      "신정동",
      "연남동",
      "용강동",
      "중동",
      "창전동",
      "합정동",
      "현석동",
    ],
    "인천광역시 연수구": [
      "동춘동",
      "선학동",
      "송도동",
      "연수동",
      "옥련동",
      "청학동",
    ],
  };

  const key = `${city} ${borough}`;
  const dongs = defaultDongMap[key] || [];

  return dongs.map((name) => ({
    name,
    displayName: name,
  }));
}
