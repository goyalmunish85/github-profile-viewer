import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  getSearchResult(search:any,page: number): Observable<any> { 
  
    return this.http.get('https://api.github.com/search/users?q='+ search +'&page='+page);  
  }
  getOrganizations(search:any): Observable<any> {
    return this.http.get('https://api.github.com/organizations');  
  }
  getProfile (username : any): Observable<any> {
    return this.http.get('https://api.github.com/users/' + username);  
  }
  getRepos (username : any): Observable<any> {
    return this.http.get<any>('https://api.github.com/users/' + username + '/repos');
  }
}
