export const checkAltValue = (htmlString: string, altValue: number) => {
  // DOMParser를 사용하여 문자열을 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 모든 이미지 요소를 선택
  const imgElements = doc.querySelectorAll("img");

  // 각 이미지 요소의 alt 값이 주어진 값과 일치하는지 확인
  for (const imgElement of imgElements) {
    if (Number(imgElement.alt) === altValue) {
      return true;
    }
  }

  return false;
};
