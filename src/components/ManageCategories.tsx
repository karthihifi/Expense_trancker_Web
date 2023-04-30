import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CategoryIcon from '@mui/icons-material/Category';
import Badge from 'react-bootstrap/Badge';

export default function ManageCategories() {
    return (
        <Stack spacing={2} direction="row">
            <Button color='secondary' size="small" variant="text" startIcon={<CategoryIcon></CategoryIcon>}>Manage Categories</Button>
            {/* <Badge bg="light" text="dark">
                Primary
            </Badge > */}
        </Stack>
    );
}
