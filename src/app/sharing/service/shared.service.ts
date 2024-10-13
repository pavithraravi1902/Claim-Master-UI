import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedCategorySource = new BehaviorSubject<string | null>(null);
  private selectedLobSource = new BehaviorSubject<string | null>(null);

  selectedCategory$ = this.selectedCategorySource.asObservable();
  selectedLob$ = this.selectedLobSource.asObservable();

  setSelectedCategory(category: string | null) {
    this.selectedCategorySource.next(category);
  }

  setSelectedLob(lob: string | null) {
    this.selectedLobSource.next(lob);
  }
}
