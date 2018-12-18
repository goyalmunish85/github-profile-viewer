import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title = 'app';
  profileList = [];
  page: number = 1;

  constructor(private http: HttpClient, private dataService: DataService, public snackBar: MatSnackBar, private media: ObservableMedia) {
    //only for fetching the organizations
    this.dataService.getOrganizations(this.searchText).subscribe((res) => this.onFirstSuccess(res));
  }
  ngOnInit() {
    this.updateGrids();
    this.media.subscribe(() => { this.updateGrids(); });
  }

  //stores the searched text
  searchText = '';

  //flag used to switch the orgnizations and search data
  searchFlag = false;

  //get the data by search 
  getSearchResult() {
    console.log(this.page);
    this.dataService.getSearchResult(this.searchText, this.page).subscribe((res) => this.onSuccess(res));
  }

  private nbCols: number = 2;

  private updateGrids(): void {
    if (this.media.isActive('xl')) { this.nbCols = 5; }
    else if (this.media.isActive('lg')) { this.nbCols = 4; }
    else if (this.media.isActive('md')) { this.nbCols = 3; }
    else if (this.media.isActive('sm')) { this.nbCols = 2; }
    else if (this.media.isActive('xs')) { this.nbCols = 1; }
  }

  //after success push the data into profileList
  onSuccess(res) {
    this.searchFlag = true;
    console.log(res);
    if (res != undefined) {
      res.items.forEach(item => {
        this.profileList.push(item);
      });
      let message = "Total " + res.total_count + " users found";
      let action = "Done";
      if (this.page == 1) {
        this.snackBar.open(message, action, {
          duration: 5000,
        });
      }
    }
  }


  //only for organizations
  onFirstSuccess(res) {
    console.log(res);
    if (res != undefined) {
      res.forEach(item => {
        this.profileList.push(item);
      });
    }
  }

  onScroll() {
    if (this.searchFlag) {
      console.log("Scrolled");
      this.page = this.page + 1;
      this.getSearchResult();
    }
  }

  //search function
  Search(formData) {
    this.searchText = formData.value.search;
    if (this.searchText != "") {
      //call getSearchResult to get the data
      this.getSearchResult();
      this.updateGrids();
      this.profileList = [];
      this.page = 1;
    }
  }
}
