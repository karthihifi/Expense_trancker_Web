import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import  './main.css'


interface SideBarProps {
    // handleCliclPageChange(pageSelect: string): any
    handleCliclPageChange: (pageSelect: any) => void;
}
const SideBar: React.FC<SideBarProps> = (props) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: '#866ec7' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                // <ListSubheader component="div" id="nested-list-subheader" className='Sidebar_header' >
                //    Expense Report
                // </ListSubheader>
                <h3>Expense Report</h3>
            }
        >
            <ListItemButton
              onClick={() => props.handleCliclPageChange('Home')}
            >
                <ListItemIcon>
                    <AssessmentIcon style={{ color: "#fff" }}/>
                </ListItemIcon>
                <ListItemText primary="Daily Report" />
            </ListItemButton>
            <ListItemButton onClick={() => props.handleCliclPageChange('Mon')}>
                <ListItemIcon>
                    <SummarizeIcon style={{ color: "#fff" }}/>
                </ListItemIcon>
                <ListItemText primary="Monthly Report" />
            </ListItemButton >
            <ListItemButton onClick={() => props.handleCliclPageChange('Year')}>
                <ListItemIcon>
                    <CurrencyYenIcon style={{ color: "#fff" }}/>
                </ListItemIcon>
                <ListItemText primary="Yearly Report" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon style={{ color: "#fff" }}/>
                </ListItemIcon>
                <ListItemText primary="Analysis" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => props.handleCliclPageChange('BarCh')}>
                        <ListItemIcon>
                            <BarChartIcon style={{ color: "#fff" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Bar Chart" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => props.handleCliclPageChange('PieCh')}>
                        <ListItemIcon>
                            <PieChartIcon  style={{ color: "#fff" }}/>
                        </ListItemIcon>
                        <ListItemText primary="Pie Chart"/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}

export default SideBar
