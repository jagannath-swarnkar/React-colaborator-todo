import React from 'react';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Grid, TextField,Paper} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import {todos} from '../actions';

function Todo(props){
    const [assignedTo, setAssingedTo] = React.useState('');
    const [item, setItem] = React.useState('');
    const dispatch = useDispatch();

    const addItem = (e) =>{
        var project_id = props.project_id;
        if(e.key==="Enter"){
            if((item.length>0) && (item.match(/[a-z]/i))){
                axios
                .post('http://localhost:3030/todo',({
                    'text': item,
                    'assignedTo': assignedTo,
                    'done':false,
                    'project_id':project_id,
                    'token':reactLocalStorage.get('token')
                    }))
                .then((data)=>{
                    console.log('todos sent to backend',data.data)
                    dispatch(todos('GET_TODO',data.data))
                    setItem('')
                    setAssingedTo('')
                    })
                .catch((err)=>{
                    console.log('err in sending todo to backend',err)
                    })
            }
        }
    }

    return(
      <Paper style={{ margin: 16, padding: 14 ,background:'lightGreen'}}>
            <Grid container>
                <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                    <form onKeyPress={addItem}>
                    <TextField
                        label="Add Todo here"
                        // value={props.item}
                        value={item}
                        onChange={(e)=>{setItem(e.target.value)}}
                        // onChange={props.onChangeHandler}
                        // onKeyPress={props.addItem}
                        fullWidth
                        autoFocus
                        style={{marginBottom:'20px'}}
                        required
                    />
                    <TextField
                        label="Assigned To :"
                        value={assignedTo}
                        onChange={(e)=>{setAssingedTo(e.target.value)}}
                        fullWidth
                        placeholder={'email id'}
                        name="email"
                        required
                    />
                    </form>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default Todo