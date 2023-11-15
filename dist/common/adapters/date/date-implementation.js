"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateImplementation = void 0;
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
class DateImplementation {
    zonedTimeToUtc(date, timeZone) {
        const newDate = (0, date_fns_tz_1.zonedTimeToUtc)(date, timeZone);
        if (date)
            return newDate;
        else
            return null;
    }
    subHours(date, amount) {
        return (0, date_fns_1.subHours)(date, amount);
    }
    subDays(date, amount) {
        return (0, date_fns_1.subDays)(date, amount);
    }
    subMonths(date, amount) {
        return (0, date_fns_1.subMonths)(date, amount);
    }
    parseDate(date, formatString) {
        return (0, date_fns_1.parse)(date, formatString, new Date('1900-01-01'));
    }
    formatDate(date, formatString) {
        return (0, date_fns_1.format)(date, formatString);
    }
    differenceInDays(dateOne, dateTwo) {
        return (0, date_fns_1.differenceInDays)(dateOne, dateTwo);
    }
}
exports.DateImplementation = DateImplementation;
//# sourceMappingURL=date-implementation.js.map