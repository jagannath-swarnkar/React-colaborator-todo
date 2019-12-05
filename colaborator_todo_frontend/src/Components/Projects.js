import React from 'react';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({

  card: {
    background: '#90ee90de',
    width:400,
    height:250,
    margin:35,
    cursor:"pointer",
  },
  middle:{
    height:105,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [id, setId] = React.useState(false)
  const [project_id, setProject_id]=React.useState(null)
  const projects = useSelector(state => state.projects)

  const onClickCart = (id) =>{
    setProject_id(id)
    setId(true)
  }
  // console.log('store projects',projects)
  const data = projects.map((e,i)=>{
    return (
      <Card key={i} title={`Project_id : ${e.project_id}`} 
        className={classes.card} 
        onClick={()=>onClickCart(e.project_id)} >
        <CardHeader
          avatar={
            <Avatar aria-label="Todo" className={classes.avatar}>
              {e.user_name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={e.project_name}
          subheader={e.project_date}
        />
        <CardContent className={classes.middle}>
          <Typography variant="body1" color="textPrimary" component="p">
            {e.description}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Created by : {e.user_name}
          </Typography>
          </CardContent>.
        
      </Card>
    );
  })
  // console.log(id,project_id)
  
  if(id){
    console.log(id)
    return <Redirect to={`/home/${project_id}`} />
  }else{
  return (
    data
  );
  }
}
