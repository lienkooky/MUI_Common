'use client';

import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import {IDynamic, ITableField} from 'types/defaultTable';
import IntrinsicAttributes = JSX.IntrinsicAttributes;

interface IRowProps<T> {
  fields: ITableField[];
  childFields?: ITableField[];
  rowData: T;
  rowKey: keyof T;
  tableRowBodyClassName?: string;
  tableRowCollapseColor?: string;
  checked?: boolean;
  rowIndex: number;
  hideCollapsibleHeader: boolean;
  onChange?: (e: ChangeEvent) => void;
}

interface IConstraint<T> extends IntrinsicAttributes {
  children?: T[];
}

function Row<T extends IConstraint<T>>({
  fields,
  childFields,
  tableRowBodyClassName,
  tableRowCollapseColor,
  rowKey,
  checked,
  onChange,
  rowIndex,
  rowData
}: IRowProps<T>) {
  const [open, setOpen] = useState(false);
  const [childFieldsData, setChildFieldsData] = useState<ITableField[]>([]);

  useEffect(() => {
    setChildFieldsData(childFields || fields);
  }, [fields, childFields]);

  const getNode = (field: ITableField, item: T, index: number) => {
    if (item === null) {
      return null;
    }
    const text = (item as unknown as IDynamic)[field.key as string];

    if (field.key === 'checkbox') {
      return (
        <Checkbox
          color="primary"
          name={index.toString()}
          checked={checked}
          onChange={onChange}
          inputProps={{
            'aria-label': 'select all desserts'
          }}
        />
      );
    }
    if (field.isCollapse && typeof item === 'object' && 'children' in item) {
      const CustomComponent = field.component?.obj as FunctionComponent;
      return (
        <>
          {field.component ? <CustomComponent {...item} /> : text}
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </>
      );
    }
    if (field.component) {
      const CustomComponent = field.component.obj as FunctionComponent;
      return <CustomComponent {...item} />;
    }

    return <>{text}</>;
  };

  const getChildNode = (childField: ITableField, item: T) => {
    const text = (item as unknown as IDynamic)[childField.key as string];

    if (childField.key === 'checkbox') {
      return <></>;
    }
    if (childField.component) {
      const CustomComponent = childField.component.obj as FunctionComponent;

      if (childField.component?.callback) {
        return (
          <CustomComponent {...item} callback={() => childField.component?.callback?.(item as unknown as IDynamic)} />
        );
      }
      return <CustomComponent {...item} />;
    }

    return <>{text}</>;
  };

  return (
    <>
      <TableRow className={tableRowBodyClassName}>
        {fields.map((field) => (
          <TableCell
            align={field?.align}
            style={field?.style?.header}
            className={field?.calssName?.header}
            key={field.key as string}
          >
            {getNode(field, rowData, rowIndex)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell
          style={{padding: 0, margin: 0, border: 0}}
          colSpan={fields.filter((el) => el.style?.header?.display !== 'none').length}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {rowData?.children?.map((child) => (
                  <TableRow key={child[rowKey] as string}>
                    {childFieldsData.map((childField) => (
                      <TableCell
                        sx={{backgroundColor: tableRowCollapseColor || '#F2FCE6'}}
                        key={childField.key as string}
                        style={childField?.style?.header}
                        className={childField?.calssName?.header}
                      >
                        {getChildNode(childField, child)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface IProps<T> {
  fields: ITableField[];
  childFields?: ITableField[];
  tableData?: T[];
  rowKey: keyof T;
  isFixedHeader?: boolean;
  ariaLabel?: 'simple table' | 'a dense table' | 'sticky table' | 'customized table' | 'collapsible table' | undefined;
  containerClassName?: string;
  tableRowHeadClassName?: string;
  tableRowBodyClassName?: string;
  tableRowCollapseColor?: string;
  hideCollapsibleHeader?: boolean;
  onChange?: (selected: string[]) => void;
}

function CollapsibleTable<T extends IConstraint<T>>({
  fields,
  childFields,
  tableData,
  rowKey,
  isFixedHeader = false,
  ariaLabel = 'collapsible table',
  containerClassName,
  tableRowHeadClassName,
  tableRowBodyClassName,
  tableRowCollapseColor,
  hideCollapsibleHeader = false,
  onChange
}: IProps<T>) {
  const [isCheckedAll, setIsCheckedAll] = useState(false); // ? 전체 checkBox 선택
  const [checkedList, setCheckedList] = useState<string[]>([]);

  // * host Component에서 onChange함수 호출함 checkbox 상태값 변경 가능
  useEffect(() => {
    if (onChange) onChange(checkedList);
  }, [onChange, checkedList]);

  // * checkbox 전체 선택
  const onSelectAllClick = (event: ChangeEvent): void => {
    if (!tableData) return;

    const {checked} = event.target as HTMLInputElement;

    if (checked && tableData) {
      setCheckedList(tableData.map((item, index) => index.toString()));
    } else {
      setCheckedList([]);
    }

    setIsCheckedAll(checked);
  };

  // * checkobx 개별 선택
  const onChangeCheckedRow = (e: ChangeEvent) => {
    const {name, checked} = e.target as HTMLInputElement;
    const updatedCheckedList = checked ? [...checkedList, name] : checkedList.filter((el) => el !== name);

    setCheckedList(updatedCheckedList);
    // * 개별 checkbox 전부 선택 시
    setIsCheckedAll(tableData?.length === updatedCheckedList.length);
  };

  return (
    <TableContainer component={Paper} className={containerClassName}>
      <Table stickyHeader={isFixedHeader} aria-label={ariaLabel}>
        <TableHead>
          <TableRow className={tableRowHeadClassName}>
            {fields &&
              fields.map((field) => (
                <TableCell
                  component="th"
                  key={field.key as string}
                  style={field?.style?.header}
                  className={field?.calssName?.header}
                  padding={field.key === 'checkbox' ? 'checkbox' : undefined}
                >
                  {field.key === 'checkbox' ? (
                    <Checkbox
                      color="primary"
                      checked={isCheckedAll}
                      onChange={onSelectAllClick}
                      inputProps={{
                        'aria-label': 'select all desserts'
                      }}
                    />
                  ) : (
                    field.label
                  )}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.length ? (
            tableData.map((row, index) => (
              <Row<T>
                key={row[rowKey] as string}
                fields={fields}
                childFields={childFields}
                rowData={row}
                rowKey={rowKey}
                tableRowBodyClassName={tableRowBodyClassName}
                tableRowCollapseColor={tableRowCollapseColor}
                hideCollapsibleHeader={hideCollapsibleHeader}
                rowIndex={index}
                checked={checkedList.includes(index.toString())} // * 포함하고 있는 것들 체크
                onChange={onChangeCheckedRow}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={fields.filter((el) => el.style?.header?.display !== 'none').length} align="center">
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
