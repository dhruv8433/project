import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'

const SubCategory = ({ subCategory }) => {
    return (
        <div>
            <div key={subCategory.id}>
                {/* think company name where to render  */}
                <Link
                    to={`/providers/services/${subCategory.parent_id}/${subCategory.company_name}`}
                    style={{ textDecoration: "none" }}
                >
                    <Card
                        className="service-card"
                        key={subCategory.id}
                        sx={{
                            width: 260,
                            height: 220,
                            borderRadius: "10px",
                            marginBottom: 2,
                        }}
                    >
                        <img
                            src={subCategory.image}
                            title={subCategory.name}
                            alt="service_image"
                            style={{
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                objectFit: "cover",
                                display: "flex",
                                filter: "brightness(0.5)",
                            }}
                        // we have to implemenmt provider/service/...
                        />
                        <Box marginTop={-5} textAlign={"center"}>
                            <Typography
                                variant="h6"
                                zIndex={1}
                                position={"relative"}
                            >
                                <NavLink
                                    to={
                                        "/providers/services/293/world-clean-pvt-ltd"
                                    }
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                        fontWeight: 600,
                                    }}
                                >
                                    {subCategory.name}
                                </NavLink>
                            </Typography>
                        </Box>
                    </Card>
                </Link>
            </div>
        </div>
    )
}

export default SubCategory
