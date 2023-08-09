import React, { useEffect, useState } from "react";
import api from "../../../API/Fetch_data_Api";
import SwiperHome from "./SwiperHome";
import CategoriesSection from "./CategoriesSection";
import ProviderSection from "./ProviderSection";
import SubCategories from "./SubCategories";
import { Box, Container } from "@mui/material";
import { useTheme } from "@emotion/react";
import { PartnerSkeleton, SkeletonSubCategory } from "./Skeletons";

const HomeFinal = () => {
    const [slider, setSlider] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sections, setSections] = useState([]);
    const [aboutUs, setAboutUs] = useState([]);

    //for displayig skeleton we use loading and setLoading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get_settings().then((setting) => {
            console.log(setting.data.about_us);
            localStorage.setItem("About_us",setting.data.about_us.about_us);
            localStorage.setItem("Privacy",setting.data.privacy_policy.privacy_policy);
            localStorage.setItem("Terms",setting.data.terms_conditions.terms_conditions);
        });
    }, []);

    // fetching all section that required for ourr home screen data
    function fetchHome() {
        api
            .get_home_screen()
            .then((response) => {
                setSlider(response.data.sliders);
                setCategories(response.data.categories);
                setSections(response.data.sections);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }

    //fetching cart if user is already registered and log out than when they back their bookmark here
    function bookmark() {
        api.get_bookmarks()
            .then((response) => {
                console.log(response);
            })
            .catch((e) => console.log(e));
    }

    //fetchign cart if user is already registered and log out than when they back their data here
    function cart() {
        api.get_cart()
            .then((response) => {
                console.log(response)
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        fetchHome();
    }, []);

    const login = localStorage.getItem("isLoggedIn")
    if (login) {
        bookmark();
        cart();
    }

    const theme = useTheme();

    return (
        <div>
            <SwiperHome sliderData={slider} loading={loading} />
            <CategoriesSection categories={categories} loading={loading} />

            {/* Show appropriate skeleton until data is fetched */}
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        background: theme.palette.background.box,
                    }}
                >
                    <Container>
                        <br />
                        <Box sx={{ display: "flex", gap: "20px", mt: 1, mb: 1 }}>
                            {Array.from(Array(4).keys()).map((index) => (
                                <SkeletonSubCategory key={index} />
                            ))}
                        </Box>
                        <br />
                        <Box sx={{ display: "flex", gap: "80px", mt: 1, mb: 1 }}>
                            {Array.from(Array(3).keys()).map((index) => (
                                <PartnerSkeleton key={index} />
                            ))}
                        </Box>
                    </Container>
                </div>
            ) : (
                sections.map((section) => {
                    if (section.section_type === 'partners' || section.section_type === 'top_rated_partner') {
                        return <ProviderSection key={section.id} Provider={section} loading={loading} />
                    }
                    else if (section.section_type === 'sub_categories') {
                        return <SubCategories key={section.id} subCategory={section} loading={loading} />
                    }
                    return null; // Handle other section types here if needed.
                })
            )}
        </div>
    );
};

export default HomeFinal;