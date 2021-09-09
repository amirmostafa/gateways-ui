import {Component, Input, OnInit} from '@angular/core';
import {Device} from '../../models/device';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DeviceService} from '../../services/device.service';
import {AddEditDeviceComponent} from '../add-edit-device/add-edit-device.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  @Input() devices: Device[];
  @Input() serialNumber: string;
  isAddDisabled = false;
  displayedColumns: string[] = ['uid', 'vendor', 'creationDate', 'status', 'actions'];
  dataSource: MatTableDataSource<Device>;


  constructor(private router: Router,
              private deviceService: DeviceService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isAddDisabled = this.devices.length > 9;
    this.dataSource = new MatTableDataSource<Device>(this.devices);
  }

  init() {
    this.deviceService.listDevices(this.serialNumber).subscribe(data => {
      this.isAddDisabled = data.length > 9;
      if (data.length > 0) {
        this.dataSource = new MatTableDataSource<Device>(data);
      }
    });
  }

  openDialog(device?: Device) {
    if (!device) {
      device = new Device(this.serialNumber);
    }
    const dialogRef = this.dialog.open(AddEditDeviceComponent, {
      width: '550px',
      data: {device}
    });

    dialogRef.afterClosed().subscribe(reload => {
      if (reload) {
        this.init();
      }
    });
  }

  delete(uid: number) {
    this.deviceService.deleteDevice(uid).subscribe(() => {
      this.snackBar.open('Data Saved Successfully', '', {duration: 3000, panelClass: 'success-snackbar'});
      this.init();
    });
  }

}
