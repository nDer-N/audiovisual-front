import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';

export default function CardOption({ title, image, onClick }) {
  return (
    <Card sx={{ maxWidth: 250, borderRadius: 2, boxShadow: 3 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="150" image={image} alt={title} />
        <CardContent>
          <Typography align="center" variant="subtitle1">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
