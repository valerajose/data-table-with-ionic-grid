import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  page = 0;
  resultsCout = 10;
  totalPages = 10;

  data = [];
  bulkEdit = false;
  edit = {};
  sortDirection = 0;
  sorKey = null;

  constructor(private http: HttpClient) { this.loadData() }

  loadData() {
    this.http.get('https://randomuser.me/api/?page=${this.page}&results=${this.resultsCount}')
    .subscribe(res =>{
      console.log('res_ ', res);
      this.data = res['results'];
      this.sort();
    })
  }

  sortBy(key){
    this.sorKey = key;
    this.sortDirection++;
    this.sort();
  }

  sort(){
    if (this.sortDirection == 1){
          this.data = this.data.sort((a,b)=>{
            const valA = a[this.sorKey];
            const valB = b[this.sorKey];
            return valA.localeComapare(valB);
          });
    } else if (this.sortDirection == 2){
      this.data = this.data.sort((a,b)=>{
        const valA = a[this.sorKey];
        const valB = b[this.sorKey];
        return valB.localeComapare(valA);
      });
    } else{
      this.sortDirection = 0;
      this.sorKey = null;
    }
  }

  toggleBulkEdit(){
    this.bulkEdit = !this.bulkEdit;
    this.edit = {};
  }

  bulkDelete(){
    console.log('this.edit', this.edit);
    const toDelete = Object.keys(this.edit);
    console.log(toDelete);
    const reallyDelete = toDelete.filter(index => this.edit[index]).map(key => +key);
    while(reallyDelete.length){
      this.data.splice(reallyDelete.pop(), 1);
    }
    this.toggleBulkEdit();
  }

  removeRow(index){
    this.data.splice(index, 1);
  }

  nextPage(){
    this.page++;
    this.loadData();
  }

  prevPage(){
    this.page--;
    this.loadData();
  }

  gorFirt(){
    this.page = 0;
    this.loadData();
  }

  goLast(){
    this.page = this.totalPages -1 ;
    this.loadData();
  }

}
