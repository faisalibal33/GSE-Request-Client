export default (state, action) => {
    switch (action.type) {
      case 'LOAD_USER':
        return {
          datas: action.payload
          }
        
      case 'REMOVE_USER':
        return {
          ...state,
          datas: state.datas.filter(data => {
            return data.id !== action.payload;
          })
        }
      case 'ADD_USER':
        return {
          ...state,
          datas: [action.payload, ...state.datas]
        }
      case 'EDIT_USER':
        const updateData = action.payload;
  
        const updateDatas = state.datas.map(data => {
          if (data.id === updateData.id) {
            return updateData;
          }
          return data;
        })
        return {
          ...state,
          datas: updateDatas
        }
  
      default:
        return state;
    }
  }