import { Card, CardContent } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import slugify from 'slugify';

const Category = ({ category }) => {
    const slug = slugify(category.name, { lower: true });
    return (
        <div>
            <Link
                to={"/categories/" + category.id + "/" + slug}
                style={{ textDecoration: "none" }}
            >
                <Card
                    className="creative_category"
                    key={category.id}
                    sx={{
                        mt: 3,
                        mb: 2,
                        width: 200,
                        height: 200,
                        border: "1px solid #e4e4e4",
                        background: "white",
                    }}
                >
                    <img
                        alt="service_image"
                        src={category.category_image}
                        title={category.name}
                        style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <CardContent sx={{ textAlign: "center", mt: -6 }}>
                        <NavLink
                            gutterbottom
                            variant="a"
                            to={"/categories/" + category.id + "/" + slug}
                            component="div"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            <h4 style={{ fontWeight: 400 }}>
                                {category.name}
                            </h4>
                        </NavLink>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default Category
