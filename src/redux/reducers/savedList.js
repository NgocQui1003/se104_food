const initialList = {
    count: 0,
    items: []
}

const savedListReducer = (list = initialList, action) => {
    switch (action.type) {
        case 'ADD_TO_SAVEDLIST':
            return
        case 'UPDATE_SAVEDLIST':
            return
        case 'GET_SAVEDLIST':
            return
        default:
            return list;
    }
}

export default savedListReducer;