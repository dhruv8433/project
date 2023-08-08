//incomplete

import { Box, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import React from 'react'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const DateTime = () => {

    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    return (
        <div>
            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                        <Typography>Select Date:</Typography>
                        <DemoItem>
                            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
            <Box>
                <Typography>Select Time:</Typography>
                <Box border={"1px solid gray"} width={"fit-content"}>   
                    09.00 to 10.00
                </Box>
            </Box>
        </div>
    )
}

export default DateTime
