import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertController
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authService.getCurrentUser();
    // console.log(currentUser);
    // if (currentUser) {
    //   // authorised so return true
    //   return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.showAlert();
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;
    
    return true;
  }



  async showAlert() {
    const alert = await this.alert.create({
      header: 'Unauthorized',
      message: 'You are not authorized to visit that page!',
      buttons: ['OK']
    });
    alert.present();
  }


}
