import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataService } from '../services/data.service';
export interface Category {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  catagories: Category[] = [];
  sugested_categories = [];
  selected_category_info: any;
  posts = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our catagory
    if ((value || '').trim()) {
      this.catagories.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(catagories: Category): void {
    const index = this.catagories.indexOf(catagories);

    if (index >= 0) {
      this.catagories.splice(index, 1);
    }
  }

  getData() {
    this.dataService.get().subscribe(val => {
      console.log(val);
      this.catagories = val['selected_categories'];
      this.sugested_categories = val['suggested_categories'];
      let tempObj = new Object();
      tempObj['number_of_people'] = 0;
      tempObj['Kofluence_people'] = 0;
      this.posts = [];
      Object.keys(val['categories_info']).forEach(element => {
        if (this.catagories.find(ele => ele.name == element)) {
          Array.prototype.push.apply(this.posts, val['categories_info'][element].posts);
          tempObj['number_of_people'] = tempObj['number_of_people'] + val['categories_info'][element].number_people;
          tempObj['Kofluence_people'] = tempObj['Kofluence_people'] + val['categories_info'][element].Kofluence_people;
          console.log(this.posts);
        }
      });
      this.selected_category_info = tempObj;
    })
  }
}
