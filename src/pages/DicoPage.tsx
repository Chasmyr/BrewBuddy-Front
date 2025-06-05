import React, { useState } from 'react'
import {
  Typography,
  TextField,
  Box,
} from '@mui/material'
import ScrollTopButton from '../components/ScrollTopButton'
import LexiqueAccordionSection from '../components/lexique/LexiqueSection'
import { lexiqueData } from '../utils/lexiqueData'
import Footer from '../layout/Footer'
import Header from '../layout/Header'

const DicoPage: React.FC = () => {
  const [search, setSearch] = useState('')

  const filteredSections = lexiqueData
    .map((section, index) => {
      const filteredEntries = section.entries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(search.toLowerCase()) ||
          entry.description.toLowerCase().includes(search.toLowerCase())
      )
      return { ...section, entries: filteredEntries, index }
    })
    .filter((section) => section.entries.length > 0)

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
                            }}
                        >
                            <Typography variant="h3" gutterBottom fontSize={{xs: "32px", md: "50px"}}>
                            Dico du Brassage
                            </Typography>
                    
                            <Box sx={{ my: 3 }}>
                            <TextField
                                label="Rechercher un terme..."
                                variant="outlined"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            </Box>
                    
                            {filteredSections.map((section) => (
                            <LexiqueAccordionSection
                                key={section.title}
                                id={`section-${section.index}`}
                                title={section.title}
                                entries={section.entries}
                            />
                            ))}
                    
                            {filteredSections.length === 0 && (
                            <Typography variant="body1" sx={{ mt: 4 }}>
                                Aucun résultat trouvé pour « {search} ».
                            </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ScrollTopButton />
            <Footer />
        </>
  )
}

export default DicoPage
