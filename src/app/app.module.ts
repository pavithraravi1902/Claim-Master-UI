import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './component/tool-bar/tool-bar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SelectCardComponent } from './component/select-card/select-card.component';
import { CardComponent } from './sharing/card/card.component';
import { LineChartComponent } from './sharing/line-chart/line-chart.component';
import { HeatChartComponent } from './sharing/heat-chart/heat-chart.component';
import { BarChartComponent } from './sharing/bar-chart/bar-chart.component';
import { PieChartComponent } from './sharing/pie-chart/pie-chart.component';
import { SmallCardComponent } from './component/small-card/small-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { ColumnChartComponent } from './sharing/column-chart/column-chart.component';
import { TableComponent } from './sharing/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    DashboardComponent,
    SelectCardComponent,
    CardComponent,
    LineChartComponent,
    HeatChartComponent,
    BarChartComponent,
    PieChartComponent,
    SmallCardComponent,
    ColumnChartComponent,
    TableComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSortModule, 
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
