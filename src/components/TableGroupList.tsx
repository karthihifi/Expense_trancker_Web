import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import PieCat from './PieCategories'
import { color } from '@mui/system';
import { red } from '@mui/material/colors';
import { ModalFile } from './interface';
import { Generic } from './interface'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';

interface GlobalProps {
    PieCategories: PieCat
    AllData: ModalFile[]
    listData: Generic[]
    month: number
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


const TableGroupList: React.FC<GlobalProps> = (props) => {

    console.log(props,"adsaads")
    let Symbol = props.PieCategories.GlobalData.currlabel

    const [isOpenCollapse, setIsOpenCollapse] = React.useState(-1);
    const [itemtxt, setitemtxt] = React.useState("");
    const [SubCatData, setSubCatData] = React.useState<Generic[]>([]);

    const handleClick = (clickedIndex: number, cat: string) => {
       
        setitemtxt(cat)
        let year = parseInt(new Date().toISOString().split('T')[0].split('-')[0])
        let ModalData = props.AllData.filter((item) => {
            return item.category == cat && props.month == item.month && item.year == year
        })
        console.log(ModalData,"ModalData")
        let subcatdata = props.PieCategories.GroupData_SubCat(ModalData, cat)
        
        setSubCatData(subcatdata)
        if (isOpenCollapse === clickedIndex) {
            setIsOpenCollapse(-1);
        } else {
            setIsOpenCollapse(clickedIndex);
        }
        // setOpen(!open);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Grid item xs={12} md={6}>
                <List dense={true}>
                    {props.listData.map((item, index) =>
                        <Box>
                            <ListItemButton onClick={() => handleClick(index, item.name)}>
                                <ListItem
                                    secondaryAction={
                                        <Typography variant='body2'>{item.value.toFixed(2) + ' ' + Symbol}</Typography>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon sx={{ color: red[100] }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                    />
                                </ListItem>
                                {isOpenCollapse === index ? <ExpandLess /> : <ExpandMore />}

                            </ListItemButton>
                            <Collapse in={isOpenCollapse === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                {SubCatData.map((item, index) =>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItem
                                            secondaryAction={
                                                <Typography variant='body2'>{item.value.toFixed(2) + ' ' + Symbol}</Typography>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <FolderIcon sx={{ color: red[100] }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                            />
                                        </ListItem>
                                    </ListItemButton>
                                )}
                                </List>
                            </Collapse>
                        </Box>
                    )}

                </List>
            </Grid>
        </Box>

    );
}

export default TableGroupList