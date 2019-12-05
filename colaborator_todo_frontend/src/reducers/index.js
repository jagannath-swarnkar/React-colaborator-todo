import ProjectReducer from './Projects';
import TodoReducer from './todos';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    projects: ProjectReducer,
    todos: TodoReducer

})

export default allReducers;