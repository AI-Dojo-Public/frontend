import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private textSubject = new BehaviorSubject<string>("");

  loading$ = this.loadingSubject.asObservable();
  text$ = this.textSubject.asObservable();


  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

  setText(text: string) {
    this.textSubject.next(text);
  }
}
