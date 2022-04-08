import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
    `
    *{
      margin: 15px;
    }
    `
  ]
})
export class DetailsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  private _id!: any;
  ngOnInit(): void {
this.activatedRoute.snapshot.paramMap.get('_id');
    this.authService.obtenerUnLibro(this.activatedRoute.snapshot.paramMap.get('_id')!);
  }
  get libro(){
     return this.authService.libro;
  }

}
