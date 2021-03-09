import { useMemo, useRef, useState} from "react";

export const Filter = (items) => {
  const [filter, setFilter] = useState(null);

  let filteredItem = useRef();

  const filterItems = useMemo(() => {
    if (filter !== null) {
      filteredItem.current = filteredItem.current.filter(item => {
        return item[filter.key]
          .toUpperCase()
          .indexOf(filter.value.toUpperCase()) !== -1
      });
    }
  }, [filter])

  const requestFilter = (value, key) => {
    filteredItem.current = [...items];
    setFilter({value, key})
  }

  return { filteredItem: filteredItem.current ? filteredItem.current : items, requestFilter, filterItems }
}