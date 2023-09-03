import {ReactElement} from 'react';
import moment from 'moment';

function ConsultingDate({cnslDt}: {cnslDt: string}): ReactElement {
  return <span>{moment(cnslDt).format('YYYY-MM-DD')}</span>;
}

export default ConsultingDate;
