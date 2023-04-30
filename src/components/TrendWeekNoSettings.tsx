import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { orange } from '@mui/material/colors';


const marks = [
    {
        value: 1,
        label: '1',
    },
    // {
    //   value: 20,
    //   label: '20°C',
    // },
    // {
    //   value: 37,
    //   label: '37°C',
    // },
    {
        value: 10,
        label: '10',
    },
];

function valuetext(value: any) {
    return value;
}


export default function TrendWeekSlider() {
    return (
        <Box width={100}>
            {/* <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      /> */}
            <Slider min={1} max={10} defaultValue={7}
            // sx={{color: orange}}
                color='secondary'
                // getAriaValueText={valuetext}
                // marks={marks}
                aria-label="Default" valueLabelDisplay="auto" />
        </Box>
    );
}
