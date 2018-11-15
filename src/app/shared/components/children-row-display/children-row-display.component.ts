import {
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';

const ITEM_WIDTH = 180;
const PAGE_BUTTON_MARGIN = 2 * (45 + 10 * 2);

@Component({
  selector: 'app-children-row-display',
  templateUrl: './children-row-display.component.html',
  styleUrls: ['./children-row-display.component.css']
})
//由于展示某节点的所有后续子节点
export class ChildrenRowDisplayComponent implements OnInit, OnChanges {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  items: Array<any>;

  @ViewChild("itemWrapper") itemWrapper: ElementRef;

  @Input() children: Array<any>;

  @Output() onChildClick = new EventEmitter<any>();

  showPagingButton(action?: any): boolean {

    if (this.items && this.items.length > 0) {
      //console.log(this.el.nativeElement);
      if (this.items.length * ITEM_WIDTH + PAGE_BUTTON_MARGIN > this.el.nativeElement.offsetWidth) {

        if(action === 'prev' && this.page === 0){
          return false;
        }

        if(action === 'next' && this.page === this.PAGES.length -1 ){
          return false;
        }

        return true;
      }
    }

    return false;
  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {

    this.items = this.children;

    this.paging();
  }

  /**
   * 对内容进行分页（如果必要）
   */
  paging() {
    if (this.showPagingButton()) {
      const gaps = Math.ceil(this.items.length * ITEM_WIDTH / (this.el.nativeElement.offsetWidth - PAGE_BUTTON_MARGIN));

        this.PAGES = (new Array(gaps)).fill(0).map(( e, idx )=>{
          if(idx == 0) return 0;
          if(idx == gaps-1) return this.el.nativeElement.offsetWidth - PAGE_BUTTON_MARGIN - this.items.length * ITEM_WIDTH;
          return  -idx * (this.el.nativeElement.offsetWidth - PAGE_BUTTON_MARGIN);
        });

    }
  }

  PAGES: Array<number> = [];
  private page: number = 0;

  pagingButtonClick(action: string) {

    let idx = this.page;
    if (action === 'prev') {
      idx--;
    } else if (action === 'next') {
      idx++;
    }
    if(this.PAGES[idx] !== undefined){
      this.page = idx;
      this.renderer.setStyle(this.itemWrapper.nativeElement, "transform", `translateX(${this.PAGES[this.page]}px)`);
    }

  }

  onClick($event,item){
    this.onChildClick.emit(item);
  }
}
