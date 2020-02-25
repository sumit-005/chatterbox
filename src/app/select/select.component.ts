import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() showMePartially: boolean;

  constructor() { }

  ngOnInit() {

  }




    // don't forget to import Input from '@angular/core'
}




