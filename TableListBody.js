import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon';
import { Checkbox } from 'components/shared/Input';
import TableListHeader from './TableListHeader';

const TableListBody = ({
  columns,
  listItems,
  clickableTable,
  columnCount,
  checkboxColumn,
  checkedRows,
  onSelect,
}) => {
  return (
    listItems.length > 0 &&
    listItems.map((listItem, index) => (
      <div
        className={`table-list__body-row table-list__body-row--${index} ${(clickableTable &&
          'table-list__body-row--clickable') ||
          ''} ${(listItem.isSelected && 'table-list__body-row--selected') ||
          ''}`}
        key={listItem.key}>
        <TableListHeader
          columns={columns}
          columnCount={columnCount}
          checkboxColumn={checkboxColumn}
          className="mobile"
        />

        <div
          className="table-list__body-block"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, calc(100% / ${columnCount}))`,
          }}>
          {checkboxColumn && (
            <span className="table-list__body-item table-list__body-item--checkbox">
              <Checkbox
                noMargin
                isChecked={!!checkedRows.find(row => row.key === listItem.key)}
                onChange={() => onSelect(listItem)}
              />
            </span>
          )}
          {columns.map((item, columnIndex) => (
            <span
              className={`table-list__body-item table-list__body-item--${item.key}`}
              key={item.key}
              onClick={listItem.onRowClick}>
              {listItem.data[item.key]()}
              {(clickableTable && columns.length === columnIndex + 1 && (
                <Icon
                  icon="right"
                  className="table-list__body--clickable--arrow"
                />
              )) ||
                ''}
            </span>
          ))}
        </div>
      </div>
    ))
  );
};

TableListBody.propTypes = {
  columns: PropTypes.array,
  listItems: PropTypes.array,
  clickableTable: PropTypes.bool,
  columnCount: PropTypes.number,
  checkboxColumn: PropTypes.bool,
  checkedRows: PropTypes.array,
  onSelect: PropTypes.func,
};

TableListBody.defaultProps = {
  columns: [],
  listItems: [],
  clickableTable: false,
  columnCount: 0,
  checkboxColumn: false,
  checkedRows: [],
  onSelect: () => {},
};

export default TableListBody;
