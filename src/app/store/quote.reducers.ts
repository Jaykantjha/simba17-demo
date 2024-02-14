import { createReducer, on } from "@ngrx/store";
import * as model from "../shared/models/quote";
import * as actions from "./quote.actions";

const postInitialState = (function (): model.PostState {
  const state: model.PostState = {
    posts: [],
  };
  return state;
})();

export function reducer(state = postInitialState, action: actions.Actions) {
  switch (action.type) {
    case actions.actionType.GET_POST_LIST_SUCCESS: {
      // return state
      const abc = Object.assign({}, state, { posts: action.payload });
      return abc;
    }
    case actions.actionType.ADD_BOOK: {
      console.log('add book', action);
      return state;
      // return Object.assign({}, state, { posts: action.payload });
    }
    default: {
      return state;
    }
  }
}

//------------- THIS IS EXAMPLE FOR CREATE REDUCER---------//

const bookInitialState = (function (): model.BookState {
  const state: model.BookState = {
    books: [],
  };
  return state;
})();

export const bookReducer = createReducer(
  bookInitialState,
  on(actions.addBook, (state, payload) => {
    const abc = Object.assign({}, state, { books: Object.values(payload) });
    return abc;
  })
);
