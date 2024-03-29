import { Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';
import { ColumnSortedEvent } from '../table-functionality/sortable-column/sort.service';
import { LandingPageService, TableViewdata } from './landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [LandingPageService]
})
export class LandingPageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  viewData: TableViewdata[] = [];
  showView: TableViewdata = null;
  selectedCount: number = 0;
  processData: { lbl2: string, lbl3: string, lbl4: string } = { lbl2: '', lbl3: '', lbl4: '' }

  modalRef?: BsModalRef;
  @ViewChild('showRecord') showRecord!: TemplateRef<any>;
  constructor(private lpSvc: LandingPageService,
    private modalService: BsModalService) { }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {
    setTimeout(() => {
      this.setHeightToContainer();
    }, 0);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setHeightToContainer();
      this.loadFile();
    }, 0);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }

  setHeightToContainer() {
    let ele = document.getElementsByClassName('content-table')[0];
    ele.setAttribute('style', 'height:' + Math.round(window.innerHeight - ele.getBoundingClientRect().top - 20) + 'px;');
    // document.getElementById('terminal')?.setAttribute('style', 'height:' + Math.round(window.innerHeight - ele.getBoundingClientRect().top - 30) + 'px;');
  }

  onSorted($event: ColumnSortedEvent) {
    let column = $event.sortColumn as keyof TableViewdata;
    if ($event.sortDirection == 'asc') {
      this.viewData.sort((a, b) => a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0)
    } else {
      this.viewData.sort((a, b) => a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0)
    }
  }

  loadFile() {
    this.lpSvc.loadFile().pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (res) => {
        this.viewData = this.lpSvc.convertToViewdata(res);
      },
      error: (err) => { },
      complete: () => { }
    });
  }

  selectRow(view: TableViewdata) {
    view.isSelected ? this.selectedCount-- : this.selectedCount++;
    view.toggleRowSelection();
  }
  
  downloadFile() {
    this.lpSvc.writeFile(this.viewData);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  button121(template: TemplateRef<any>) {
    this.openModal(template);
  }

  processBtn(template: TemplateRef<any>) {
    this.openModal(template);
  }

  showDetail(view: TableViewdata) {
    this.showView = view;
  }

  resetDetail() {
    this.showView = null;
  }

  // showRecord(template: TemplateRef<any>) {
  //   this.openModal(template);
  // }
}
