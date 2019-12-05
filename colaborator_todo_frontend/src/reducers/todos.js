const TodoReducer = (state=[], action) => {
    switch (action.type){
        case 'GET_TODO':
            
            var list = state.slice()
            list.push(action.payload)
            // console.log('reducer-',list)
            return action.payload;

        default:
            return state;
    }
}
export default TodoReducer;