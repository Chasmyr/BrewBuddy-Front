import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface Entry {
  title: string
  description: string
}

interface LexiqueAccordionSectionProps {
  id: string
  title: string
  entries: Entry[]
}

const LexiqueAccordionSection: React.FC<LexiqueAccordionSectionProps> = ({
  id,
  title,
  entries,
}) => {
  return (
    <Box id={id} sx={{ mb: 3, scrollMarginTop: '100px' }}>
      <Accordion defaultExpanded sx={{bgcolor: "#FFFBF2"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {entries.map((entry, index) => (
            <Accordion key={index} sx={{bgcolor: "#FFFBF2"}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{entry.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography whiteSpace="pre-line">{entry.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default LexiqueAccordionSection
