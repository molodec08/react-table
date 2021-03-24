import {useMemo, useState} from "react";

export const Sorting = (items) => {
  const [sortField, setSortField] = useState(null);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortField !== null) {
      sortableItems.sort((a,b) => {
        if (a[sortField.key] < b[sortField.key]) {
          return sortField.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortField.key] > b[sortField.key]) {
          return sortField.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortField]);

  const requestSort = (key) => {
    key = Object.values(key)[0];
    let direction = 'ascending';
    if (sortField && sortField.key === key && sortField.direction === 'ascending') {
      direction = 'descending';
    }
    setSortField({key, direction});
  }

  return { items: sortedItems, requestSort, sortField }
}