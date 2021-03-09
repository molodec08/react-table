import { useMemo,useState } from "react";

export const Filter = (items) => {
  const [filter, setFilter] = useState(null);

  let filterableItem = [...items];

  const filterItems = useMemo(() => {

    if (filter !== null) {
      items = filterableItem.filter(item => {
        return item[filter.key]
          .toUpperCase()
          .indexOf(filter.value.toUpperCase()) !== -1
      });
    }
  }, [items, filter])

  const requestFilter = (value, key) => {
    setFilter({value, key})
  }

  return { filteredItem: items, requestFilter, filterItems }
}