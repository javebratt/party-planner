import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  picture = 'http://placehold.it/300x200';
  constructor() {}

  ngOnInit() {}
}
