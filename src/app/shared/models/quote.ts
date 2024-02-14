export interface Post{
    id :number;
    userid : number;
    title :string;
    body:string;
  }
  export interface Book{
    id :number;
    userid : number;
    title :string;
    body:string;
  }
  export interface BookState {
      books:Book[]
  }
  export interface PostState {
    posts:Post[]
}
  