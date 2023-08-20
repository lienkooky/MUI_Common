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
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
  pagiNation?: {
    used: boolean;
    page?: number; //? 시작 페이지 번호
    totalNum: number; //? 보여주고 싶은 페이지 총 수
    totalCount: number; //? 총페이지 갯수
    spacing?: number; //? 테이블과 페이지네이션 사이 거리
    size?: "small" | "medium" | "large"; //? 컴포넌트 사이즈
    variant?: "outlined" | "text"; //? 테두리
    shape?: "circular" | "rounded"; //? 페이지 숫자 모양
    onChange?: Function; //?함수
  };
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
  const [settingData, setSettingData] = useState(
    Object.assign({}, ...fields.filter((el) => el.key === "setting"))
  );
  const [open, setOpen] = useState(false);

  console.log("settingData", settingData);
  console.log("fieldData", fieldData);

  useEffect(() => {
    setSettingData(
      Object.assign({}, ...fields.filter((el) => el.key === "setting"))
    ); //? settingData
    setFieldData(fields.filter((el) => el.key !== "setting")); //? setting 제외
  }, [fields]);

  const getNode = (field: ITableField, item: T, index: number) => {
    let text = (item as IDynamic)[field.key as string];

    console.log("field", field);
    console.log("item", item);

    if (field.key === "checkbox") {
      return (
        <Checkbox
          color="primary"
          // indeterminate={numSelected > 0 && numSelected < rowCount}
          // checked={rowCount > 0 && numSelected === rowCount}
          // onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "select all desserts",
          }}
        />
      );
    }
    if (field.useIcon) {
      return (
        <>
          {text}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </>
      );
    }
    return <>{text}</>;
  };

  return (
    <Stack spacing={settingData.pagiNation.spacing || 3}>
      <TableContainer component={Paper}>
        <Table
          stickyHeader={settingData.useFixedHeader || false}
          aria-label={settingData.ariaLabel || "simple table"}
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
                <TableRow key={item[rowKey] as string}>
                  {fieldData &&
                    fieldData.map((field) => (
                      <TableCell
                        key={field.key}
                        padding={
                          field.key === "checkbox" ? "checkbox" : undefined
                        }
                      >
                        {getNode(field, item, index)}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={fieldData.length}>데이터 없어용</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {settingData.pagiNation.used ? (
        <Pagination
          showFirstButton
          showLastButton
          defaultPage={settingData.pagiNation.page}
          count={settingData.pagiNation.totalNum}
          boundaryCount={settingData.pagiNation.totalNum}
          size={settingData.pagiNation.size || "medium"}
          variant={settingData.pagiNation.variant || "text"}
          shape={settingData.pagiNation.shape || "rounded"}
          onChange={settingData.pagiNation.onChage || undefined}
        />
      ) : (
        ""
      )}
    </Stack>
  );
}

export default DefaultTable;
