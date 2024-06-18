/* const { ReportUtils } = require('./report-utils');

    case 'mm/dd/yyyy':
    case 'mm-dd-yyyy':
    case 'mm.dd.yyyy':
strDateFormat =
  /((0[13578]|1[02])[/ -.]31[/ -.](18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])[/ -.](29|30)[/ -.](18|19|20)[0-9]{2})|((0[1-9]|1[0-2])[/ -.](0[1-9]|1[0-9]|2[0-8])[/ -.](18|19|20)[0-9]{2})|((02)[/ -.]29[/ -.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))/;
if (strDateFormat.test(strDate)) {
  reporter.log(`${strDate} date is in ${strFormats} format`);
} else {
  reporter.log(`${strDate}date is not in ${strFormats} format`);
}
break;

    case 'mm-dd-yyyy hh:mm:ss tt':
    case 'mm/dd/yyyy hh:mm:ss tt':
strDateFormat =
  /^(((((0[13578])|([13578])|(1[02]))[-/]?((0[1-9])|([1-9])|([1-2][0-9])|(3[01])))|((([469])|(11))[-/]?((0[1-9])|([1-9])|([1-2][0-9])|(30)))|((02|2)[-/]?((0[1-9])|([1-9])|([1-2][0-9]))))[-/]?\d{4})(\s(((0[1-9])|([1-9])|(1[0-2])):([0-5][0-9])((s)|(:([0-5][0-9])s))([AM|PM|am|pm]{2,2})))?$/;
if (strDateFormat.test(strDate)) {
  reporter.log(`${strDate} date is in ${strFormats} format`);
} else {
  reporter.log(`${strDate}date is not in ${strFormats} format`);
}
break;

    case 'dd/mm/yyyy hh:mm:ss':
strDateFormat =
  /^(0[1-9]|1\d|2[0-8]|29(?=-\d\d-(?!1[01345789]00|2[1235679]00)\d\d(?:[02468][048]|[13579][26]))|30(?!-02)|31(?=-0[13578]|-1[02]))-(0[1-9]|1[0-2])-([12]\d{3}) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
if (strDateFormat.test(strDate)) {
  reporter.log(`${strDate} date is in ${strFormats} format`);
} else {
  reporter.log(`${strDate}date is not in ${strFormats} format`);
}
break;

    case 'mm/dd/yyyy hh:mm:ss':
strDateFormat = /^([0]\d|[1][0-2])\/([0-2]\d|[3][0-1])\/([2][01]|[1][6-9])\d{2}(\s([0-1]\d|[2][0-3])(:[0-5]\d){1,2})?$/;
if (strDateFormat.test(strDate)) {
  reporter.log(`Valid date in ${strFormats} format`);
} else {
  reporter.log(`Its not valid in ${strFormats} format`);
}
break;
    case 'MMM dd, yyyy':
strDateFormat =
  /^(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?) 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?) (0?[1-9]|([12]\d)|30))|(Feb(ruary)? (0?[1-9]|1\d|2[0-8]|(29(?=, ((1[6-9]|[2-9]d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))))), ((1[6-9]|[2-9]\d)\d{2}))/;
if (strDateFormat.test(strDate)) {
  reporter.log(`${strDate} date is in ${strFormats} format`);
} else {
  reporter.log(`${strDate}date is not in ${strFormats} format`);
}
break;
*/
//     case 'Date, MMM dd, yyyy':
//       {
//         const arrDate = strDate.split(', ');
//         const date = arrDate[0];
//         const strDate1 = `${arrDate[1]}, ${arrDate[2]}`;
//         const strMonthDateFormat =
//           /^(?:(((Jan(uary)?|Ma(r(ch)?|y)|Jul(y)?|Aug(ust)?|Oct(ober)?|Dec(ember)?) 31)|((Jan(uary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sept|Nov|Dec)(ember)?) (0?[1-9]|([12]\d)|30))|(Feb(ruary)? (0?[1-9]|1\d|2[0-8]|(29(?=, ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))))), ((1[6-9]|[2-9]\d)\d{2}))/;
//         const strDayDateFormat = /^(Sun|Mon|(T(ues|hurs))|Fri)(day|\.)?$|Wed(\.|nesday)?$|Sat(\.|urday)?$|T((ue?)|(hu?r?))\.?$/;
//         if (strDayDateFormat.test(date) && strMonthDateFormat.test(strDate1)) {
//           reporter.log(`${strDate1} date is in ${strFormats} format`);
//         } else {
//           reporter.log(`${strDate1}date is not in ${strFormats} format`);
//         }
//       }
//       break;

//     default:
//       reporter.log(`${strFormats}  is not matching in the defined formats`);
//       break;
//   }
// };

// module.exports = { validateDate };
