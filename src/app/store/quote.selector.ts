import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as model from "../shared/models/quote";

export const getPostState = createFeatureSelector<model.PostState>("post");

export const getPostList = createSelector(
  getPostState,
  (state: model.PostState): model.Post[] => state.posts
);


export const getBookState = createFeatureSelector<model.BookState>("books");

export const getBookList = createSelector(
  getBookState,
  (state: model.BookState): model.Book[] => state.books
);
