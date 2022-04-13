import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {
   constructor(private router: Router,
     private authService: AuthService,private _bottomSheet: MatBottomSheet) { }

   logout(){
     this.router.navigateByUrl('/auth/login')
     this.authService.logout();
   }

   get usuario(){
     return this.authService.usuario;
   }
   openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}