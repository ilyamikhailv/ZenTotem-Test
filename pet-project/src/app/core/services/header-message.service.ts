import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderMessageService {
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  readonly message$ = this.messageSubject.asObservable();
  updateMessage(value: string): void {
    this.messageSubject.next(value);
  }
  clearMessage(): void {
    this.messageSubject.next(null);
  }
}
