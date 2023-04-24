
import { type } from 'os';
import { stringify } from 'querystring';
import { Modal } from 'react-bootstrap';
import { ModalFile, ChartSchema, Globaldata, TredWidgets } from './interface';

interface Cattype {
    page: string,
    Categories: string[]
}

interface PieChartIntf { name: string, value: number }

interface Generic { name: string, value: number }

type charttype = string | number
class PieCat {
    GlobalData: Globaldata
    Categories: Cattype[];
    Necessity: string[]
    Usercat: string[]
    PurchMode: string[]
    UserSubCat: { key: string, value: string[] }[]
    Exception_categorylist: { key: string, value: string[] }[]
    BarChartLabel_Anno = {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify"
    };
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
        this.GlobalData = {
            username: 'karthihifi',
            countryname: '', currlabel: '', currsymbol: '', flag: ''
        }
        this.Categories = [{ page: 'Home', Categories: ['By Category', 'By Purchmode', 'By Necessity'] },
        { page: 'DailyCum', Categories: ['By Date', 'By Category', 'By Purchmode', 'By Necessity'] },
        { page: 'Monthy', Categories: ['By Date', 'By Category', 'By Purchmode', 'By Necessity'] }
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
            'Groceries',
            'Travel',
            'OneTimeExpense',
            'BillPayments',
            'Entertainment',
            'Fitness',
            'Others'
        ]
        this.Exception_categorylist = [{ key: 'OneTimeExpense', value: ['AppartmentRent'] }, {
            key: 'BillPayments', value: ['Room']
        }]

