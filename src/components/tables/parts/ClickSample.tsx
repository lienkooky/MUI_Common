import {ReactElement} from 'react';
import css from 'styled-jsx/css';

const style = css`
  span {
    cursor: pointer;
    text-decoration: underline;
    color: #394add;
    text-align: center;
    position: relative;
    display: flex;
    margin-left: -8px;
  }
  .reple {
    width: 5px;
    height: 8px;
    background: url('/publishing/assets/img/common/re.svg') no-repeat 0 0;
    background-size: 5px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    padding-left: 10px;
  }
`;

function ClickSample({cnslDt, callback}: {cnslDt: string; callback(obj: object): void}): ReactElement {
  return (
    <>
      <i className="reple" />
      <span onClick={callback}>
        {cnslDt}
        {/* <style jsx>{`
        span:hover {
          background-color: 'red';
        }
      `}</style> */}
      </span>
      <style jsx>{style}</style>
    </>
  );
}
export default ClickSample;
