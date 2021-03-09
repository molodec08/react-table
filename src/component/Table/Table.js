import React, { useState } from 'react';
import s from './Table.module.css';
import { Select } from '../Select';

import { Sorting } from './Sorting';
import { Pagination } from './Pagination';
import { Filter } from './Filter';

export const Table = ({ tbody }) => {
  const [size, setSize] = useState(10);
  const { filteredItem, requestFilter } = Filter(tbody)
  const { items, requestSort} = Sorting(filteredItem);
  const { paginatedItem, nextPage, prevPage, page, hasNextPage, changeSize } = Pagination(items);

  const handleChange = e => {
    changeSize(e.target.value);
    setSize(e.target.value);
  }

  const filteredName = (e) => {
    requestFilter(e.target.value, e.target.name);
  }

  const sizeOptions = [
    { id: 1, value: 10, label: 10 },
    { id: 2, value: 20, label: 20 },
    { id: 3, value: 30, label: 30 },
    { id: 4, value: 40, label: 40 },
    { id: 5, value: 50, label: 50 }
  ];

  const statusOptions = [
    { id: 1, value: 'alive', label: 'Alive' },
    { id: 2, value: 'dead', label: 'Dead' },
    { id: 3, value: 'unknown', label: 'unknown' }
  ];

  const speciedOptions = [
    { id: 1, value: 'alien', label: 'Alien' },
    { id: 2, value: 'animal', label: 'Animal' },
    { id: 3, value: 'human', label: 'Human' },
    { id: 4, value: 'mythological creature', label: 'Mythological Creature' },
    { id: 5, value: 'poopybutthole', label: 'Poopybutthole' },
    { id: 6, value: 'unknown', label: 'unknown' }
  ];

  return (
    <>
      <input
        onChange={filteredName}
        type="text"
        name={'name'}
        title={'Имя'}
        placeholder = {'Напишите имя'}
      />
      <Select
        title={'Status'}
        name={'status'}
        options={statusOptions}
        changeHandler = {filteredName}
        placeholder = {'Select status'}
        className={s.select}
      />
      <Select
        title={'Species'}
        name={'species'}
        options = {speciedOptions}
        changeHandler = {filteredName}
        placeholder = {'Select species'}
        className={s.select}
      />
      <table className={s.table}>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')} >
              id
            </th>
            <th onClick={() => requestSort('name')}>
              Name
            </th>
            <th onClick={() => requestSort('status')}>
              Status
            </th>
            <th onClick={() => requestSort('species')}>
              Species
            </th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
        { paginatedItem.map(character => {
          return (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>
                <img
                  className={s.avatar}
                  src={character.image}
                  alt={character.name}
                />
              </td>
            </tr>
          )})
        }
        </tbody>
      </table>
      <a
        className="waves-effect waves-light btn-small"
        onClick={() => prevPage()}
        disabled={page === 1}
      >
        Назад
      </a>
      <Select
        title={'Размер таблицы'}
        name={'size'}
        options = {sizeOptions}
        value = {size}
        changeHandler = {handleChange}
        placeholder = {'Выберите размер таблицы'}
        className={s.select}
      />
      <a
        className="waves-effect waves-light btn-small"
        disabled={hasNextPage}
        onClick={() => nextPage()}
      >
        Вперёд
      </a>
    </>
  )
}