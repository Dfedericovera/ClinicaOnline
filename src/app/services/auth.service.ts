import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interface/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  user: User;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore
  )
  {
    this.afAuth.authState.subscribe((user) =>
    {
      if (user)
      {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else
      {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string)
  {
    try
    {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/Principal']);
      return result;
    } catch (error)
    {
      console.error("login", error);
    }
  }

  async register(email: string, password: string)
  {
    try
    {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      /*await this.sendEmailVerification(); */
      return user;
    } catch (error)
    {
      console.error("register", error);
    }
  }

  async sendEmailVerification()
  {
    try
    {
      await (await this.afAuth.currentUser).sendEmailVerification();
      this.router.navigate(['admin/verify-email']);
    } catch (error)
    {
      console.error("sendEmailVerification", error);
    }
  }

  isEmailVerified(user: User): Boolean
  {
    return user.emailVerified === true ? true : false;
  }

  async sendPasswordResetEmail(passwordResetEmail: string)
  {
    try
    {
      return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    } catch (error)
    {
      console.error("sendPasswordResetEmail", error);
    }

  }

  async logout()
  {
    try
    {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
    } catch (error)
    {
      console.error("logout", error);
    }

  }

  get isLoggedIn(): boolean
  {
    try
    {
      const user = JSON.parse(localStorage.getItem('user'));
      return user !== null;
    } catch (error)
    {
      console.error("isLoggedIn", error);
    }
  }

  async loginWithGoogle()
  {
    try
    {
      const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error)
    {
      console.error("loginGoogle", error);
    }
  }

  private updateUserData(user: User)
  {
    try
    {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
      };
      return userRef.set(data, { merge: true })
    } catch (error)
    {
      console.error('updateUserData', error);
    }
  }

}
