import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = []

  constructor() { }

  ngOnInit() {}

  add(message: string) {
    this.clear();
    this.messages.push(message);
    setTimeout(() => this.clear(), 2000);
  }

  clear() {
    this.messages = [];
  }
}