        this.UserSubCat = [{
            key: 'Food', value: ['Snacks', 'Beverages', 'MainCourse', 'Fruits', 'Nuts', 'Water', 'BreadItems', 'Pasteries', 'Chinese', 'NewTryOuts']
        },
        {
            key: 'Groceries', value: ['Fish', 'Chicken', 'Lamb', 'Prawn', 'Egg', 'Flour', 'Nuts', 'Salt', 'Sugar', 'Dhal', 'Rava', 'OtherMeat', 'Vegetables', 'CookingOil', 'OtherOil', 'Friuits', 'DosaBatter', 'Milk', 'Yogurt', 'Spices', 'Masala', 'Rice', 'Wheat']
        },
        {
            key: 'Travel', value: ['Train', 'Bus', 'Car', 'Bike', 'Taxi']
        },
        {
            key: 'OneTimeExpense', value: ['HomeAppliance', 'StudyMaterials', 'TravelCards', 'VehiclePurchase', 'AppartmentRent', 'Electronics', 'TravelUtilities', 'Grooming']
        },
        {
            key: 'Fitness', value: ['Gym', 'Football', 'Cricket', 'Others']
        },
        {
            key: 'BillPayments', value: ['Netflix', 'Amazon', 'Apple', 'MobileRecharge', 'Utilities', 'Room', 'Hotstar', 'Sooka', 'AstroGo', 'Electicity', 'Water', 'Bank', 'Others']
        },
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

    setGlobalData(inp: Globaldata) {
        console.log(inp, 'inp')
        this.GlobalData = inp
    }
    getChartCategories(page: string, chart: string): string[] {
        let categories: string[] = []
        switch (page) {
            case 'Home':
                switch (chart) {
                    case 'Bar':
                        categories = ['By Category', 'By Purchmode', 'By Necessity']
                        break;
                    case 'Pie':
                        categories = ['By Category', 'By Purchmode', 'By Necessity']
                        break;
                    default:
                        categories = ['By Category', 'By Purchmode', 'By Necessity']
                        break;
                }
                break;

            case 'Daily':
                switch (chart) {
                    case 'Bar':
                        categories = ['By Date', 'By Category', 'By Purchmode', 'By Necessity']
                        break;
                    case 'Pie':
                        categories = ['By Date', 'By Category', 'By Purchmode', 'By Necessity']
                        break;
                    default:
                        categories = ['By Date', 'By Category', 'By Purchmode', 'By Necessity']
                        break;
                }
                break;

            case 'Mon':
                switch (chart) {
                    case 'Bar':
                        categories = ['By Date']
                        break;
                    case 'Pie':
                        categories = ['By Date']
                        break;
                    default:
                        categories = ['By Date']
                        break;
                }
                break;

            default:
                break;
        }
        return categories
    }
    ConsildatebyMonth(month: number, year: number, ModalData: ModalFile[]): ModalFile[] {
        let dailyitemsarr: ModalFile[] = []
        const dymmydata1: ModalFile[] = JSON.parse(JSON.stringify(ModalData));
        const getDays = (year: number, month: number) => new Date(year, month, 0).getDate()

        const days = getDays(year, month)
        console.log(days)
        let noofdays = [...Array(days).keys()].slice(1);
        noofdays.forEach((item: number) => {
            let day: number = item
            let dailyCumItems = dymmydata1.filter((item) => { return (item.dateno == day && item.month == month && item.year == year) })
            let array1: ModalFile[] = dymmydata1.filter((item) => {
                return item.dateno == day && item.month == month && item.year == year
            })
            if (array1.length >= 1) {
                console.log(array1, "ada")
                // console.log(calculateDailytot(array1))
                let arritem: ModalFile = array1[0]
                arritem.mostusedcat = this.GetHighestspentData('category', dailyCumItems, this.calculatetot(dailyCumItems))
                arritem.amount = this.calculatetot(array1)
                //arritem.mostusedcat = PieCategories.GetHighestspentData('category', dailyCumItems, calculateDailytot(dailyCumItems))
                // let DailyItems = AllData.filter((item) => { return (item.month == month && item.year == year) })
                dailyitemsarr.push(arritem)
            }
        })
        console.log(dailyitemsarr)
        let prev1: number = 0
        dailyitemsarr.forEach((item, iter) => {
            if (iter == 0) {
                prev1 = item.amount
            }
            let percent = Math.round(((item.amount - prev1) / prev1) * 100)
            prev1 = item.amount
            item.trendrate = String(percent)
            if (percent == 0) {
                item.trendicon = 'neutral'
            } else if (percent > 0) {
                item.trendicon = 'up'
            } else {
                item.trendicon = 'down'
            }
        })
        return dailyitemsarr
    }

    SetbarchartData(bymode: string, ModalData: ModalFile[], AllData?: ModalFile[],
        page?: string): [[]] {
        let Bardata: any = [[bymode, "Amount"]]
        let baritem: any[] = []

        let filtereditems = this.GroupData_gc(bymode, ModalData)

        filtereditems.forEach((item) => {
            baritem = []
            baritem.push(String(item.name), item.value)
            Bardata.push(baritem)
        })
        // console.log(Bardata, 'sadss', typeof (Bardata))
        return Bardata;
    }

    SetpiebarforSubcat(bymode: string, ModalData: ModalFile[], cat?: string): [[]] {
        let Bardata: any = [['Category', "Amount"]]
        let baritem: any[] = []
        let filtereditems = this.GroupData_SubCat(bymode, ModalData, cat!)
        filtereditems.forEach((item) => {
            baritem = []
            baritem.push(String(item.name), item.value)
            Bardata.push(baritem)
        })
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

    getSubCatArr(cat: string): string[] {
        let filtered = this.UserSubCat.filter((item) => { return item.key == cat })
        console.log(filtered, "adas")
        return filtered[0].value
    }
    GroupData_SubCat(bymode: string, inp: ModalFile[], cat: string): PieChartIntf[] {
        let ModalData: PieChartIntf[] = []

        switch (bymode) {
            case 'Date':
                inp.forEach((item) => {
                    ModalData.push({ name: item.date, value: item.amount })
                })
                break;
            case 'Category':
                this.getSubCatArr(cat).forEach((item) => {
                    let suncat = item
                    let filetreditems: ModalFile[] = inp.filter((item) => { return (item.subcategory === suncat) })
                    console.log("SubData", filetreditems)
                    if (filetreditems.length >= 1) {
                        ModalData.push({ name: suncat, value: this.calculatetot(filetreditems) })
                    }
                })
                break;
            default:
                break;
        }

        return ModalData
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
                    // console.log(filetreditems, "filtered", cat, ModalData)
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
                    PieData.push({ name: item.date, value: item.amount })
                })
                break;
            case 'Month':
                let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
                this.Calenderinfo.forEach((cat) => {
                    let filetreditems: ModalFile[] = ModalData.filter((item) => { return (item.month === cat.key && item.year == year) })
                    if (filetreditems.length >= 1) {
                        PieData.push({ name: cat.value, value: this.calculatetot(filetreditems) })
                    }
                })
                break;
            case 'Year':
                ModalData.forEach((item) => {
                    PieData.push({ name: item.date, value: item.amount })
                })
                break;
            case 'Week':
                ModalData.forEach((item) => {
                    PieData.push({ name: item.date, value: item.amount })
                })
                break;
            case 'Date':
                ModalData.forEach((item) => {
                    PieData.push({ name: item.date, value: item.amount })
                })
                break;
            default:
                ModalData.forEach((item) => {
                    PieData.push({ name: item.date, value: item.amount })
                })
            // break;
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

    getFirstDayOfWeek(d: Date): Date {
        // 👇️ clone date object, so we don't mutate it
        const date = new Date(d);
        const day = date.getDay(); // 👉️ get day of week

        // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);

        return new Date(date.setDate(diff));
    }

    GetWeekDataforTable<T, U>(InData: ModalFile[], RetType: U): Array<U> {

        let ModalData: ModalFile[] = InData as unknown as ModalFile[];
        let RetData: ModalFile[] = []
        const date = new Date(new Date());
        let CurrentWeek = this.getFirstDayOfWeek(new Date());

        let WeekItem: any[] = []
        let WeekAmtArr = []

        for (let index = 1; index < 7; index++) {
            let filteredData: ModalFile[] = []
            let Enddate = CurrentWeek.getDate() - 1;
            let EndMonth = CurrentWeek.getMonth() + 1;
            let EndYear = CurrentWeek.getFullYear();

            let date1 = new Date(CurrentWeek);
            date1.setDate(date1.getDate() - 7)

            let Startdate = date1.getDate();
            let StartMonth = date1.getMonth() + 1;
            let StartYear = date1.getFullYear();
            console.log("WeekData", Startdate, Enddate, date1)

            switch (StartMonth == EndMonth) {
                case false:
                    let month1 = ModalData.filter((item) => {
                        return item.dateno >= Startdate && item.month == StartMonth && item.year == StartYear
                    })
                    let month2 = ModalData.filter((item) => {
                        return item.dateno <= Enddate && item.month == EndMonth && item.year == StartYear
                    })
                    filteredData = month1.concat(month2)
                    break;
                default:
                    filteredData = ModalData.filter((item) => {
                        return (item.dateno >= Startdate && item.dateno <= Enddate) &&
                            (item.month >= StartMonth && item.month <= EndMonth) &&
                            (item.year >= StartYear && item.year <= EndYear)
                    })
                    break;
            }
            WeekItem = []
            let FinalData = this.filterExceptionCategorylist(filteredData)
            if (FinalData.length > 1) {
                let Weekno: string = String(this.getMonth(StartMonth) + '-' + this.getWeekOfMonth(date1))
                WeekItem.push(Weekno, parseFloat(this.calculatetot(FinalData).toFixed(2)))
                // WeekData.chartData.push(WeekItem)
                let Item: ModalFile = {
                    date: Weekno,
                    amount: parseFloat(this.calculatetot(FinalData).toFixed(2)),
                    currency: this.GlobalData.currlabel,
                    time: '',
                    category: '',
                    subcategory: '',
                    availmode: '',
                    necessity: '',
                    comments: '',
                    trendrate: '',
                    trendicon: '',
                    mostusedcat: this.GetHighestspentData('category', FinalData, this.calculatetot(FinalData)),
                    mostusedpurchmode: '',
                    dateno: 0,
                    month: 0,
                    monthstr: '',
                    year: 0
                }
                RetData.push(Item);
            }
            CurrentWeek = date1
            WeekAmtArr.push(parseFloat(this.calculatetot(FinalData).toFixed(2)))
        }
        console.log('Week Data', RetData)

        let prev: number = 0
        RetData.reverse()
        RetData.forEach((item, iter) => {
            let percent: number = 0; //Math.round(((item.amount - prev) / prev) * 100)
            iter === 0 ? percent = 0 : percent = Math.round(((item.amount - prev) / prev) * 100);

            prev = item.amount
            item.trendrate = String(percent)
            if (percent == 0) {
                item.trendicon = 'neutral'
            } else if (percent > 0) {
                item.trendicon = 'up'
            } else {
                item.trendicon = 'down'
            }
        })
        return RetData as unknown as Array<U>;
    };

    GetWeeklySpent(ModalData: ModalFile[]): TredWidgets {
        const date = new Date(new Date());
        let CurrentWeek = this.getFirstDayOfWeek(new Date());
        let WeekDataheader: any = ['Weekno', "Amount"]
        let WeekData: TredWidgets = { chartData: [], AvgDailySpent: 0, AvgWeekspent: 0 }
        let WeekItem: any[] = []
        let WeekAmtArr = []

        for (let index = 1; index < 7; index++) {
            let filteredData: ModalFile[] = []
            let Enddate = CurrentWeek.getDate() - 1;
            let EndMonth = CurrentWeek.getMonth() + 1;
            let EndYear = CurrentWeek.getFullYear();

            let date1 = new Date(CurrentWeek);
            date1.setDate(date1.getDate() - 7)

            let Startdate = date1.getDate();
            let StartMonth = date1.getMonth() + 1;
            let StartYear = date1.getFullYear();
            console.log("WeekData", Startdate, Enddate, date1)


            switch (StartMonth == EndMonth) {
                case false:
                    let month1 = ModalData.filter((item) => {
                        return item.dateno >= Startdate && item.month == StartMonth && item.year == StartYear
                    })
                    let month2 = ModalData.filter((item) => {
                        return item.dateno <= Enddate && item.month == EndMonth && item.year == StartYear
                    })
                    filteredData = month1.concat(month2)
                    break;
                default:
                    filteredData = ModalData.filter((item) => {
                        return (item.dateno >= Startdate && item.dateno <= Enddate) &&
                            (item.month >= StartMonth && item.month <= EndMonth) &&
                            (item.year >= StartYear && item.year <= EndYear)
                    })
                    break;
            }
            WeekItem = []
            let FinalData = this.filterExceptionCategorylist(filteredData)
            if (FinalData.length > 1) {
                let Weekno: string = String(this.getMonth(StartMonth) + '-' + this.getWeekOfMonth(date1))
                WeekItem.push(Weekno, parseFloat(this.calculatetot(FinalData).toFixed(2)))
                WeekData.chartData.push(WeekItem)
            }
            CurrentWeek = date1
            WeekAmtArr.push(parseFloat(this.calculatetot(FinalData).toFixed(2)))
        }

        WeekData.chartData.reverse()
        WeekData.chartData.unshift(WeekDataheader);
        WeekData.AvgWeekspent = parseFloat(this.getAvgSpentby_noofWeeks(WeekAmtArr, 7).toFixed(2))
        WeekData.AvgDailySpent = parseFloat((WeekData.AvgWeekspent / 7).toFixed(2))
        return WeekData;
    }

    getAvgSpentby_noofWeeks(ModalData: number[], Weekcount: number): number {
        let total_amt = ModalData.reduce((total, num) => { return total + num }, 0)
        return total_amt / Weekcount
    }

    filterExceptionCategorylist(ModalData: ModalFile[]): ModalFile[] {
        let FinalData: ModalFile[] = []
        ModalData.map((list) => {
            let Exceptioncat = this.Exception_categorylist.find((item) => { return item.key == list.category })
            if (Exceptioncat != undefined) {
                let subcat = Exceptioncat.value.find((item) => { return item == list.subcategory })
                if (subcat == undefined) {
                    FinalData.push(list)
                }
            } else {
                FinalData.push(list)
            }
        })
        return FinalData
    }
    getWeekOfMonth(date: Date): number {
        let adjustedDate = date.getDate() + date.getDay();
        let prefixes = ['0', '1', '2', '3', '4', '5'];
        return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
    }

    getMonth(no: number): string {
        return this.Calenderinfo.filter((item) => { return item.key == no })[0].value.substring(0, 3)
    }

    getMostUsedCategory(ModalData: ModalFile[]): { cat: string, items: ModalFile[] } {
        let CatItem: { cat: string, items: ModalFile[] } = { cat: "", items: [] }
        let catArray: { cat: string, count: number, items: ModalFile[] }[] = []
        this.Usercat.map((cat) => {
            let Catitems = ModalData.filter((item) => { return item.category == cat })
            catArray.push({ cat: cat, count: Catitems.length, items: Catitems })
        })
        catArray.sort((a, b) => b.count - a.count)
        CatItem = { cat: catArray[0].cat, items: catArray[0].items }
        return CatItem
    }

    GetWeeklySpentonCategory(ModalData: ModalFile[]): TredWidgets {
        let CatItems = this.getMostUsedCategory(ModalData)
        console.log(CatItems, "CatItems")
        return this.GetWeeklySpent(CatItems.items)
    }

    GetCategoryCount(category: string, ModalData: ModalFile[]): { cat: string, count: number } {
        let cat = { cat: category, count: ModalData.filter((item) => { return item.category == category }).length }
        return cat
    }

    getfilteredItemsbydates(ModalData: ModalFile[], inp1: Date, inp2?: Date): ModalFile[] {

        let filtered: ModalFile[] = []

        let Enddate: number;
        let EndMonth: number = 99;
        let EndYear: number;

        if (inp2 != undefined) {
            Enddate = inp2.getDate();
            EndMonth = inp2.getMonth() + 1;
            EndYear = inp2.getFullYear();
        }

        let Startdate = inp1.getDate();
        let StartMonth = inp1.getMonth() + 1;
        let StartYear = inp1.getFullYear();

        switch (StartMonth == EndMonth) {
            case false:
                let month1 = ModalData.filter((item) => {
                    return item.dateno == Startdate && item.month == StartMonth && item.year == StartYear
                })
                let month2 = ModalData.filter((item) => {
                    return item.dateno == Enddate && item.month == EndMonth && item.year == StartYear
                })
                filtered = month1.concat(month2)
                break;
            default:
                filtered = ModalData.filter((item) => {
                    return (item.dateno >= Startdate && item.dateno <= Enddate) &&
                        (item.month >= StartMonth && item.month <= EndMonth) &&
                        (item.year >= StartYear && item.year <= EndYear)
                })
                break;
        }

        return filtered
    }
    getCatgorySpentCount_byWeek(ModalData: ModalFile[]): [[]] {
        const date = new Date(new Date());
        let CurrentWeek = this.getFirstDayOfWeek(new Date());
        let WeekDataheader: any = ['Weekno']
        let WeekData: any = []
        let WeekItem: any[] = []

        this.Usercat.map((item) => {
            WeekDataheader.push(item)
        })

        for (let index = 1; index < 7; index++) {
            let filteredData: ModalFile[] = []
            let Enddate = CurrentWeek.getDate();
            let EndMonth = CurrentWeek.getMonth() + 1;
            let EndYear = CurrentWeek.getFullYear();

            let date1 = new Date(CurrentWeek);
            date1.setDate(date1.getDate() - 7)

            let Startdate = date1.getDate();
            let StartMonth = date1.getMonth() + 1;
            let StartYear = date1.getFullYear();

            switch (StartMonth == EndMonth) {
                case false:
                    let month1 = ModalData.filter((item) => {
                        return item.dateno >= Startdate && item.month == StartMonth && item.year == StartYear
                    })
                    let month2 = ModalData.filter((item) => {
                        return item.dateno <= Enddate && item.month == EndMonth && item.year == StartYear
                    })
                    filteredData = month1.concat(month2)
                    break;
                default:
                    filteredData = ModalData.filter((item) => {
                        return (item.dateno >= Startdate && item.dateno <= Enddate) &&
                            (item.month >= StartMonth && item.month <= EndMonth) &&
                            (item.year >= StartYear && item.year <= EndYear)
                    })
                    break;
            }
            CurrentWeek = date1

            WeekItem = []
            let Weekno: string = String(this.getMonth(StartMonth) + '-' + this.getWeekOfMonth(date1))
            WeekItem.push(Weekno)
            this.Usercat.map((item) => {
                WeekItem.push(this.GetCategoryCount(item, filteredData).count)
            })
            WeekData.push(WeekItem)
        }
        WeekData.reverse()
        WeekData.unshift(WeekDataheader);
        return WeekData
    }

    ConcatValues_fr_BarchartLabelling<T, U>(Inp: T[], NextVal: U): T[] {
        let retValue = Inp.concat(NextVal as any)
        retValue.push(this.BarChartLabel_Anno as any)
        // console.log('Ret Value',retValue)
        return retValue;
    };

    getCatgorySpentAmount_byWeek(ModalData: ModalFile[]): [[]] {
        const date = new Date(new Date());
        let CurrentWeek = this.getFirstDayOfWeek(new Date());
        let WeekDataheader: any = ['Weekno']
        let WeekData: any = []
        let WeekItem: any[] = []

        this.Usercat.map((item) => {
            WeekDataheader.push(item)
        })

        // let WeekDataheader: any = ['Weekno']
        // this.Usercat.map((item) => {
        //     WeekDataheader = this.ConcatValues_fr_BarchartLabelling(WeekDataheader, item)
        // })
        // console.log('Label Added', WeekDataheader)

        for (let index = 1; index < 7; index++) {
            let filteredData: ModalFile[] = []
            let Enddate = CurrentWeek.getDate() - 1;
            let EndMonth = CurrentWeek.getMonth() + 1;
            let EndYear = CurrentWeek.getFullYear();

            let date1 = new Date(CurrentWeek);
            date1.setDate(date1.getDate() - 7)

            let Startdate = date1.getDate();
            let StartMonth = date1.getMonth() + 1;
            let StartYear = date1.getFullYear();

            switch (StartMonth == EndMonth) {
                case false:
                    let month1 = ModalData.filter((item) => {
                        return item.dateno >= Startdate && item.month == StartMonth && item.year == StartYear
                    })
                    let month2 = ModalData.filter((item) => {
                        return item.dateno <= Enddate && item.month == EndMonth && item.year == StartYear
                    })
                    filteredData = month1.concat(month2)
                    break;
                default:
                    filteredData = ModalData.filter((item) => {
                        return (item.dateno >= Startdate && item.dateno <= Enddate) &&
                            (item.month >= StartMonth && item.month <= EndMonth) &&
                            (item.year >= StartYear && item.year <= EndYear)
                    })
                    break;
            }
            CurrentWeek = date1

            WeekItem = []
            if (filteredData.length > 0) {
                let Weekno: string = String(this.getMonth(StartMonth) + '-' + this.getWeekOfMonth(date1))
                WeekItem.push(Weekno)
                // eslint-disable-next-line no-loop-func, array-callback-return
                this.Usercat.map((item) => {
                    let filterbyCat = filteredData.filter((weekdata) => { return weekdata.category === item })
                    let total = this.calculatetot(filterbyCat)
                    WeekItem.push(total)
                    // WeekItem.push(total.toFixed(2))
                })
                WeekData.push(WeekItem)
            }
        }
        WeekData.reverse()
        WeekData.unshift(WeekDataheader);
        return WeekData
    }
}

export default PieCat;