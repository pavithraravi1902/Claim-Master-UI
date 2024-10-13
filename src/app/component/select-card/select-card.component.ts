import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../service/claim.service';
import { SharedService } from '../../sharing/service/shared.service';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.scss']
})
export class SelectCardComponent implements OnInit {
  options1: { value: string, label: string }[] = [];
  options2: { value: string, label: string }[] = [];

  selectedOption1: string | null = null;
  selectedOption2: string | null = null;

  constructor(private service: ClaimService, private sharedService: SharedService) {}

  onSelectionChange1(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption1 = selectElement.value;
    this.sharedService.setSelectedCategory(this.selectedOption1); // Update category in shared service
  }

  onSelectionChange2(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption2 = selectElement.value;
    this.sharedService.setSelectedLob(this.selectedOption2); // Update LOB in shared service
  }

  ngOnInit() {
    this.service.getExistingCategory().subscribe((data: { categories: string[] }) => {
      this.options1 = data.categories.map(category => ({ value: category, label: category }));
      console.log('Fetched Categories:', this.options1);
    });

    this.service.getExistingLobs().subscribe((data: { lobs: string[] }) => {
      this.options2 = data.lobs.map(lob => ({ value: lob, label: lob }));
      console.log('Fetched LOBs:', this.options2);
    });
  }
}
