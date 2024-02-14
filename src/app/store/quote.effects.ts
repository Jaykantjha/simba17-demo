import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as gameActions from './quote.actions';
import * as actions from "./quote.actions";
import { PostService } from './quote.service';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class GameEffects {
    constructor(private actions$: Actions,
        private svc: PostService) {
    }

    getPostList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(gameActions.actionType.GET_POST_LIST),
            switchMap(() => this.svc.getPostList()),
            // uncomment if want to test class class action
            // map(heroes => new actions.GetPostListActionSuccess(heroes)),

            // Functional action
            map(heroes => {
                console.log('james bond');
                return actions.addBook(heroes);
            }),
            catchError(err => {
                throw err;
            })
        )
    );



}
