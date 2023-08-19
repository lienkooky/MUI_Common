"use client";

import React, { useEffect, useState, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

export interface IDynamic {
  [key: string]: string | number | object | [] | null | undefined | boolean;
}

export interface ITableField {
  key: string;
  label?: string;
  style?: {
    header?: object;
    body?: object;
  };
  calssName?: {
    header?: string;
    body?: string;
  };
  component?: {
    obj?: object;
  };
  sort?: string;
  useIcon?: boolean;
  usePageNation?: boolean;
  useFixedHeader?: boolean;
  ariaLabel?: "simple table" | "a dense table" | "sticky table" | undefined;
  [key: string]: string | number | object | [] | null | undefined | boolean;
}

interface IProps<T> {
  fields: ITableField[];
  tableData?: T[];
  rowKey: keyof T;
}

function DefaultTable<T>({ fields, tableData, rowKey }: IProps<T>) {
  const [fieldData, setFieldData] = useState<ITableField[]>(
    fields.filter((el) => el.key !== "setting")
  );
  const [settingData, setSettingData] = useState<ITableField[]>(
    fields.filter((el) => el.key === "setting")
  );

  console.log("settingData", settingData);
  console.log("fieldData", fieldData);

  useEffect(() => {
    setSettingData(fields.filter((el) => el.key === "setting")); //? settingData
    setFieldData(fields.filter((el) => el.key !== "setting")); //? setting 제외
  }, [fields]);

  const getNode = (field: ITableField, item: T, index: number) => {
    console.log(123);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader={settingData[0].useFixedHeader || false}
        aria-label={settingData[0].ariaLabel || "simple table"}
      >
        <TableHead>
          <TableRow>
            {fieldData &&
              fieldData.map((field) => (
                <TableCell
                  key={field.key as string}
                  style={field?.style?.header}
                  className={field?.calssName?.header}
                  padding={field.key === "checkbox" ? "checkbox" : undefined}
                >
                  {field.key === "checkbox" ? (
                    <Checkbox
                      color="primary"
                      // indeterminate={numSelected > 0 && numSelected < rowCount}
                      // checked={rowCount > 0 && numSelected === rowCount}
                      // onChange={onSelectAllClick}
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
        <TableBody>
          {tableData && tableData.length ? (
            tableData.map((item, index) => (
              <Fragment key={item[rowKey] as string}>
                {fieldData &&
                  fieldData.map((field) => (
                    <TableRow
                      key={field.key}
                      style={
                        field.key === rowKey ? field?.style?.body : undefined
                      }
                      className={field?.calssName?.header}
                    >
                      <TableCell>{getNode(field, item, index)}</TableCell>
                    </TableRow>
                  ))}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={fieldData.length}>데이터 없어용</TableCell>
            </TableRow>
          )}

          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DefaultTable;
