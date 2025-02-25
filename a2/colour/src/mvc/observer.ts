/* 
University of Waterloo 2023-24 / CS 349 / A2
József Iván Gafo / WatId: 21111635 / jivangaf@uwaterloo.ca
Description:
This module is in charge of handling the observer
*/

//Is the same code as shown in class
export interface Observer {
    update(): void;
  }
  
  export class Subject {
    private observers: Observer[] = [];
  
    addObserver(observer: Observer) {
      this.observers.push(observer);
      // update the observer right away
      observer.update();
    }
  
    removeObserver(observer: Observer) {
      this.observers = this.observers.filter((o) => o !== observer);
    }
  
    protected notifyObservers() {
      this.observers.forEach((o) => o.update());
    }
  }
  