import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import CguCard from '../components/cgu/CguCard';
import Header from '../layout/Header';
import ScrollTopButton from '../components/ScrollTopButton';
import Footer from '../layout/Footer';
import { cgvSections } from '../utils/cgvData';

const CgvPage: React.FC = () => {

  return (
    <>
        <Header />
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                bgcolor: {
                    xs: "#FFFBF2"
                },
            }}
        >
            <Box
                sx={{
                    width: {xs: "80%", sm: "85%", md: "85%", lg: "1000px"},
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        mb: 6,
                        mt: {xs: 10, sm: 0},
                        height: "100%"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            flexDirection: "column",
                            width: {
                                md: "calc(100% - 96px)",
                                sm: "calc(100% - 48px)"
                            },
                            bgcolor: "#FFFBF2",
                            p: {
                                xs: 3,
                                md: 6
                            },
                            borderRadius: 2,
                            mt: {xs: 0, sm: 12},
                            boxShadow: 2
                        }}
                    >
                        <Typography variant="h3" gutterBottom>
                            Conditions Générales de Vente
                        </Typography>

                        <Grid container spacing={3}>
                            {cgvSections.map((section, index) => (
                            <Grid size={{xs: 12, md: 6}} key={index}>
                                <CguCard section={section} />
                            </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
        <ScrollTopButton />
        <Footer />
    </>
  );
};

export default CgvPage;
