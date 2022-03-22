import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { debounceTime, fromEvent, merge } from 'rxjs';

@Directive({
  selector: '[doubleTap]'
})
export class DoubleTapDirective implements AfterViewInit {
  el: ElementRef;

  //Emit Single and double click event
  @Output() doubleClick = new EventEmitter<void>();
  @Output() singleClick = new EventEmitter<void>();

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.handleClickAndDoubleClick(); }, 100)
  }

  preventSingleClick = false;
  timer: any;
  delay: number = 0;

  handleClickAndDoubleClick() {
    const el = this.el.nativeElement;
    const clickEvent = fromEvent<MouseEvent>(el, 'click');
    const dblClickEvent = fromEvent<MouseEvent>(el, 'dblclick');
    const eventsMerged = merge(clickEvent, dblClickEvent).pipe(debounceTime(300));
    eventsMerged.subscribe(
      (event) => {
        if (event.type === 'click') {
          this.singleClick.emit();
        } else {
          this.doubleClick.emit();
        }
      }
    );
  }
}