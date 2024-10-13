import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';  
import { ClaimService } from '../../service/claim.service';

export interface Element {
  id: number;
  aim_office: string;
  c_lob: string;
  c_lob_ctgry: string;
  claim_owner: string;
  claim_supervisor: string;
  g_loss: string;
  input_method: string;
  market_segment: string;
  stage_date: string;
  stage_name: string;
  stage_seq: number;
  t_clm_nbr: string;
  time_taken: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'aim_office', 
    'c_lob', 
    'c_lob_ctgry', 
    'claim_owner', 
    'claim_supervisor', 
    'g_loss', 
    'input_method', 
    'market_segment', 
    'stage_date', 
    'stage_name', 
    'stage_seq', 
    't_clm_nbr', 
    'time_taken'
  ];
  dataSource = new MatTableDataSource<Element>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  

  constructor(private service: ClaimService) {}

  ngOnInit() {
    this.service.getAllClaim().subscribe((data) => {
      this.dataSource.data = data; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error) => {
      console.error('Error fetching claims:', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
