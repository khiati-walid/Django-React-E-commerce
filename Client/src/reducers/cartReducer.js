import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, CHANGE_QUANTITY } from '../actions/cart-actions'


const initState = {
    items: [],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = action.product

        let existed_item = state.addedItems.find(item => action.product.id === item.id)
        if (!existed_item) {

            addedItem.quantity = 1

            let newTotal = state.total + addedItem.price
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }
        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {

        let addedItem = state.addedItems.find(item => item.id === action.id)
        addedItem.error = false
        addedItem.quantity = Number(addedItem.quantity) + 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {

        let addedItem = state.addedItems.find(item => item.id === action.id)
        addedItem.error = false
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }
    if (action.type === CHANGE_QUANTITY) {
        let addedItem = state.addedItems.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (!action.value) {
            let def = action.value - addedItem.quantity
            addedItem.quantity = action.value
            addedItem.error = true
            let newTotal = state.total + (addedItem.price * def)
            return {
                ...state,
                total: newTotal
            }


        }
        else {

            let def = action.value - addedItem.quantity
            addedItem.quantity = action.value
            addedItem.error = false
            let newTotal = state.total + (addedItem.price * def)

            return {
                ...state,
                total: newTotal
            }
        }


    }
    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6
        }
    }

    else {
        return state
    }

}

export default cartReducer