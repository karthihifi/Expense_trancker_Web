
import { type } from 'os';
import { stringify } from 'querystring';
import { ModalFile, ChartSchema } from './interface';

interface Cattype {
    page: string,
    Categories: string[]
}

interface PieChartIntf { name: string, value: number }

type charttype = string | number
class PieCat {
    Categories: Cattype[];
    Necessity: string[]
    Usercat: string[]
    PurchMode: string[]
    Calenderinfo = [
        {
            key: 1,
            value: 'January',
        },
        {
            key: 2,
            value: 'February',
        },
        {
            key: 3,
            value: 'March',
        },
        {
            key: 4,
            value: 'April',
        },
        {
            key: 5,
            value: 'May',
        },
        {
            key: 6,
            value: 'June',
        },
        {
            key: 7,
            value: 'July',
        },
        {
            key: 8,
            value: 'August',
        },
        {
            key: 9,
            value: 'September',
        },
        {
            key: 10,
            value: 'October',
        },
        {
            key: 11,
            value: 'November',
        },
        {
            key: 12,
            value: 'December',
        },
    ];
    constructor() {
        this.Categories = [{ page: 'Home', Categories: ['By Category', 'By Purchmode', 'By Necessity'] },
        { page: 'DailyCum', Categories: ['By Date', 'By Category', 'By Purchmode', 'By Necessity'] }
        ]
        this.Necessity = [
            'Needed',
            'Not Needed',
            'Future',
            'Maybe'
        ]

        this.Usercat = [
            'Food',
            'Clothes',
            'Electronics',
            'Entertainment',
            'Fitness'
        ]
        this.PurchMode = ['Online', 'Offline']
    }

    calculatetot(TableData: ModalFile[]): number {
        let total = TableData.reduce((tot, val) => {
            const { amount } = val
            return tot + amount
        }, 0)
        return total
    }


    SetbarchartData(bymode: string,ModalData: ModalFile[]): [[]] {
        let Bardata: any = [[bymode, "Amount"]]
        let baritem: any[] = []
        let filtereditems = this.GroupData_gc(bymode,ModalData)
        filtereditems.forEach((item) => {
            baritem = []
            baritem.push(String(item.name), item.value)
            Bardata.push(baritem)
        })
        console.log(Bardata, 'sads', typeof (Bardata))
        return Bardata;
    }
    GetHighestspentData(bymode: string, ModalData: ModalFile[], total: number): string {
        let ret = 'NA'
        let finalitems: { obj: string, value: number }[] = []
        this.Usercat.forEach((cat) => {
            let filetreditems: ModalFile[] = ModalData.filter((item) => {
                type ObjectKey = keyof typeof item;
                const myVar = bymode as ObjectKey;
                return (item[myVar] == cat)
            })
            let result = filetreditems.reduce(function (acc, obj) { return acc + obj.amount; }, 0);
            finalitems.push({ obj: cat, value: result })
        })
        finalitems.sort((prev: { obj: string, value: number }, curr: { obj: string, value: number }) => {
            if (prev.value < curr.value) {
                return 1;
            }
            if (prev.value > curr.value) {
                return -1;
            }
            return 0;
        })
        console.log(finalitems, "final")
        let percent = Math.round((finalitems[0].value / total) * 100)
        ret = `${finalitems[0].obj} (${percent}%)`
        return ret
    }

    GroupData_gc(bymode: string, ModalData: ModalFile[]): PieChartIntf[] {
        let PieData: PieChartIntf[] = []
        switch (bymode) {
            case 'Necessity':
                this.Necessity.forEach((nec) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.necessity === nec) })
                    if (filetreditems.length >= 1) {
                        // let percent = Math.round((this.calculatetot(filetreditems) / total) * 100)
                        PieData.push({ name: nec, value: this.calculatetot(filetreditems) })
                    }
                })
                break;
            case 'Category':
                this.Usercat.forEach((cat) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.category === cat) })
                    if (filetreditems.length >= 1) {
                        // let percent = Math.round((this.calculatetot(filetreditems) / total) * 100)
                        PieData.push({ name: cat, value: this.calculatetot(filetreditems) })
                    }
                })
                break;
            case 'PurchMode':
                this.PurchMode.forEach((mode) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.availmode === mode) })
                    if (filetreditems.length >= 1) {
                        // let percent = Math.round((100 * this.calculatetot(filetreditems)) / total)
                        PieData.push({ name: mode, value: this.calculatetot(filetreditems) })
                    }
                })
                break;
            case 'Date':
                ModalData.forEach((item) => {
                    // let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.availmode === mode) })
                    // if (filetreditems.length >= 1) {
                    // let percent = Math.round(100 * (item.amount) / total)
                    PieData.push({ name: item.date, value: item.amount })
                    // }
                })
                break;
        }
        return PieData
    }

    GroupData(bymode: string, ModalData: ModalFile[], total: number): PieChartIntf[] {
        let PieData: PieChartIntf[] = []
        switch (bymode) {
            case 'Necessity':
                this.Necessity.forEach((nec) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.necessity === nec) })
                    if (filetreditems.length >= 1) {
                        let percent = Math.round((this.calculatetot(filetreditems) / total) * 100)
                        PieData.push({ name: nec, value: percent })
                    }
                })
                break;
            case 'Category':
                this.Usercat.forEach((cat) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.category === cat) })
                    if (filetreditems.length >= 1) {
                        let percent = Math.round((this.calculatetot(filetreditems) / total) * 100)
                        PieData.push({ name: cat, value: percent })
                    }
                })
                break;
            case 'PurchMode':
                this.PurchMode.forEach((mode) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.availmode === mode) })
                    if (filetreditems.length >= 1) {
                        let percent = Math.round((100 * this.calculatetot(filetreditems)) / total)
                        PieData.push({ name: mode, value: percent })
                    }
                })
                break;
            case 'Date':
                ModalData.forEach((item) => {
                    // let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.availmode === mode) })
                    // if (filetreditems.length >= 1) {
                    let percent = Math.round(100 * (item.amount) / total)
                    PieData.push({ name: item.date, value: percent })
                    // }
                })
                break;
        }
        return PieData
    }
}

export default PieCat;