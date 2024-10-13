import { Component } from '@angular/core';
import { ClaimService } from '../../service/claim.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  searchQuery: string = '';
  generatedText: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private service: ClaimService) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.loading = true;  // Set loading to true
      this.error = '';      // Clear previous errors
      const payload = {input: this.searchQuery}
      this.service.createPromptData(payload).subscribe({
        next: (response) => {
          this.loading = false;  // Reset loading state
          if (response && response.length > 0) {
            this.generatedText = response[0].generated_text; // Extract generated text
          } else {
            this.generatedText = 'No results found.';
          }
        },
        error: (err) => {
          this.loading = false;  // Reset loading state
          this.error = 'Error fetching results. Please try again.';
          console.error(err);
        }
      });
    } else {
      this.generatedText = ''; // Clear previous results if query is empty
    }
  }
}
