import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = "/data/data.json"
  constructor(private http:HttpClient) { }

  get() {
    console.log('url', name);
    return this.http.get(this.url);
  }
}
