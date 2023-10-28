import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = true;
  private authToken: string | null = null;
  private authTokenKey = "authToken";

  urlServer: string;
  constructor(private http: HttpClient) {
    this.urlServer = "http://localhost:3000/data/v1/asb";
  }
login(username: any, password: any): Promise<any> {
    const body = {
      Usuario: username,
      pass: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.post<any>(`${this.urlServer}/login`, body, { headers })
        .subscribe(
          (response) => {
            if (response && response.token) {
              this.authenticated = true;
              this.authToken = response.token;
                localStorage.setItem(this.authTokenKey, response.token);
              resolve(response); // Resuelve la promesa con la respuesta
            } else {
              reject('Autenticación fallida'); // Rechaza la promesa en caso de error
            }
          },
          (error) => {
            reject(error); // Rechaza la promesa en caso de error en la solicitud HTTP
          }
        );
    });
}


  logout(): void {
    this.authenticated = false;
    this.authToken = null;
    localStorage.removeItem(this.authTokenKey);
  }
  setAuthToken(authToken:any) {
    this.authToken = authToken;
  }
  setAuthenticated() {
    this.authenticated = false;
  }
  isAuthenticated(): boolean {
    return this.authenticated;
  }
   getToken(): string | null {
    return this.authToken;
  }
}
