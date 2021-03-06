import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/index';
import { InterviewService } from '../_services/index';
import { Interview } from '../../_models/index';
import { AlertService } from '../../_alert/index';

@Component({
  selector: 'home-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {
    newinterview: Interview = new Interview();
    Interview: Interview[] = [];
	editingData: boolean[] = [];

	
    constructor(private authenticationService: AuthenticationService,
				private InterviewService: InterviewService,
				private alertService: AlertService
				)
	{
    }

    ngOnInit() {
        this.loadAllInterview();		
    }

	loadEdit(){	
		for (var interview of this.Interview){ 
			this.editingData[interview.id] = false;
		};
	}	

    private loadAllInterview() {
        this.InterviewService.getAll()
									.subscribe( 
												Interview => { this.Interview = Interview;
															 this.loadEdit();
															}
											  );
    }

    deleteInterview(interview: Interview) {
        this.InterviewService.delete(interview.id)
            .subscribe(
                data => {
					var index = this.Interview.indexOf(interview);
					this.Interview.splice(index, 1); 
                },
                error => {
                    this.alertService.error(error);
                });
    }

	editInterview(interview: Interview)
	{
		this.editingData[interview.id] = true;
	}

	cancelInterview(id: number)
	{
		this.editingData[id] = false;
	}
	
    updateInterview(interview: Interview) {
        this.InterviewService.update(interview)
            .subscribe(
                interview => {					
					this.editingData[interview.id] = false;
                },
                error => {
                    this.alertService.error(error);
                });
    }

    create() {
        this.InterviewService.create(this.newinterview)
            .subscribe(
                data => {
					this.loadAllInterview();
                },
                error => {
                    this.alertService.error(error);
                });
    }

}
