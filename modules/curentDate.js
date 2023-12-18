// Преобразование времени

function zero_first_format(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }
 export function date_time(date) {
    var current_datetime = new Date(date);
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth() + 1);
    var year = current_datetime.getFullYear() % 100;
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
  
    return day + "." + month + "." + year + " " + hours + ":" + minutes;
  }