import React from 'react';

const TableCell = ({ row, column }) => {
  if (column.Cell && column.accessor) {
    return <td>{column.Cell(row)}</td>
  } else if (column.accessor) {
    return <td>{row[column.accessor]}</td>
  } else return null;
};

const Table = ({ columns, rows }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, idx) => (
            <th key={JSON.stringify(column)}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr>
            {columns.map((column) => (
              <TableCell column={column} row={row} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
