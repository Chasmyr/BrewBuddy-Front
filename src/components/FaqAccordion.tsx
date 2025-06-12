import React from 'react'
import {
Accordion,
AccordionSummary,
AccordionDetails,
Typography,
Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface Question {
    question: string
    answer: string
}

interface FaqSection {
    title: string
    items: Question[]
}

interface FaqAccordionProps {
    sections: FaqSection[]
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ sections }) => {
return (
    <Box>
    {sections.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
            {section.title}
        </Typography>
        {section.items.map((item, idx) => (
            <Accordion key={idx} sx={{bgcolor: "#FFFBF2"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    {item.answer.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                        {line}
                        <br />
                        </React.Fragment>
                    ))}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))}
        </Box>
    ))}
    </Box>
)
}

export default FaqAccordion
