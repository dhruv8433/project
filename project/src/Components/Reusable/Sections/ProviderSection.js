import {
  Box,
  Button,
  Container,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import { useTheme } from "@emotion/react";
import Partner from "./Partner";
import { Link } from "react-router-dom";

const ProviderSection = ({ Provider, loading }) => {
  const theme = useTheme();
  return (
    <div>
      <>
        <div style={{ background: theme.palette.background.box }}>
          <Container>
            <Box key={Provider.key}>

              {loading ? (
                <Skeleton variant="rectangular" width={200} height={50} />) : (<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Box>
                    <Typography
                      fontSize={theme.palette.fonts.h2}
                      marginBottom={"-2px"}
                      marginTop={1}
                    >
                      {Provider.title}
                    </Typography>
                  </Box>
                  <Box>
                    <Link to={'/providers'}>
                      <Button variant="outlined">View all Providers</Button>
                    </Link>
                  </Box>
                </Box>)}

              <Divider />
              <Box sx={{ marginTop: 2, marginBottom: 2, gap: 12, display: "flex", pb: "12px" }}>
                {Provider.partners.slice(0, 3).map((partner) => {
                  return (
                    <Partner partner={partner} />
                  );
                })}
              </Box>
            </Box>
          </Container>
        </div>
      </>
    </div>
  );
};

export default ProviderSection;
