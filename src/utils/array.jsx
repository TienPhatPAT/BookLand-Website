export function createArray(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
}

export function groupResultsByMatchCount(results, searchString) {
  // Tách chuỗi searchString thành mảng các từ
  const searchWords = searchString.toLowerCase().split(/\s+/);

  // Tạo một đối tượng để lưu trữ các nhóm dựa trên số từ trùng khớp
  const groupedResults = {};

  // Lặp qua từng phần tử trong mảng results và nhóm chúng
  results.forEach((item) => {
    // console.log(item);
    const itemText = item.text.toLowerCase();
    // Đếm số từ trùng khớp
    const matchCount = searchWords.reduce((count, word) => {
      if (itemText.includes(word)) {
        return count + 1;
      }
      return count;
    }, 0);

    // Tạo key nhóm dựa trên số từ trùng khớp (vd: "match_2", "match_3", ...)
    const groupKey = "match_" + matchCount;

    // Thêm phần tử vào nhóm tương ứng
    if (!groupedResults[groupKey]) {
      groupedResults[groupKey] = [];
    }
    groupedResults[groupKey].push(item);
  });

  // Trả về kết quả nhóm
  return groupedResults;
}
