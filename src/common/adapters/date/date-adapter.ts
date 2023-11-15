export interface IDateAdapter {
    zonedTimeToUtc(date: string | number | Date, timeZone: string): Date
    subHours(date: number | Date, amount: number): Date
    subDays(date: number | Date, amount: number): Date
    subMonths(date: number | Date, amount: number): Date
    parseDate(date: string, formatString: string): Date

    /**
     * @param date date in format Date
     * @param formatString output date format
     * @returns new string date in format formatString, example 'yyyy-mm-dd'
     * @example formatDate(new Date('2021-01-01'), 'yyyymmdd') -> '20210101'
     */
    formatDate(date: Date | number, formatString: string): string

    /**
     * @param dateOne date in format Date
     * @param dateTwo date in format Date
     * @returns difference between dateOne and dateTwo in days
     * @example differenceInDays(new Date('2022-01-10'), new Date('2022-01-01')) -> 10
     */
     differenceInDays(dateOne: Date | number, dateTwo: Date | number): number
}