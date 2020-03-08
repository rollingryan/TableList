import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/shared/Loader';
import TableListHeader from './TableListHeader';
import TableListBody from './TableListBody';

const TableList = ({
  columns,
  listItems,
  modifiers,
  isLoading,
  clickableTable,
  checkboxColumn,
  sortedColumn,
  isSortable,
  onSort,
  onCheck,
  ...props
}) => {
  const [checkedRows, setCheckedRows] = useState({
    isAllChecked: false,
    rows: [],
  });

  const colCount = checkboxColumn ? columns.length + 1 : columns.length;

  const selectAll = () => {
    const allChecked = !checkedRows.isAllChecked;
    const allRows = allChecked ? listItems : [];
    setCheckedRows({ isAllChecked: allChecked, rows: allRows });
    onCheck(allRows);
  };

  const onSelect = item => {
    let allRows = checkedRows.rows;
    if (allRows.find(row => row.key === item.key)) {
      allRows = allRows.filter(row => row.key !== item.key);
    } else {
      allRows = [...allRows, item];
    }
    setCheckedRows({ ...checkedRows, rows: allRows });
    onCheck(allRows);
  };

  return (
    <div
      className={`table-list ${modifiers &&
        `table-list--${modifiers.reduce(
          (combined, current) => `${combined} block--${current}`,
        )}`}`}>
      <div className="table-list--fixed">
        <TableListHeader
          onSort={onSort}
          columns={columns}
          columnCount={colCount}
          selectAll={selectAll}
          isChecked={checkedRows.isAllChecked}
          checkboxColumn={checkboxColumn}
          className="desktop"
          sortedColumn={sortedColumn}
          isSortable={isSortable}
        />

        {(isLoading && <Loader />) || (
          <TableListBody
            columns={columns}
            listItems={listItems}
            clickableTable={clickableTable}
            columnCount={colCount}
            checkboxColumn={checkboxColumn}
            checkedRows={checkedRows.rows}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
};

TableList.propTypes = {
  columns: PropTypes.array,
  listItems: PropTypes.array,
  modifiers: PropTypes.array,
  isLoading: PropTypes.bool,
  clickableTable: PropTypes.bool,
  checkboxColumn: PropTypes.bool,
  onChecked: PropTypes.func,
  sortedColumn: PropTypes.string,
};

TableList.defaultProps = {
  columns: [],
  listItems: [],
  modifiers: null,
  isLoading: false,
  clickableTable: false,
  checkboxColumn: false,
  onChecked: () => {},
  sortedColumn: '',
};

export default TableList;
