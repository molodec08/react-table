import React, {useEffect, useState} from 'react';
import s from './Table.module.css';
import { Select } from '../Select';
import { TableBody } from './TableBody';

import { Sorting } from './Sorting';
import { Pagination } from './Pagination';
import { Filter } from './Filter';

export const Table = ({ data, sizeTable, filters }) => {
  const [tableHead, setTableHead] = useState([]);

  const [size, setSize] = useState(10);
  const settingsSizeTable = sizeTable.settings;
  const optionsSizeTable = sizeTable.options;

  const { filteredItem, requestFilter } = Filter(data)
  const { items, requestSort} = Sorting(filteredItem);
  const { paginatedItem, nextPage, prevPage, page, hasNextPage, changeSize } = Pagination(items);


  const handleChangeSize = e => {
    changeSize(e.target.value);
    setSize(e.target.value);
  }

  const filteredName = (e) => {
    requestFilter(e.target.value, e.target.name);
  }

  useEffect(() => {
    if (data.length) {
      setTableHead(Object.keys(data[0]));
    }
  }, [data]);

  return (
    <>
      <div className="filters">
        { filters.map(filter => {
          const setting = filter.settings;
          const options = filter.options;
          if (setting.type === 'input') {
            return (
              <input key={setting.name}
                onChange={filteredName}
                type="text"
                name={setting.name}
                defaultValue={''}
                title={setting.title}
                placeholder = {setting.placeholder}
              />
            )
          } else {
            return (
              <Select key={setting.name}
                title={setting.title}
                name={setting.name}
                options={options}
                changeHandler = {filteredName}
                placeholder = {setting.placeholder}
                className={s.select}
              />
            )
          }

        })}
      </div>

      <table className={s.table}>
        <thead>
        {
          <tr>
          { tableHead.map((head, i) => {
              return (
                <th key={i} onClick={() => requestSort({head})} >
                  {head}
                </th>
              )
            }
          )}
          </tr>
        }
        </thead>
        <TableBody data={paginatedItem}/>
      </table>
      <button
        onClick={() => prevPage()}
        disabled={page === 1}
        className="waves-effect waves-light btn-small"
      >
        Назад
      </button>
      <Select
        title={settingsSizeTable.title}
        name={settingsSizeTable.name}
        options = {optionsSizeTable}
        value = {size}
        changeHandler = {handleChangeSize}
        placeholder = {settingsSizeTable.placeholder}
        className={s.select}
      />
      <button
        className="waves-effect waves-light btn-small"
        disabled={hasNextPage}
        onClick={() => nextPage()}
      >
        Вперёд
      </button>
    </>
  )
}