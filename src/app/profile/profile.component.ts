import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Params, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dataService: DataService, private route: ActivatedRoute, private media: ObservableMedia) { }
  //store user profile data
  profile;
  //store all the user repositries
  repos;

  username;
  ngOnInit() {

    //get the username from search component by routes
    this.route.params.subscribe(params => this.username = params.login);

    //get the profile data
    this.dataService.getProfile(this.username)
      .subscribe(profile => this.profile = profile);

    //get the repositries data
    this.dataService.getRepos(this.username)
      .subscribe(repos => this.repos = repos);

    //for grid
    this.updateGrids();
    this.media.subscribe(() => {
      this.updateGrids();
    });
  }

  private nbCols: number = 2;

  private updateGrids(): void {
    if (this.media.isActive('xl')) { this.nbCols = 5; }
    else if (this.media.isActive('lg')) { this.nbCols = 4; }
    else if (this.media.isActive('md')) { this.nbCols = 3; }
    else if (this.media.isActive('sm')) { this.nbCols = 2; }
    else if (this.media.isActive('xs')) { this.nbCols = 1; }
  }
}
