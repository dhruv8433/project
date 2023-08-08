import React from 'react'
import { Box, Typography } from '@mui/material'

export const Aboutparagraph = () => {
    return (
        <Box textAlign={"start"} m={1}>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
              inventore et veritatis facere sequi impedit eveniet eos a quos nisi
              accusantium non vero, optio officia, perspiciatis magni consequatur
              quam quas odio voluptatum sit rerum ad in dolorem! Dolorum, sequi
              iure consequuntur consequatur voluptas, vel, cum debitis tempora
              quidem optio architecto! Iusto vel doloribus saepe inventore. Magni
              aliquam necessitatibus voluptatum doloribus sint exercitationem
              quaerat eligendi ut quas at minus architecto atque, optio,
              laudantium possimus! Laboriosam accusamus, perferendis nemo
              repudiandae maiores natus nihil tempore est dolore commodi tenetur
              necessitatibus? Fuga commodi rem sapiente magni, ipsa numquam fugit,
              deserunt iste aliquid enim nesciunt!
            </Typography>
        </Box>
    )
}

export const AboutList = () => {
    return (
        <Box m={2}>
            <Typography variant="body1" color="text.secondary" pt={1}>
                <li> Lorem ipsum dolor sit, amet consectetur adipisicing elit. </li>
            </Typography>
            
            <Typography variant="body1" color="text.secondary" pt={1}>
                <li> Lorem ipsum dolor sit, amet consectetur adipisicing elit. </li>
            </Typography> 
            
            <Typography variant="body1" color="text.secondary" pt={1}>
                <li> Lorem ipsum dolor sit, amet consectetur adipisicing elit. </li>
            </Typography>
        </Box>
    )
}
