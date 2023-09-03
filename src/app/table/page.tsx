import DefaultPagination from "@/src/components/tables/DefaultPagination";
import DefaultTable from "@/src/components/tables/DefaultTable";
import { IDynamic, ITableField } from "@/src/types/defaultTable";
import React from "react";

// const childFields: ITableField[] = [
//   {
//     key: "itemName",
//     label: "종목명",
//     style: {
//       width: 400,
//       minWidth: 200,
//       maxWidth: 500,
//       align: "center",
//     },
//   },
//   {
//     key: "prevData",
//     label: "변경전",
//     style: {
//       align: "right",
//     },
//     css: {
//       body: "test_child_body2",
//     },
//   },
//   {
//     key: "nextData",
//     label: "변경후",
//     style: {
//       align: "right",
//       width: 90,
//     },
//     css: {
//       body: "test_child_body",
//     },
//   },
// ];
// {
//   id: "0",
//   itemName: "삼성전자",
//   prevData: "배당주",
//   nextData: "부진",
//   children: [],
// },
// {
//   id: "1",
//   itemName: "카카오게임",
//   prevData: "수익주",
//   nextData: "보통",
//   children: [],
// },
// {
//   id: "2",
//   itemName: "토스",
//   prevData: "-",
//   nextData: "보통",
//   children: [],
// },
// {
//   id: "3",
//   itemName: "네이버",
//   prevData: "수익주",
//   nextData: "부진",
//   children: [],
// },
// {
//   id: "4",
//   itemName: "콴텍미국형현금여유기업",
//   prevData: "-",
//   nextData: "39.0",
//   children: [],
// },
// {
//   id: "5",
//   itemName: "콴텍적립투자 전략1호",
//   prevData: "-",
//   nextData: "41.0",
//   children: [],
// },
// {
//   id: "6",
//   itemName: "기존 보유종목",
//   children: [
//     {
//       id: "0",
//       itemName: "삼선전자",
//       prevData: 28,
//       nextData: "0.0",
//     },
//     {
//       id: "1",
//       itemName: "카카오",
//       prevData: 14.5,
//       nextData: "5.0",
//     },
//     {
//       id: "2",
//       itemName: "네이버",
//       prevData: 14.5,
//       nextData: "-",
//     },
//     {
//       id: "3",
//       itemName: "블루레몬",
//       prevData: "-",
//       nextData: "-",
//     },
//   ],
// },

const fields: ITableField[] = [
  {
    key: "userName",
    label: "고객명",
  },
  {
    key: "hpNumber",
    label: "휴대폰번호",
  },
  {
    key: "gender",
    label: "성별",
  },
  {
    key: "investType",
    label: "투자성향코드",
    style: { header: { display: "none" } },
  },
  {
    key: "investTypeNm",
    label: "투자성향",
  },
  {
    key: "portRate",
    label: "수익률",
  },
  {
    key: "birthDay",
    label: "생일",
  },
  {
    key: "firstDate",
    label: "가입일자",
  },
  {
    key: "invAmount",
    label: "총투자금액",
  },
  {
    key: "uid",
    label: "고객userId",
    style: { header: { display: "none" } },
  },
  {
    key: "account",
    label: "고객계좌번호",
    style: { header: { display: "none" } },
  },
];

const tableData = [
  {
    fromCouncelDate: "20230101",
    toCnslDt: "20230131",
    invstIclnCd: "10",
    searchKeyword: "가나다라",
    gubunCode: "1",
    cstDvsn: "1",
    cstCnslPgsStep: "10",
  },
  {
    fromCouncelDate: "20230202",
    toCnslDt: "20230228",
    invstIclnCd: "20",
    searchKeyword: "아자차카",
    gubunCode: "2",
    cstDvsn: "2",
    cstCnslPgsStep: "20",
  },
  {
    fromCouncelDate: "20230303",
    toCnslDt: "20230331",
    invstIclnCd: "30",
    searchKeyword: "에비시디",
    gubunCode: "3",
    cstDvsn: "3",
    cstCnslPgsStep: "30",
  },
];

function page() {
  return (
    <>
      <DefaultTable
        rowKey="invstIclnCd"
        fields={fields}
        tableData={tableData}
        isFixedHeader
        onClick={(row) =>
          function (row: IDynamic): void {
            console.log(row);
          }
        }
        ariaLabel="simple table"
        containerClassName="consulting"
      />
      <DefaultPagination
        page={1}
        pageSize={20}
        totalCount={200}
        limit={10}
        onClick={function (
          event: React.ChangeEvent<unknown>,
          page: number
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
}

export default page;
