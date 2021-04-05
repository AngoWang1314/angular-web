import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-person',
  templateUrl: './my-person.component.html',
  styleUrls: ['./my-person.component.less']
})
export class MyPersonComponent implements OnInit {

  @Input() person;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
