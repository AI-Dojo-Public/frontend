import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from "../abstraction/material-module/material.module";
import {AgentService, PackageEntry, AgentAddition, AgentRemoval} from '../abstraction/agent.service';
import {map} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {AlertDialog} from "../alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";




@Component({
  selector: 'app-conf-agents',
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './conf-agents.component.html',
  styleUrl: './conf-agents.component.scss'
})
export class ConfAgentsComponent {
  installForm: FormGroup;
  dataSource = new MatTableDataSource<PackageEntry>(); // Material Table DataSource
  displayedColumns: string[] = ['module_name', 'package_name', 'package_version', 'actions'];

  constructor(private fb: FormBuilder, private agentService: AgentService, public dialog: MatDialog) {
    this.installForm = this.fb.group({
      method: [''],
      pathOrUrl: [''],
      gitDetails: this.fb.group({
        accessToken: [''],
        username: ['']
      }),
    });
  }

  ngOnInit(): void {
    this.installForm.controls['method'].setValue("pypi")
    this.loadAgents();
  }


  loadAgents() {
    this.agentService.listAgents().pipe(
      map(agents => agents)
    ).subscribe(data => {
      this.dataSource.data = data;
    });
  }
  /**
   * Install an agent using the service
   */
  installAgent(): void {
    const agentForm = this.installForm.value;

    const agent: AgentAddition = { method: agentForm.method, path: agentForm.pathOrUrl, user: agentForm.gitDetails.username,
      access_token: agentForm.gitDetails.accessToken };

    this.agentService.addAgent(agent).subscribe({

      next: () => {
        this.dialog.open(AlertDialog, {
          data: {
            icon: 'Check',
            message: 'Agent installed successfully!'
          }
        });
        this.loadAgents();
      },
      error: (error) => {
        console.error('Error installing agent:', error);

        // Extract detail from error response
        let errorMessage = 'Failed to add agent';
        if (error.error?.detail) {
          errorMessage = error.error.detail;
        }

        this.dialog.open(AlertDialog, {
          data: { icon: 'Error', message: errorMessage }
        });
      }
    });
  }

  /**
   * Remove an agent using the service
   */
  removeAgent(packageName: string): void {
    const agent: AgentRemoval = { name: packageName };

    this.agentService.removeAgent(agent).subscribe({
      next: () => {
        this.dialog.open(AlertDialog, {
          data: {
            icon: 'Check',
            message: 'Agent removed successfully!'
          }
        });
        this.loadAgents(); // Refresh the observable stream
      },
      error: (error) => {
        console.error('Error removing agent:', error);
        this.dialog.open(AlertDialog, {
          data: {
            icon: 'Error',
            message: 'Failed to remove agent'
          }
        });
      }
    });
  }
}
