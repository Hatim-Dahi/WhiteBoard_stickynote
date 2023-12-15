import { INCREMENT_BOARD_COUNT, ADD_BOARD, DELETE_BOARD, UPDATE_BOARD_NAME } from "../Action/Action";

const initialState = {
  boardCount: 0,
  boards: [],
  // boardName: ''
};

// Reducer
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_BOARD_COUNT:
      return { ...state, boardCount: state.boardCount + 1 };
    case ADD_BOARD:
      return { ...state, boardCount: state.boardCount + 1, boards: [action.payload, ...state.boards] };
    case DELETE_BOARD:
      return { ...state, boardCount: state.boardCount - 1, boards: state.boards.filter(board => board !== action.payload) };
      case UPDATE_BOARD_NAME:
        const { index, name } = action.payload;
        return {
          ...state,
          boards: state.boards.map((board, i) =>
            i === index ? name : board
          )
        };
    default:
      return state;
  }
};

export default dashboardReducer;
