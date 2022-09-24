export interface ModalFile {
    date: string,
    currency: string,
    amount: number,
    time: string,
    category: string,
    subcategory: string,
    availmode: string,
    necessity: string,
    comments: string,
    trendrate: string,
    trendicon: string,
    mostusedcat: string,
    mostusedpurchmode: string,
    dateno: number,
    month: number,
    monthstr: string,
    year: number
}

export interface ChartSchema {
    title: string,
    value: number
}

export interface Generic {
    name: string, value: number
}

export interface Globaldata {
    username: string,
    currlabel: string, currsymbol: string, countryname: string,
    flag: string

}

// export default { ModalFile , ChartSchema };