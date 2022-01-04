
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, CHANGE_QUANTITY } from './cart-actions'

//add cart action
export const addToCart = (product) => {
    return {
        type: ADD_TO_CART, product
    }
}
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}



export const changeQuantity = (id, value) => {
    return {
        type: CHANGE_QUANTITY,
        id, value
    }
}
//add qt action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}