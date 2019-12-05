export const projects = (type,project) =>{
    if(project !== undefined){
        console.log('lala',type,project)
        return {
            type: type,
            payload: project
        }
    }else{
        console.log('err in Actions, getting projects detail',project)
    }
}

export const todos = (type,todo) =>{
    if(todo !== undefined){console.log('lala',type,todo)
        return {
            type: type,
            payload: todo
        }
    }else{
        console.log('err in Actions, in todos',todo)
    }
}