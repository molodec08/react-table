import {useState, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook";
import { Table } from '../component/Table/Table'

export const TablePage = () => {
  const {request} = useHttp();

  const characters = async() => {
    try {
      const data = await request('https://rickandmortyapi.com/api/character/?page=1','GET', null);
      const data2 = await request('https://rickandmortyapi.com/api/character/?page=2','GET', null);
      const data3 = await request('https://rickandmortyapi.com/api/character/?page=3','GET', null);
      return data.results.concat(data2.results, data3.results);
    } catch (e) {}
  }
  const [data, setData] = useState([]);
  // console.log(Object.keys(data[0]));

  let filters = [];

  const sizeTable = {
    settings: { name: 'size', title: 'Размер таблицы', placeholder: 'Выберите размер таблицы'},
    options: [
      { id: 1, value: 10, label: 10 },
      { id: 2, value: 20, label: 20 },
      { id: 3, value: 30, label: 30 },
      { id: 4, value: 40, label: 40 },
      { id: 5, value: 50, label: 50 }
    ]
  };

  const nameFilter = {
    settings: {type: 'input', name: 'name', title: 'Имя', placeholder: 'Напишите имя'}
  }

  const statusFilter = {
    settings: { type: 'select', name: 'status', title: 'status', placeholder: 'Select status'},
    options: [
      { id: 1, value: 'alive', label: 'Alive' },
      { id: 2, value: 'dead', label: 'Dead' },
      { id: 3, value: 'unknown', label: 'unknown' }
    ]
  };

  const speciesFilter = {
    settings: {type: 'select', name: 'species', title: 'species', placeholder: 'Select species'},
    options: [
      {id: 1, value: 'alien', label: 'Alien'},
      {id: 2, value: 'animal', label: 'Animal'},
      {id: 3, value: 'human', label: 'Human'},
      {id: 4, value: 'mythological creature', label: 'Mythological Creature'},
      {id: 5, value: 'poopybutthole', label: 'Poopybutthole'},
      {id: 6, value: 'unknown', label: 'unknown'}
    ]
  };

  filters.push(nameFilter, statusFilter, speciesFilter);

  useEffect(() => {
    characters().then(r => {
      let result = [];
      r.forEach(el => {
        result.push({id: el.id, name: el.name, status: el.status, species: el.species});
      });
      setData(result)
    })
  }, []);

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <Table data={ data } sizeTable = { sizeTable } filters = { filters }/>
      </div>
    </div>
  );
}
