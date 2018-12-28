import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersUrl = 'http://localhost:8000/api/players';

  constructor(private http: HttpClient) { }

  /** GET hero by id. Will 404 if id not found */
  getPlayer(tag: string) {
    const url = `${this.playersUrl}/${tag}`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError<any>(`getHero id=${tag}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
