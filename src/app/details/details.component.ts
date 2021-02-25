import { Component, OnInit, Input } from '@angular/core';
import jwt_decode from "jwt-decode";

import { DetailLine } from '../models/detailLine.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  detailLines: DetailLine[] = []; // new DetailLine('place holder description', 'place holder data')];
  
  // public idToken: string;
  @Input() set idToken(value: string) {
console.log(value + ' : ' + this.idToken)
      
      if (value !== "") {
        // this.detailLines = [
        //   new DetailLine('description1', 'Value 1'),
        //   new DetailLine('description2', 'Value 2')
        // ];
        console.log(value);
        const decoded: Object = jwt_decode(value);
        console.log('keys: ' + Object.keys(decoded).length);

        const values = Object.values(decoded);
        var i: number = 0;
        Object.keys(decoded).forEach(key => {
          this.addDetail(new DetailLine(key, values[i++]));
          // console.log(key + " = " + values[i++]);
        });

        // this.addDetail(new DetailLine('desc1', 'val1'));
        // this.addDetail(new DetailLine('desc2', 'val2'));

        
      } else {
        this.detailLines = [];
      }
  }

  constructor() { 
    this.idToken = "";
  }

  ngOnInit(): void {
  }

  addDetail(detail: DetailLine) {
    this.detailLines = [...this.detailLines, detail];
  }
}
