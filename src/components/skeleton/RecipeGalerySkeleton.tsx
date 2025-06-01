import { Box, Divider, Grid, Skeleton } from "@mui/material"
import Footer from "../../layout/Footer"
import Header from "../../layout/Header"

const RecipeGalerySkeleton = () => {


    return (
        <>
            <Header />
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    bgcolor: '#FCF7EB',
                }}
                >
                <Box
                    sx={{
                    width: { xs: '80%', sm: '85%', md: '85%', lg: '1000px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    mb: 4,
                    }}
                >
                    <Box
                    sx={{
                        width: '100%',
                        mt: 16,
                        height: '100%',
                        boxShadow: 2,
                        bgcolor: '#FFFBF2',
                        borderRadius: 2,
                        p: 4,
                    }}
                    >
                    <Box>
                        {/* Title + Button Skeleton */}
                        <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                            flexDirection: { xs: 'column', md: 'row' },
                        }}
                        >
                        <Skeleton variant="text" width={260} height={40} sx={{ mb: { xs: 2, md: 0 } }} />
                        <Skeleton variant="rectangular" width={180} height={36} />
                        </Box>

                        {/* Select Skeleton */}
                        <Skeleton variant="rectangular" height={56} width="100%" sx={{ borderRadius: 1 }} />

                        <Divider sx={{ width: '100%', mt: 2, mb: 3 }} />
                    </Box>

                    {/* Card skeletons */}
                    <Box minHeight="40vh">
                        <Grid container spacing={4}>
                        {[...Array(6)].map((_, index) => (
                            <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
                            <Box
                                sx={{
                                bgcolor: 'white',
                                borderRadius: 2,
                                p: 2,
                                boxShadow: 1,
                                height: 200,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                }}
                            >
                                <Skeleton variant="text" width="80%" height={30} />
                                <Skeleton variant="text" width="60%" height={20} />
                                <Skeleton variant="rectangular" width="100%" height={36} sx={{ mt: 2 }} />
                            </Box>
                            </Grid>
                        ))}
                        </Grid>
                    </Box>

                    {/* Pagination skeleton */}
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Skeleton variant="rectangular" width={200} height={36} />
                    </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default RecipeGalerySkeleton