import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatSpinner } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { DateService } from './date.service';
import { List } from './list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tasks: List[] = [];
  public loader: boolean = true;

  constructor(
    public dialog: MatDialog,
    private dateService: DateService
  ) {


  }

  public form: FormGroup = new FormGroup({
    task: new FormControl()
  })

  ngOnInit() {
    this.dateService.getData().subscribe(date => this.tasks = date)
    setTimeout(() => {
      this.loader = false;
    }, 1500);
  }

  submit() {
    let date = Date.now().toString();
    let newTask = {
      id: this.tasks.length + 1,
      name: this.form.value.task,
      date: date,
    }
    this.tasks.push(newTask);
    this.dateService.addList(newTask);
    this.form.reset();
  }

  deleteTask(index: number, id: number) {
    this.tasks.splice(index, 1);
    this.dateService.deleteTask(id);
  }

  setTask(tasks: List, name: string) {
    this.dateService.changeTask(tasks, name);
  }

  openDialog(data, index): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { name: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks[index].name = result.name;
        this.setTask(this.tasks[index], result.name);
      }
    });
  }

}