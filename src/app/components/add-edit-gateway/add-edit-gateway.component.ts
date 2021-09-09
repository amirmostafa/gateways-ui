import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GatewayService} from '../../services/gateway.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Gateway} from '../../models/gateway';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-gateway',
  templateUrl: './add-edit-gateway.component.html',
  styleUrls: ['./add-edit-gateway.component.css']
})
export class AddEditGatewayComponent implements OnInit {

  gateway: Gateway;
  isEdit = false;
  form = new FormGroup({
    serialNumber: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    ipv4: new FormControl('', [Validators.required, Validators.pattern('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$')])
  });


  constructor(private gatewayService: GatewayService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddEditGatewayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { gateway: Gateway }) {
  }

  ngOnInit(): void {
    this.gateway = this.data.gateway;
    this.isEdit = this.gateway !== undefined;

    if (this.isEdit) {
      this.form.get('serialNumber').disable();
      this.form.patchValue(this.gateway);
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
      this.gatewayService.updateGateway(this.form.getRawValue()).subscribe(() => {
        this.saveCallback();
      });
    } else {
      this.gatewayService.createGateway(this.form.getRawValue()).subscribe(() => {
        this.saveCallback();
      });
    }
  }

  saveCallback() {
    this.snackBar.open('Data Saved Successfully', '', {duration: 3000, panelClass: 'success-snackbar'});
    this.dialogRef.close(true);
  }

}
