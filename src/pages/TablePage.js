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
      setTbody(data.results.concat(data2.results, data3.results));
    } catch (e) {}
  }
  const [tbody, setTbody] = useState([]);

  useEffect(() => {
    characters()
  }, []);

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <Table tbody={ tbody }/>
      </div>
    </div>
  );
}
