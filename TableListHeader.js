import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'components/shared/Input';
import Icon from 'components/shared/Icon';

const TableListHeader = ({
  columns,
  columnCount,
  selectAll,
  isChecked,
  checkboxColumn,
  className,
  onSort,
  sortedColumn,
  isSortable,
}) => {
  const [currentSortedColumn, setCurrentSortedColumn] = useState(sortedColumn);

  const [ascending, setAscending] = useState(false);

  const onItemSort = key => {
    if (key === currentSortedColumn) {
      setAscending(!ascending);
    } else {
      setAscending(false);
    }

    setCurrentSortedColumn(key);

    if (onSort) {
      return onSort(key);
    }
  };

  return (
    columns.length > 0 && (
      <div
        className={`table-list__header-row ${(className &&
          `table-list__header-row--${className}`) ||
          ''}`}
        style={{
          gridTemplateColumns: `repeat(${columnCount}, calc(100% / ${columnCount}))`,
        }}>
        {(checkboxColumn && (
          <span className="table-list__header-item table-list__header-item--checkbox">
            <Checkbox
              noMargin
              name="checkboxColumn"
              onChange={selectAll}
              isChecked={isChecked}
            />
          </span>
        )) ||
          ''}
        {columns.map(item => (
          <span
            onClick={isSortable ? () => onItemSort(item.key) : () => {}}
            className={`table-list__header-item table-list__header-item--${
              item.key
            } ${(currentSortedColumn === item.key &&
              `table-list__header-item--sorted ${(ascending && 'desc') ||
                ''}`) ||
              ''} ${(!isSortable && 'table-list__header-item--unsortable') ||
              ''}`}
            key={item.key}>
            {item.value} <Icon icon="sort_arrow" />
          </span>
        ))}
      </div>
    )
  );
};

TableListHeader.propTypes = {
  columns: PropTypes.array,
  columnCount: PropTypes.number,
  selectAll: PropTypes.func,
  isChecked: PropTypes.bool,
  checkboxColumn: PropTypes.bool,
  className: PropTypes.string,
  sortedColumn: PropTypes.string,
  isSortable: PropTypes.bool,
};

TableListHeader.defaultProps = {
  columns: [],
  columnCount: 0,
  selectAll: () => {},
  isChecked: false,
  checkboxColumn: false,
  className: '',
  sortedColumn: '',
  isSortable: true,
};

export default TableListHeader;
