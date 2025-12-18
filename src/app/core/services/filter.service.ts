import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FilterState {
  category?: string | null;
  subcategory?: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private subject = new BehaviorSubject<FilterState>({ category: null, subcategory: null });
  filter$ = this.subject.asObservable();

  setFilter(state: FilterState) {
    this.subject.next({ category: state.category ?? null, subcategory: state.subcategory ?? null });
  }

  clear() {
    this.subject.next({ category: null, subcategory: null });
  }
}