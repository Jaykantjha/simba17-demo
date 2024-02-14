import { Action, createAction, props } from '@ngrx/store';
import * as model from "../shared/models/quote";

export const actionType = {
  GET_POST_LIST: "[Post] Get Post List",
  GET_POST_LIST_SUCCESS: "[Post] Get Post List success",
  GET_POST_LIST_FAIL: "[Post] Get Post List fail",
  ADD_BOOK: '[Post] Add Book'
};
export class GetPostListAction implements Action {
  public readonly type = actionType.GET_POST_LIST;
  constructor(public payload: string) { }
}
export class GetPostListActionSuccess implements Action {
  public readonly type = actionType.GET_POST_LIST_SUCCESS;
  constructor(public payload: model.Post[]) { }
}
export class GetPostListActionFail implements Action {
  public readonly type = actionType.GET_POST_LIST_FAIL;
  constructor(public payload: any) { }
}


export type Actions =
  GetPostListAction |
  GetPostListActionFail |
  GetPostListActionSuccess;


  // Functional Action --------------//
  export const addBook = createAction(
    actionType.ADD_BOOK, props<any>()
  );