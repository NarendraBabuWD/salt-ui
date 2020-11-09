import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.scss']
     
})
export class UpdateTemplateComponent {
  templateId: any; template: any;
  templateKeys: any;
  editorConfig: AngularEditorConfig;
  templateSaved: boolean = false;
  constructor(
    // private adminDashboardService: AdminDashboardService,
     private router: Router,
     ) {

this.template="Dear Dr A Practitioner,<br>I would be happy to accept {PATIENT_ADDRESS} <br>and will contact the patient on their contact information {PATIENT_ADDRESS} provided and book an appointment with them.<br>{PATIENT_DOB}"

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter template text here...',
      toolbarHiddenButtons: [["insertImage", "insertVideo", "toggleEditorMode", "customClasses"]]
    }
  }

  ngOnInit(): void {
    
  }

  UpdateKeyinEditor(val: any) {
    if (document.querySelectorAll('[contenteditable]')) {
      const input: any = document.querySelectorAll('[contenteditable]')[0]
      const isSuccess = document.execCommand('insertText', false, val);
      // Firefox (non-standard method)
      if (!isSuccess && typeof input.setRangeText === "function") {
        const start = input.selectionStart;
        input.setRangeText(val);
        // update cursor to be at the end of insertion
        input.selectionStart = input.selectionEnd = start + val.length;

        // Notify any possible listeners of the change
        const e = document.createEvent("UIEvent");
        e.initEvent("input", true, false);
        input.dispatchEvent(e);
      }
    }
  }

  SaveTemplate() {
    if (this.template.trim() !== "") {
      const obj = {
        "content": this.template,
        forStatus: this.templateId === 1 ? "ACCEPTED" : "REJECTED"
      }
      // this.adminDashboardService.SaveTemplate(obj).subscribe((res: any) => {
      //   this.templateSaved = true
      // })
    }
  }

}
