// sse.service.ts
import { Injectable } from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SseService {
  private orderSubject = new Subject<MessageEvent>();

  getOrderStream(): Observable<MessageEvent> {
    return this.orderSubject.asObservable();
  }

  sendNewOrder(order: any) {
    this.orderSubject.next({ data: order });
  }
}