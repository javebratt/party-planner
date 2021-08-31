import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserCredential } from './authentication.model';
import { AuthenticationService } from './authentication.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  url: string;
  pageTitle = 'Sign In';
  actionButtonText = 'Sign In';
  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private readonly auth: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.url = this.router.url.substr(1);
    if (this.url === 'signup') {
      this.pageTitle = 'Create your Account';
      this.actionButtonText = 'Create Account';
    }

    if (this.url === 'reset') {
      this.pageTitle = 'Reset your Password';
      this.actionButtonText = 'Reset Password';
    }
  }

  handleUserCredentials(userCredentials: Partial<UserCredential>) {
    const { email, password } = userCredentials;
    switch (this.url) {
      case 'login':
        this.login(email, password);
        break;
      case 'signup':
        this.signup(email, password);
        break;
      case 'reset':
        this.resetPassword(email);
        break;
    }
  }

  async login(email: string, password: string) {
    const loading = await this.loadingCtrl.create();
    try {
      await loading.present();
      await this.auth.login(email, password);
      await loading.dismiss();
      this.router.navigateByUrl('');
    } catch (error) {
      await loading.dismiss();
      this.displayAlertMessage(`Either we couldn't find your user or there was a problem with the password`);
    }
  }

  async signup(email: string, password: string) {
    const loading = await this.loadingCtrl.create();
    try {
      await loading.present();

      await this.auth.signup(email, password);

      await loading.dismiss();
      this.router.navigateByUrl('');
    } catch (error) {
      await loading.dismiss();
      this.displayAlertMessage(error);
    }
  }

  async resetPassword(email: string) {
    const resetErrorMessage = `You'll receive an email with instructions on how to reset your password`;
    const loading = await this.loadingCtrl.create();
    try {
      await loading.present();

      await this.auth.resetPassword(email);

      await loading.dismiss();

      this.displayAlertMessage(resetErrorMessage);

      this.router.navigateByUrl('login');
    } catch (error) {
      await loading.dismiss();
      this.displayAlertMessage(resetErrorMessage);
    }
  }

  async displayAlertMessage(errorMessage: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: errorMessage,
      buttons: [{ text: 'Ok', role: 'cancel' }],
    });
    await alert.present();

    await alert.onDidDismiss();
  }
}
