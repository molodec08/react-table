import React from "react";

export const TableRow = (data) => {
    return (
      <tr key={data.data.id}>
      {Object.values(data.data).map(item => {
        return (
          <td key={item}>
            {item}
          </td>
        )
      })}
      </tr>
    )
}