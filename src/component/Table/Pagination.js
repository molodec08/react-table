import { useState } from "react";

export const Pagination = (items) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState([10]);

  const startIndex = () => {
    return (page-1) * size
  }

  const endIndex = () => {
    return page * size
  }
  console.log(items);
  const nextPage = () => {
    setPage(page+1);
  }

  const prevPage = () => {
    setPage(page-1);
  }

  const hasNextPage = items.length <= endIndex();

  const changeSize = (value) => {
    setSize(value);
  }

  let paginatedItem = items.slice(startIndex(), endIndex());

  return { paginatedItem: paginatedItem, nextPage, prevPage, page, hasNextPage, changeSize }
}