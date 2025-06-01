import React from 'react'
import { Box, Typography } from '@mui/material'
import FaqAccordion from '../components/FaqAccordion'
import { faqData } from '../utils/faqData'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ScrollTopButton from '../components/ScrollTopButton'

const FaqPage: React.FC = () => {

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
                            <Typography variant="h3" gutterBottom fontSize={{xs: "32px", md: "50px"}}>
                                Foire Aux Questions
                            </Typography>
                            <FaqAccordion sections={faqData} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ScrollTopButton />
            <Footer />
        </>
    )
}

export default FaqPage
