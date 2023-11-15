/**
 * @param data string in format '1,2,3,4'
 * @returns new string as format '1','2','3','4'
 * @example convertStringToListString('1,2,3,4') -> '1','2','3','4'
 */
export function convertStringToListString (data: string): string | null {
    if (!data) return null

    if (data.indexOf(',') > 0) return "'" + data.normalize('NFD').replace(/[^0-9a-zA-Z,_/ ]/g, '').replace(/[,/]/g, "','") + "'"
    else return "'" + data + "'"
}