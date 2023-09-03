'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import css from 'styled-jsx/css';

interface IProps {
  onClick: (event: ChangeEvent<unknown>, page: number) => void;
  page: number; // ? 시작 페이지 번호
  pageSize: number; // ? 보여주고 싶은 페이지 개수
  totalCount: number; // ? 총페이지 갯수\
  limit: number;
}

const style = css`
  .page_wrap {
    padding-bottom: 30px;
  }
`;

function DefaultPagination({onClick, page, pageSize, totalCount, limit}: IProps) {
  const totalPage = Math.ceil(totalCount / pageSize);

  const sliceArrayByLimit = (total: number, per: number): number[][] => {
    const makeArr = Array(total)
      .fill(0)
      .map((item, i) => i);
    return Array(Math.ceil(total / per))
      .fill(0)
      .map(() => makeArr.splice(0, per));
  };

  const [totalPageArray, setTotalPageArray] = useState<number[][]>(() => sliceArrayByLimit(totalPage, limit));

  useEffect(() => {
    setTotalPageArray(sliceArrayByLimit(totalPage, limit));
  }, [totalPage, limit]);

  return (
    <div className="page_wrap">
      <div className="page_nation">
        <button className="arrow pprev" onClick={(event) => onClick(event, 1)} disabled={page === 1} />
        <button className="arrow prev" onClick={(event) => onClick(event, page - 1)} disabled={page === 1} />
        {totalPageArray[Math.floor(page / limit)].map((pageNumber) => (
          <button
            key={pageNumber + 1}
            onClick={(event) => onClick(event, pageNumber + 1)}
            className={pageNumber + 1 === page ? 'active' : ''}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button className="arrow next" onClick={(event) => onClick(event, page + 1)} disabled={page === totalPage} />
        <button
          className="arrow nnext"
          onClick={(event) => onClick(event, Math.ceil(totalCount / pageSize))}
          disabled={page === totalPage}
        />
      </div>
      <style jsx>{style}</style>
      {/* <style jsx>{`
        .page_wrap {
          padding-bottom: 30px;
        }
      `}</style> */}
    </div>
  );
}

export default DefaultPagination;
