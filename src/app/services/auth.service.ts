import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interface/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public static user;
  public user$: Observable<any>;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore
  )
  {
    /* this.afAuth.authState.subscribe((user) =>
    {
      this.user = user;
    }); */
    this.afs
      .collection("usuarios")
      .doc('Gl3GGMtAYrWBeX4640f7mLvPTKx1')
      .get()
      .toPromise()
      .then((doc) =>
      {
        if (doc.exists)
        {
          console.log(doc.data());
          return doc.data();
        }
      })
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>
      {
        console.log(user);

        if (user)
        {
          return this.afs.collection("usuarios")
            .doc(user.uid).get().toPromise().then(v =>
            {
              console.log(v);
            })
        }
        else
        {
          return of(null);
        }
      })
    )
  }

  async login(email: string, password: string)
  {
    try
    {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error)
    {
      console.error("login", error);
      throw error;
    }
  }

  async register(email: string, password: string)
  {
    try
    {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      await this.sendEmailVerification();
      return user;
    } catch (error)
    {
      console.error("Register error", error);
      throw error;
    }
  }

  async sendEmailVerification()
  {
    try
    {
      await (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error)
    {
      console.error("sendEmailVerification", error);
    }
  }

  isEmailVerified(user: User): Boolean
  {
    if (user.email == 'medico@valderrama.com' || "medico2@delaolla.com" || "paciente@gonzales.com")
    {
      return true;
    }
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

  /*   async loginWithGoogle()
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
    } */

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
