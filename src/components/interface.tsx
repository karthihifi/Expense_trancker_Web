export interface ModalFile {
    date: string,
    currency: string,
    amount: number,
    time: string,
    category: string,
    subcategory: string,
    availmode: string,
    necessity: string,
    comments:string,
    trendrate:string,
    trendicon:string,
    mostusedcat:string,
    mostusedpurchmode:string,
    dateno:number,
    month:number,
    monthstr:string,
    year:number
}

export interface ChartSchema{
    title:string,
    value:number
}

// export default { ModalFile , ChartSchema };