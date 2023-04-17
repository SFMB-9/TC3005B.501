import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  return (
    <Card sx={{ borderRadius: 4}} style={{backgroundColor: "#F6F6F6"}} className='mt-4'>
      <CardMedia
        sx={{ height: 180, borderRadius: 4, boxShadow: 3}}
        image={props.img}
        title="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontFamily='Raleway'>
          {props.title}
        </Typography>
        <Typography variant="body2" fontFamily='Lato'>
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}