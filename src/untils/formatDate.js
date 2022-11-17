import moment from 'moment';

function formatDate(string) {
    return string ? moment(string).format('DD/MM/YYYY') : "";
}
  
export default formatDate;