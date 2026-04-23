import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocSocketService {

  private socket = io('http://localhost:5000');

  listenToEvents(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('soc-event', (data) => {
        observer.next(data);
      });
    });
  }
}