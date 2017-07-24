import _ from 'lodash'

export default {
  'SET_USER'(state, payload){
    state.user = payload
  },
  'SET_NAVIGATOR_LIST'(state, obj){
    state.navigator.list = obj
  },
  'SET_NAVIGATOR_ITEM_ID'(state, obj){
    state.navigator.item_id = obj
  },
  'UPDATE_NAVIGATOR'(state, obj){
    state.navigator.list.unshift(obj)
  },
  'SET_STATE_TAB_IS_EDITED'(state, payload){
    state.navigator.is_edited = payload
  },
  'SET_STATE_SUCCESS_SAVE'(state, payload){
    state.navigator.success_save = payload
  },
  'ADD_ITEM_TABLE'(state,payload){
    state.table.list.unshift((JSON.parse(JSON.stringify(payload))))
    state.table.length = state.table.length+1
  },
  'REMOVE_ITEM_TABLE'(state,payload){
    var index = state.table.list.indexOf(payload)
    state.table.list.splice(index, 1)
    state.table.length = state.table.length-1
  },
  'REMOVE_ALL_TABLE'(state){
    state.table.list = []
    state.table.length = 0
  },
  'SET_TABLE'(state,payload){
    state.table.list = payload.list
    state.table.length = payload.length
  },
  'UPDATE_TABLE'(state,obj){
    var index = state.table.list.indexOf(obj)
    state.table.list.splice(index, 1)
    state.table.list.push(obj)
  },
  'SET_TABS_IS_EDITING' (state,payload){
    state.tabs.tab_isEditing = payload
  },
  'UPDATE_CHECKBOX_TABLE'(state,obj){    
    
    if (obj.item == undefined){

      var tipo = obj.id  

        state.table.list.map(el =>{

        el[tipo] = obj.val

      })

    }else{

        state.table.list.map(el =>{

            if (el.id_modulo == obj.item.id_modulo){

                el[tipo] = obj.val
            
            }

        })
    }
  }
}