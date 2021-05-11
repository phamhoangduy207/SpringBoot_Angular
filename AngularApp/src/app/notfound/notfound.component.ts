import { Component, OnInit } from '@angular/core';

declare function drawVisor();
declare function animate();

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  }

}
