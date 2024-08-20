export function formatMoney(number, decimalPlaces) {
  let parts = Number(number).toFixed(decimalPlaces).split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return parts.join(",");
}

export function abbreviateNumber(num, decimals = 1) {
  const abbreviations = [
    { value: 1e15, symbol: "Q" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];

  for (let i = 0; i < abbreviations.length; i++) {
    if (num >= abbreviations[i].value) {
      return (
        (num / abbreviations[i].value).toFixed(decimals).replace(/\.0+$/, "") +
        abbreviations[i].symbol
      );
    }
  }
  return num?.toString();
}

// export function highlightSubstring(parentString, substring) {
//   if (!substring) return parentString;

//   const parts = parentString.split(new RegExp(`(${substring})`, "gi"));
//   return parts.map((part, index) =>
//     part.toLowerCase() === substring.toLowerCase() ? (
//       <span className="highlight" key={index}>
//         {part}
//       </span>
//     ) : (
//       part
//     )
//   );
// }

export function highlightSubstring(parentString, substring) {
  if (!substring) return parentString;

  // Tạo biểu thức chính quy từ chuỗi con
  const regex = new RegExp(`(${substring})`, "gi");

  // Chia chuỗi cha thành mảng các phần
  const parts = parentString.split(regex);

  // Lặp qua các phần và bọc từ khóa trùng khớp trong thẻ <b>
  return parts.map((part, index) =>
    part.toLowerCase() === substring.toLowerCase() ? (
      <span className="highlight" key={index}>
        {part}
      </span>
    ) : (
      part
    )
  );
}
