import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../services/device.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Device} from '../../models/device';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent implements OnInit {

  device: Device;
  isEdit = false;
  form = new FormGroup({
    uid: new FormControl('', [Validators.required]),
    vendor: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    gatewaySerialNumber: new FormControl('', [Validators.required])
  });


  constructor(private deviceService: DeviceService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddEditDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { device: Device }) {
  }

  ngOnInit(): void {
    this.device = this.data.device;
    this.isEdit = this.device.uid !== undefined;

    if (this.isEdit) {
      this.form.get('uid').disable();
      this.form.patchValue(this.device);
    } else {
      this.form.get('gatewaySerialNumber').setValue(this.device.gatewaySerialNumber);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    if (this.isEdit) {
      this.deviceService.updateDevice(this.form.getRawValue()).subscribe(() => {
        this.saveCallback();
      });
    } else {
      this.deviceService.createDevice(this.form.getRawValue()).subscribe(() => {
        this.saveCallback();
      });
    }
  }

  saveCallback() {
    this.snackBar.open('Data Saved Successfully', '', {duration: 3000, panelClass: 'success-snackbar'});
    this.dialogRef.close(true);
  }

}
