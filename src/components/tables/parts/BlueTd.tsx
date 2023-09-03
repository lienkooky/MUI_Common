import {ReactElement} from 'react';

function BlueTd({cstDvsn}: {cstDvsn: string}): ReactElement {
  return (
    <span>
      {cstDvsn}
      <style jsx>{`
        span {
          color: blue;
        }
      `}</style>
    </span>
  );
}

export default BlueTd;
