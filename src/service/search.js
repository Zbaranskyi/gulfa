export const search = (arr, searchValue) => {
   return arr.some(data => !searchValue || data.toLowerCase().includes(searchValue.toLowerCase()))
}
