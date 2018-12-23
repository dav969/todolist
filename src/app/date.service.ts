import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { List } from './list';

@Injectable()
export class DateService {
  url: string = "http://localhost:3000/toDoList";

  constructor(private http: HttpClient) {}

  getData()  {
    return this.http.get<List[]>(this.url);
  }

  addList(newTask) {
    return this.http.post<List[]>(this.url, newTask).subscribe()
  }

  changeTask(list: List, name: string) {
    list.name = name;
    return this.http.put(`${this.url}/${list.id}`, list).subscribe();
  }

  deleteTask(index) {
    return this.http.delete(`${this.url}/${index}`).subscribe();
  }
  
}
