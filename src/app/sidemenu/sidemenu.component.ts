import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from "@angular/common";

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  showAddProjectForm: boolean = false;
  newProjectName: string = '';
  projectList: string[] = [];

  toggleAddProject() {
    this.showAddProjectForm = !this.showAddProjectForm;
  }

  addProject() {
    if (!this.newProjectName.trim()) {
      alert('Project name cannot be empty');
      return;
    }

    const projectName = this.newProjectName.trim();
    if (this.projectList.includes(projectName)) {
      alert('Project already exists');
    } else {
      this.projectList.push(projectName);
      this.newProjectName = '';
      this.showAddProjectForm = false;
    }
  }

  menuList = [
    { text: 'Dashboard', image: 'assets/img/home.png' },
    { text: 'UI Elements', image: 'assets/img/cps.png' },
    { text: 'Icons', image: 'assets/img/contact.png' },
    { text: 'Forms', image: 'assets/img/line.png' },
    { text: 'Charts', image: 'assets/img/grafic.png' },
    { text: 'Tables', image: 'assets/img/tables.png' }
  ];
}
