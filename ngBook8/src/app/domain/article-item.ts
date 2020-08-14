export class ArticleItem {
  title: string;
  link: string;
  votes?: number;

  constructor(title: string, link: string, votes?: number) {
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  }

  voteUp(): void {
    this.votes++;
  }

  voteDown(): void {
    if (this.votes > 0) {
      this.votes--;
    }
  }

}

export interface ArticleItem2 {
  title: string;
  name: string;
  optSelectedId: number[];
  selecteCheck?: number[];
}
