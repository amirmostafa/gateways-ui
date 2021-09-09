import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {GatewayService} from '../../services/gateway.service';
import {Pagination} from '../../models/pagination';
import {Gateway} from '../../models/gateway';
import {MatDialog} from '@angular/material/dialog';
import {AddEditGatewayComponent} from '../add-edit-gateway/add-edit-gateway.component';
import {PageEvent} from '@angular/material/paginator/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css']
})
export class GatewaysComponent implements OnInit {

  displayedColumns: string[] = ['serialNumber', 'name', 'ipv4', 'devices', 'actions'];
  dataSource: MatTableDataSource<Gateway>;
  pagination = new Pagination();
  total = 0;

  constructor(private router: Router,
              private gatewayService: GatewayService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.gatewayService.listGateways(this.pagination).subscribe(resultSet => {
      this.dataSource = new MatTableDataSource<Gateway>(resultSet.data);
      this.total = resultSet.total;
      if (resultSet.data.length === 0 && this.pagination.page > 0) {
        this.pagination.page--;
        this.init();
      }
    });
  }

  openDialog(gateway?: Gateway) {
    const dialogRef = this.dialog.open(AddEditGatewayComponent, {
      width: '550px',
      data: {gateway}
    });

    dialogRef.afterClosed().subscribe(reload => {
      if (reload) {
        this.init();
      }
    });
  }

  onGatewayClick(serialNumber: string) {
    this.router.navigate([`gateways/${serialNumber}`]);
  }

  delete(serialNumber) {
    this.gatewayService.deleteGateway(serialNumber).subscribe(() => {
      this.snackBar.open('Data Saved Successfully', '', {duration: 3000, panelClass: 'success-snackbar'});
      this.init();
    });
  }

  onPagination(pageEvent: PageEvent) {
    this.pagination.page = pageEvent.pageIndex;
    this.pagination.size = pageEvent.pageSize;
    this.init();
  }
}
