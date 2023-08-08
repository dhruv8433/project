import { Box, Card, CardContent, Skeleton } from "@mui/material";

//every page's skeleton come from here 
export const SkeletonSwiperSlide = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Card
        sx={{
          mt: 3,
          mb: 2,
          width: 200,
          height: 200,
          boxShadow: "none"
        }}
      >
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4 }} />
        <CardContent sx={{ textAlign: "center", mt: -7 }}>
          <Skeleton width="100%" height="30px" />
        </CardContent>
      </Card>
    </Box>
  );
};

export const PartnerSkeleton = () => {
  return (
    <div>
      <div
        style={{
          width: "330px",
          maxWidth: "330px",
          border: "1px solid #f2f1f6",
          marginTop: 10,
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <Skeleton variant="rectangular" height={240} sx={{ marginBottom: 2 }} />
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          sx={{
            border: "5px solid white",
            borderRadius: "50px",
            cursor: "pointer",
            marginTop: "-60px",
            marginLeft: "50%",
            transform: "translateX(-50%)",
            marginBottom: 2,
          }}
        />
        <Skeleton
          variant="text"
          height={30}
          width={150}
          sx={{ marginBottom: 1, marginLeft: "auto", marginRight: "auto" }}
        />
        <Skeleton
          variant="text"
          height={30}
          width={80}
          sx={{ marginBottom: 1, marginLeft: "auto", marginRight: "auto" }}
        />
        <Skeleton
          variant="rectangular"
          height={1}
          width="70%"
          sx={{ marginBottom: 2, marginLeft: "auto", marginRight: "auto" }}
        />
        <Skeleton
          variant="text"
          height={30}
          width={200}
          sx={{
            marginBottom: 1,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 2,
          }}
        />
        <Skeleton
          variant="rectangular"
          height={1}
          width="40%"
          sx={{ marginBottom: 2, marginLeft: "auto", marginRight: "auto" }}
        />
        <Skeleton
          variant="rectangular"
          height={30}
          width={180}
          sx={{ marginBottom: 1, marginLeft: "auto", marginRight: "auto" }}
        />
      </div>
    </div>
  );
};

export const SkeletonSubCategory = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Card
        sx={{
          mt: 3,
          width: 275,
          height: 240,
          boxShadow: "none"
        }}
      >
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4 }} />
        <CardContent sx={{ textAlign: "center", mt: -7 }}>
          <Skeleton width="100%" height="30px" />
        </CardContent>
      </Card>
    </Box>
  );
};