import { TableRow } from './TableRow';
import React from "react";

export const TableBody = (data) => {
  return (
    <tbody>
    { data.data.map(item => {
      return (
        <TableRow data={item} key={item.id} />
      )
    })}
    </tbody>
  )
}