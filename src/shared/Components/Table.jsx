import MUITable from '@material-ui/core/Table';
import MUITableHead from '@material-ui/core/TableHead';
import MUITableBody from '@material-ui/core/TableBody';
import MUITableCell from '@material-ui/core/TableCell';
import MUITableRow from '@material-ui/core/TableRow';
import NoDataBox from './NoDataBox';

const TableCell = ({ row, column }) => {
  if (column.Cell && column.accessor) {
    return <MUITableCell>{column.Cell(row)}</MUITableCell>
  } else if (column.accessor) {
    return <MUITableCell>{row[column.accessor]}</MUITableCell>
  } else return null;
};

const Table = ({ columns, rows, ...props }) => {

  if (rows.length === 0) return <NoDataBox />;

  return (
    <MUITable {...props}>
      <MUITableHead>
        <MUITableRow>
          {columns.map((column, idx) => (
            <th key={JSON.stringify(column)}>{column.Header}</th>
          ))}
        </MUITableRow>
      </MUITableHead>
      <MUITableBody>
        {rows.map((row, idx) => (
          <MUITableRow key={JSON.stringify(row)}>
            {columns.map((column) => (
              <TableCell key={JSON.stringify(column)} column={column} row={row} />
            ))}
          </MUITableRow>
        ))}
      </MUITableBody>
    </MUITable>
  );
};

export default Table;
