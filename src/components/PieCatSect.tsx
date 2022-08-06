import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PieCat from './PieCategories'
import './main.css'
import { ModalFile } from './interface';

// const PieCategories = new PieCat()
// console.log(PieCategories.Categories)

interface PieProps {
    setPieData: (ModalData: { name: string, value: number }[]) => void;
    TablecatSelect: { page: string, cat: string }
    AllData: ModalFile[]
    ModalData: ModalFile[]
    total: number
    PieCategories: PieCat
    page: string
    charttype:string
    setBarModalData: (ModalData: string[][]) => void;
    setPieModalData: (ModalData: string[][]) => void;
}
const PieCatSelect: React.FC<PieProps> = (props) => {

    const handleChange = (event: SelectChangeEvent) => {
        let selected = event.target.value
        switch (selected) {
            case 'By Necessity':
                selected = 'Necessity'
                break;
            case 'By Category':
                selected = 'Category'
                break;
            case 'By Date':
                selected = 'Date'
                break;
            default:
                selected = 'Category'
                break;
        }
        if (props.page == 'Mon' || props.page == 'Daily') {
            
        }
        if (props.TablecatSelect.page == 'Daily') {
            let month = parseInt(props.TablecatSelect.cat)
            let filtered = props.AllData.filter((item) => { return item.month == month })
            if (selected == 'Date') {
                let groupdata = props.PieCategories.ConsildatebyMonth(month, 2022, filtered)
                props.setBarModalData(props.PieCategories.SetbarchartData(selected, groupdata))
            } else {
                props.setBarModalData(props.PieCategories.SetbarchartData(selected, filtered))
            }

            props.setPieModalData(props.PieCategories.SetbarchartData(selected, filtered))
            return
        }
        console.log(props.ModalData)
        props.setPieData(props.PieCategories.GroupData(selected, props.ModalData, props.total))
        props.setBarModalData(props.PieCategories.SetbarchartData(selected, props.ModalData))
        props.setPieModalData(props.PieCategories.SetbarchartData(selected, props.ModalData))
    };

    return (
        <div className='pieCat-sel'>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small" variant="standard">
                    <InputLabel id="demo-simple-select-label">Sel. Category</InputLabel>
                    <Select
                        autoWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //   value={age}
                        //   label="Sel. Category"
                        onChange={handleChange}
                    >
                        {/* {props.PieCategories.Categories[props.page == 'Home' ? 0 :
                            props.page == 'Daily' || props.page == 'BarCh' || props.page == 'Mon'  ? 1 : 0].Categories.map((option: string) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))} */}

                            {props.PieCategories.getChartCategories(props.page,props.charttype).map((option: string) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}

                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}

export default PieCatSelect