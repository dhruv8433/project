import React from 'react'
import Layout from '../Components/layout/Layout'
import Categorys from '../Components/Reusable/Sections/Categorys'
const Category = () => {
    document.title = "Categories | eDemand"

    return (
        <Layout>
            <div>
                <Categorys />
            </div>
        </Layout>
    )
}

export default Category