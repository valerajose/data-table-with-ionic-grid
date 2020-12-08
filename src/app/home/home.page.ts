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

  }

  bulkDelete(){

  }

  removeRow(index){
    this.data.splice(index, 1);
  }

}
