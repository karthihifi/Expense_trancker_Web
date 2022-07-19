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
import './main.css'
import ProfileMenu from './ProfileSettings'
import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import Divider from '@mui/material/Divider';

interface SideBarProps {
    // handleCliclPageChange(pageSelect: string): any
    handleCliclPageChange: (pageSelect: any) => void;
    profiledata: {
        currlabel: string, currsymbol: string, countryname: string,
        flag: string
    }
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
                <ListSubheader component="div" sx={{ bgcolor: '#866ec7', margin: '15px 0' }} id="nested-list-subheader" className='Sidebar_header' >
                    <ProfileMenu profiledata={props.profiledata}></ProfileMenu>
                </ListSubheader>
            }
        >
            <ListItemButton
                onClick={() => props.handleCliclPageChange('Profile')}
            >
                <ListItemIcon>
                    <SettingsIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Profile Settings" />
            </ListItemButton>

            <ListItemButton
                onClick={() => props.handleCliclPageChange('Currency')}
            >
                <ListItemIcon>
                    <CurrencyPoundIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Set Currency" />
            </ListItemButton>

            <ListItemButton
                onClick={() => props.handleCliclPageChange('Category')}
            >
                <ListItemIcon>
                    <CurrencyPoundIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Add Categories" />
            </ListItemButton>

            <Divider sx={{
                bgcolor: '#fff'
            }} />



            <ListItemButton
                onClick={() => props.handleCliclPageChange('Home')}
            >
                <ListItemIcon>
                    <AssessmentIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Daily Report" />
            </ListItemButton>
            <ListItemButton onClick={() => props.handleCliclPageChange('Mon')}>
                <ListItemIcon>
                    <SummarizeIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Monthly Report" />
            </ListItemButton >
            <ListItemButton onClick={() => props.handleCliclPageChange('Year')}>
                <ListItemIcon>
                    <CurrencyYenIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Yearly Report" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Analysis" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => props.handleCliclPageChange('BarCh')}>
                        <ListItemIcon>
                            <BarChartIcon style={{ color: "#fff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Bar Chart" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => props.handleCliclPageChange('PieCh')}>
                        <ListItemIcon>
                            <PieChartIcon style={{ color: "#fff" }} />
                        </ListItemIcon>
                        <ListItemText primary="Pie Chart" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}

export default SideBar
