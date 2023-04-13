import { EmailTemplateService } from './services/email-template.service';
import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthResponseData, AuthService } from './auth/auth.service';
import { JobTitleService } from './services/job-title.service';
import { JobTitle } from './models/job-title.model';
import { AppError } from './common/app-error';
import { NotFoundError } from './common/not-found-error';
import { EmailTemplate } from './models/email-template.model';
import { HttpParams } from '@angular/common/http';
import { ResponseData } from './services/data.service';
import { BadInputError } from './common/bad-input-error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading = false;
  error = '';
  jobTitleList!: JobTitle[];
  emailTemplateList!: EmailTemplate[];
  createdJobTitle!: JobTitle;
  createdEmailTemplate!: EmailTemplate;
  constructor(
    private authService: AuthService,
    private jobTitleService: JobTitleService,
    private emailTemplateService: EmailTemplateService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.signIn().subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.getJobTitleList();
        this.getEmailTemplateList();
      },
      (error) => {
        this.error = 'An Error occurred!';
        this.isLoading = false;
      }
    );
  }
  getJobTitleList() {
    let queryParams = new HttpParams().append('offset', 0);
    queryParams = queryParams.append('limit', 2);
    console.log(queryParams);

    setTimeout(
      () =>
        this.jobTitleService
          .getAll<JobTitle>(queryParams)
          .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (jobTitles) => {
              this.jobTitleList = jobTitles;
              console.log('job-title get All: ', jobTitles);
              this.createJobTitle();
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('job-titles get failed', error.originalError);
              else throw error;
            },
          }),
      1000
    );
  }
  createJobTitle() {
    const newJobTitle = new JobTitle({
      arName: Math.random().toString(36).substring(2, 6),
      enName: Math.random().toString(36).substring(2, 6),
      isSystem: false,
      jobType: 0,
      status: 0,
    });
    setTimeout(
      () =>
        this.jobTitleService
          .create<JobTitle>(newJobTitle, '/admin/full')
          // .pipe(
          //   tap((data) =>
          //     console.log('create new job-title: ' + JSON.stringify(data))
          //   )
          // )
          .subscribe({
            next: (jobTitle) => {
              this.createdJobTitle = new JobTitle(Object.values(jobTitle)[1]);
              console.log(' new job-title created: ', this.createdJobTitle);
              this.getJobTitleById();
            },
            error: (error: AppError) => {
              if (error instanceof BadInputError)
                console.log('job-title create failed', error.originalError);
              else throw error;
            },
          }),
      1000
    );
  }
  getJobTitleById() {
    setTimeout(
      () =>
        this.jobTitleService
          .getById<JobTitle>(this.createdJobTitle.id as number)
          // .getById<JobTitle>(56)
          // .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (jobTitle) => {
              console.log('job-title get by Id: ', jobTitle);
              this.updateJobTitle();
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('job-title get failed', error.originalError);
              else throw error;
            },
          }),
      1000
    );
  }
  updateJobTitle() {
    const newJobTitle = new JobTitle({
      id: this.createdJobTitle.id,
      arName: this.createdJobTitle.arName + 'معدل',
      enName: this.createdJobTitle.enName + 'updated',
      status: 0,
      jobType: 0,
      isSystem: false,
      // id: 56,
    });

    return setTimeout(
      () =>
        this.jobTitleService
          .update<JobTitle>(newJobTitle, '/admin/full')

          .subscribe({
            next: (jobTitle) => {
              console.log('  job-title updated: ', jobTitle);
              this.deleteJobTitle();
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('job-title update failed', error.originalError);
              else throw error;
            },
          }),
      1000
    );
  }
  deleteJobTitle() {
    setTimeout(
      () =>
        this.jobTitleService
          // .remove('56', '/admin')
          .remove(String(this.createdJobTitle.id), '/admin')

          .subscribe({
            next: (response) => {
              console.log('  job-title deleted: ', response);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('job-title deleted failed', error.originalError);
              else throw error;
            },
          }),
      1000
    );
  }

  getEmailTemplateList() {
    let queryParams = new HttpParams().append('offset', 0);
    queryParams = queryParams.append('limit', 2);
    // console.log(queryParams);

    setTimeout(
      () =>
        this.emailTemplateService
          .getAll<EmailTemplate>(queryParams)
          .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (emailTemplates) => {
              this.emailTemplateList = emailTemplates;
              console.log('email-template get All: ', emailTemplates);
              this.createEmailTemplate();
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('email-template get failed', error.originalError);
              else throw error;
            },
          }),
      3000
    );
  }
  createEmailTemplate() {
    const newEmailTemplate = new EmailTemplate({
      arName: Math.random().toString(36).substring(2, 6),
      enName: Math.random().toString(36).substring(2, 6),
      status: 0,
      isGlobal: true,
      enSubjectTemplate: 'string',
      enBodyTemplate: 'string',
      arSubjectTemplate: 'string',
      arBodyTemplate: 'string',
    });
    setTimeout(
      () =>
        this.emailTemplateService
          .create<EmailTemplate>(newEmailTemplate, '/admin/full')
          // .pipe(
          //   tap((data) =>
          //     console.log('create new email-template: ' + JSON.stringify(data))
          //   )
          // )
          .subscribe({
            next: (emailTemplate) => {
              this.createdEmailTemplate = new EmailTemplate(
                Object.values(emailTemplate)[1]
              );
              console.log(
                ' new email-template created: ',
                this.createdEmailTemplate
              );
              this.getEmailTemplateById();
            },
            error: (error: AppError) => {
              if (error instanceof BadInputError)
                console.log(
                  'email-template create failed',
                  error.originalError
                );
              else throw error;
            },
          }),
      1000
    );
  }
  getEmailTemplateById() {
    setTimeout(
      () =>
        this.emailTemplateService
          .getById<EmailTemplate>(this.createdEmailTemplate.id as number)
          // .getById<EmailTemplate>(56)
          // .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (emailTemplate) => {
              console.log('email-template get by Id: ', emailTemplate);
              this.updateEmailTemplate();
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('email-template get failed', error.originalError);
              else throw error;
            },
          }),
      1000
    );
  }
  updateEmailTemplate() {
    const newEmailTemplate = new EmailTemplate({
      id: this.createdEmailTemplate.id,
      arName: this.createdEmailTemplate.arName + 'معدل',
      enName: this.createdEmailTemplate.enName + 'updated',
      status: 0,
      isGlobal: true,
      enSubjectTemplate: 'string',
      enBodyTemplate: 'string',
      arSubjectTemplate: 'string',
      arBodyTemplate: 'string',
    });

    return setTimeout(
      () =>
        this.emailTemplateService
          .update<EmailTemplate>(newEmailTemplate, '/admin/full')

          .subscribe({
            next: (emailTemplate) => {
              console.log('  email-template updated: ', emailTemplate);
              this.deleteEmailTemplate();
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log(
                  'email-template update failed',
                  error.originalError
                );
              else throw error;
            },
          }),
      1000
    );
  }
  deleteEmailTemplate() {
    setTimeout(
      () =>
        this.emailTemplateService
          // .remove('56', '/admin')
          .remove(String(this.createdEmailTemplate.id), '/admin')

          .subscribe({
            next: (response) => {
              console.log('  email-template deleted: ', response);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log(
                  'email-template deleted failed',
                  error.originalError
                );
              else throw error;
            },
          }),
      1000
    );
  }
}
