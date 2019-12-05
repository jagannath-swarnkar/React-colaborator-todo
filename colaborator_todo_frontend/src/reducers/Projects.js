const ProjectReducer = (state=[], action) => {
    switch (action.type){
        case 'GET_PROJECT':
            var list = state.slice()
            list.push(action.payload)
            return action.payload

        default:
            return state;
    }
}
export default ProjectReducer;