import { Component, Output, EventEmitter } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.scss']
})
export class SelectCardComponent {
  constructor(private overlay: Overlay){

  }
  @Output() filtersChanged = new EventEmitter<{ filter1: string; filter2: string }>();

  options1: string[] = ['Option 1A', 'Option 1B', 'Option 1C'];
  options2: string[] = ['Option 2A', 'Option 2B', 'Option 2C'];
  
  selectedOption1: string | null | any = null;
  selectedOption2: string | null | any = null;

  onSelectionChange() {
  }

  openSelect() {
    const overlayRef = this.overlay.create({
      // Configure the overlay position and styles here if needed
    });
  }
}
