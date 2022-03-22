import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';

@Injectable()
export class LandingPageService {

  constructor(private http: HttpClient,
    private fileSaverService: FileSaverService) { }

  loadFile() {
    let options: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8'
      }),
      responseType: 'text'
    }
    // D:/personal/FL/argent/src/assets/input/SAMPLE_INPUT.txt
    return this.http.get<string>('assets/input/SAMPLE_INPUT.txt', options);
  }

  convertToViewdata(data: string) {
    let array: TableViewdata[] = [];
    let lines = data.split('\n');
    lines.forEach(line => {
      let cols = line.split(',');
      let v = new TableViewdata();
      v.col0 = cols[0];
      v.col1 = cols[1];
      v.col2 = cols[2];
      v.col3 = cols[3];
      v.col4 = cols[4];
      v.resetColor();
      array.push(v);
    });
    return array;
  }

  writeFile(array: TableViewdata[]) {
    let outPut: string = '';
    array.forEach((row, index) => {
      if (row.isSelected) {
        let line: string = '';
        if (index > 0) {
          outPut = outPut.concat('\n');
        }
        outPut = outPut.concat(row.col0, ',', row.col1, ',', row.col2, ',', row.col3, ',', row.col4);
      }
    });
    const fileType = this.fileSaverService.genType('SAMPLE_OUTPUT.txt');
    const txtBlob = new Blob([outPut], { type: fileType });
    this.fileSaverService.save(txtBlob, 'SAMPLE_OUTPUT.txt');
  }
}

export class TableViewdata {
  constructor() {
    this.col0 = '';
    this.col1 = '';
    this.col2 = '';
    this.col3 = '';
    this.col4 = '';
    this.rowTextColor = '';
    this.rowBgColor = '';
    this.isSelected = false;
  }
  col0: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;

  rowTextColor: string;
  rowBgColor: string;

  isSelected: boolean;

  toggleRowSelection() {
    this.isSelected = !this.isSelected;
    this.resetColor();
  }

  resetColor() {
    if (this.isSelected) {
      this.rowTextColor = 'text-white';
      this.rowBgColor = 'bg-primary';
    } else {
      if (this.col0.endsWith('0')) {
        this.rowTextColor = 'text-danger';
        this.rowBgColor = 'bg-white';
      } else if (this.col0.endsWith('1')) {
        this.rowTextColor = 'text-success';
        this.rowBgColor = 'bg-danger';
      } else if (this.col0.endsWith('2')) {
        this.rowTextColor = 'text-primary';
        this.rowBgColor = 'bg-white';
      } else {
        this.rowTextColor = 'text-dark';
        this.rowBgColor = 'bg-white';
      }
    }
  }
}