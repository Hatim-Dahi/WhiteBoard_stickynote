export const INCREMENT_BOARD_COUNT = 'INCREMENT_BOARD_COUNT';
export const ADD_BOARD = 'ADD_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const UPDATE_BOARD_NAME = 'UPDATE_BOARD_NAME';
export const incrementBoardCount = () => {
    return { type: INCREMENT_BOARD_COUNT };
  };
  
  export const addBoard = (boardName) => {
    return { type: ADD_BOARD, payload: boardName };
  };
// delete board
  export const deleteBoard = (boardName) => {
    return { type: DELETE_BOARD, payload: boardName };
  };
 // Action.js
//  action for board name
 export const updateBoardName = (boardIndex, boardName) => {
  return {
    type: UPDATE_BOARD_NAME,
    payload: { index: boardIndex, name: boardName }
  };
};