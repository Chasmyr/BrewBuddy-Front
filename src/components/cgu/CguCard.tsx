import React from 'react';
import {
  Typography,
  Card,
  CardContent,
} from '@mui/material';

interface Section {
  title: string;
  content: string;
}

interface CguCardProps {
  section: Section;
}

const CguCard: React.FC<CguCardProps> = ({ section }) => {
  return (
    <Card sx={{ height: '100%', bgcolor: "#FFFBF2" }}>
      <CardContent>
          <Typography fontWeight="bold">{section.title}</Typography>
          <Typography whiteSpace="pre-line">{section.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default CguCard;
