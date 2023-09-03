"use client";

import {
  ChangeEvent,
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { IDynamic, ITableField } from "@/src/types/defaultTable";

interface IProps<T> {
  fields: ITableField[];
  tableData: T[];
  rowKey: keyof T;
  isFixedHeader?: boolean;
  ariaLabel?:
    | "simple table"
    | "a dense table"
    | "sticky table"
    | "customized table"
    | undefined;
  containerClassName?: string;
  trRowHeadClassName?: string;
  trRowBodyClassName?: string;
  onChange?: (selected: string[]) => void;
  onClick?: (row: object) => void;
}

function DefaultTable<T>({
  fields,
  tableData,
  rowKey,
  ariaLabel = "simple table",
  isFixedHeader = false,
  containerClassName,
  trRowHeadClassName,
  trRowBodyClassName,
  onChange,
  onClick,
}: IProps<T>): ReactElement {
  const [isCheckedAll, setIsCheckedAll] = useState(false); // ? 전체 checkBox 선택
  const [checkedList, setCheckedList] = useState<string[]>([]);

  // * host Component에서 onChange함수 호출함 checkbox 상태값 변경 가능
  useEffect(() => {
    if (onChange) onChange(checkedList);
  }, [onChange, checkedList]);

  // * checkbox 전체 선택
  const onSelectAllClick = (event: ChangeEvent): void => {
    if (!tableData) return;

    const { checked } = event.target as HTMLInputElement;

    if (checked && tableData) {
      setCheckedList(tableData.map((item, index) => index.toString()));
    } else {
      setCheckedList([]);
    }

    setIsCheckedAll(checked);
  };

  // * checkobx 개별 선택
  const onChangeCheckedRow = (e: ChangeEvent) => {
    const { name, checked } = e.target as HTMLInputElement;
    const updatedCheckedList = checked
      ? [...checkedList, name]
      : checkedList.filter((el) => el !== name);

    setCheckedList(updatedCheckedList);
    // * 개별 checkbox 전부 선택 시
    setIsCheckedAll(tableData?.length === updatedCheckedList.length);
  };

  const getNode = (field: ITableField, item: T, index: number) => {
    const text = (item as IDynamic)[field.key as string];

    if (field.key === "checkbox") {
      return (
        <Checkbox
          color="primary"
          name={index.toString()}
          checked={checkedList.includes(index.toString())}
          onChange={onChangeCheckedRow}
          inputProps={{
            "aria-label": "select all desserts",
          }}
        />
      );
    }
    if (field.component) {
      const CustomComponent = field.component.obj as FunctionComponent;
      return <CustomComponent {...(item as IDynamic)} />;
    }

    return <>{text}</>;
  };

  return (
    <TableContainer component={Paper} className={containerClassName}>
      <Table stickyHeader={isFixedHeader} aria-label={ariaLabel}>
        {/* //? header */}
        <TableHead>
          <TableRow className={trRowHeadClassName}>
            {fields.map((field) => (
              <TableCell
                key={field.key}
                style={field?.style?.header}
                className={field?.calssName?.header}
                padding={field.key === "checkbox" ? "checkbox" : undefined}
              >
                {field.key === "checkbox" ? (
                  <Checkbox
                    color="primary"
                    checked={isCheckedAll}
                    onChange={onSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                ) : (
                  field.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* // ? body */}
        <TableBody>
          {tableData?.length ? (
            tableData.map((row, rowIndex) => (
              <TableRow
                component="tr"
                sx={{
                  cursor: onClick ? "pointer" : "default",
                  "&:hover": onClick
                    ? {
                        backgroundColor: "lightgrey",
                      }
                    : {},
                }}
                onClick={() => onClick?.(row as IDynamic)}
                key={row[rowKey] as string}
                className={trRowBodyClassName}
              >
                {fields.map((field) => (
                  <TableCell style={field?.style?.header} key={field.key}>
                    {getNode(field, row, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={
                  fields.filter((el) => el.style?.header?.display !== "none")
                    .length
                }
                align="center"
              >
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DefaultTable;
