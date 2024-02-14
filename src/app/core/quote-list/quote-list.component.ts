import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as postModel from '../../shared/models/quote';
import * as postSelector from '../../store/quote.selector';
import * as postAction from '../../store/quote.actions';
import { JsonPipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [NgFor, JsonPipe],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss'
})
export class QuoteListComponent implements OnInit {

  getpostList:Subscription;
  postList:postModel.Post[] = [];
  constructor(private store:Store<postModel.PostState>) { }

  ngOnInit() {
    this.store.dispatch(new postAction.GetPostListAction(""));  // empty string for now
    this.subscriptionInit();
  }
  subscriptionInit(){
    // for class store (class action, reducer)
    // this.getpostList = this.store.select(postSelector.getPostList).subscribe(
    //   (posts:postModel.Post[])=>{
    //     console.log(posts);
    //     if(posts){
    //     this.postList =  posts;
    //     }
    //   }
    // )

    
    this.getpostList = this.store.select(postSelector.getBookList).subscribe(
      (posts:postModel.Book[])=>{
        console.log(posts);
        if(posts){
          console.log(posts, 'posts-->');
        this.postList =  posts;
        }
      }
    )
    
  }
}