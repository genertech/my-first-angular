import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'circle-element',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  @Input() content: any;

  constructor() { }

  ngOnInit() {
  }

}
