import DefaultTable, {
  ITableField,
} from "@/src/components/tables/DefaultTable";
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
    key: "setting",
    ariaLabel: "simple table",
    pagiNation: {
      used: true,
      page: 1, //? 시작 페이지 번호
      totalNum: 10, //? 보여주고 싶은 총 페이지 번호
      totalCount: 357, //?총페이지 개수
      spacing: 4, //? 테이블과 페이지네이션 사이 거리 : "margin-top이 8px씩 잡힙니다"
    },
    useFixedHeader: true,
  },
  {
    key: "checkbox",
  },
  {
    key: "fromCouncelDate",
    label: "시작일자",
  },
  {
    key: "toCnslDt",
    label: "종료일자",
  },
  {
    key: "invstIclnCd",
    label: "투자성향코드",
  },
  {
    key: "searchKeyword",
    label: "검색창",
  },
  {
    key: "gubunCode",
    label: "구분코드",
    useIcon: true,
  },
  {
    key: "cstDvsn",
    label: "투자목표코드",
  },
  {
    key: "cstCnslPgsStep",
    label: "상담진행단계",
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
    <DefaultTable rowKey="invstIclnCd" fields={fields} tableData={tableData} />
  );
}

export default page;
