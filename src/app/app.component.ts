import { EmailTemplateService } from './services/email-template.service';
import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthResponseData, AuthService } from './auth/auth.service';
import { JobTitleService } from './services/job-title.service';
import { JobTitle } from './models/job-title.model';
import { AppError } from './common/app-error';
import { NotFoundError } from './common/not-found-error';
import { EmailTemplate } from './models/email-template.model';

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
        this.createJobTitle();
      },
      (error) => {
        this.error = 'An Error occurred!';
        this.isLoading = false;
      }
    );
  }
  getJobTitleList() {
    setTimeout(
      () =>
        this.jobTitleService
          .getAll<JobTitle>()
          .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (jobTitles) => {
              this.jobTitleList = jobTitles;
              console.log('job-title get All: ', jobTitles);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts get failed', error.originalError);
              else throw error;
            },
          }),
      3000
    );
  }
  createJobTitle() {
    const newJobTitle = new JobTitle({
      updatedBy: 44,
      updatedOn: new Date(),
      clientData: '',
      arName: 'فرع عمل جديد',
      enName: 'new job title',
      isSystem: true,
      jobType: 0,
      status: true,
      statusDateModified: new Date(),
      statusInfo: { arName: 'wow', enName: 'wow', id: 0, fnId: '', parent: 0 },
      typeInfo: { arName: 'wow', enName: 'wow', id: 0, fnId: '', parent: 0 },
    });
    setTimeout(
      () =>
        this.jobTitleService
          .create<JobTitle>(newJobTitle)
          .pipe(
            tap((data) =>
              console.log('create new job-title: ' + JSON.stringify(data))
            )
          )
          .subscribe({
            next: (jobTitle) => {
              this.createdJobTitle = new JobTitle(jobTitle);
              console.log(' new job-title created: ', jobTitle);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts get failed', error.originalError);
              else throw error;
            },
          }),
      5000
    );
  }
  getJobTitleById() {
    setTimeout(
      () =>
        this.jobTitleService
          .get<JobTitle>(0)
          .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (jobTitles) => {
              this.createdJobTitle = jobTitles;
              console.log('job-title get by Id: ', jobTitles);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts get failed', error.originalError);
              else throw error;
            },
          }),
      3000
    );
  }
  updateJobTitle() {
    const newJobTitle = new JobTitle({
      updatedBy: 44,
      updatedOn: new Date(),
      clientData: '',
      arName: 'فرع عمل معدل',
      enName: 'updated job title',
      isSystem: true,
      jobType: 0,
      status: true,
      statusDateModified: new Date(),
      statusInfo: { arName: 'wow', enName: 'wow', id: 0, fnId: '', parent: 0 },
      typeInfo: { arName: 'wow', enName: 'wow', id: 0, fnId: '', parent: 0 },
    });
    setTimeout(
      () =>
        this.jobTitleService
          .update<JobTitle>(newJobTitle)
          .pipe(
            tap((data) =>
              console.log('update job-title: ' + JSON.stringify(data))
            )
          )
          .subscribe({
            next: (jobTitle) => {
              this.createdJobTitle = new JobTitle(jobTitle);
              console.log('  job-title updated: ', jobTitle);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts update failed', error.originalError);
              else throw error;
            },
          }),
      5000
    );
  }
  deleteJobTitle() {
    setTimeout(
      () =>
        this.jobTitleService
          .remove('0')

          .subscribe({
            next: (response) => {
              console.log('  job-title deleted: ', response);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts delete failed', error.originalError);
              else throw error;
            },
          }),
      5000
    );
  }

  getEmailTemplateList() {
    setTimeout(
      () =>
        this.emailTemplateService
          .getAll<EmailTemplate>()
          .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (emailTemplates) => {
              this.emailTemplateList = emailTemplates;
              console.log('job-title get All: ', emailTemplates);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts get failed', error.originalError);
              else throw error;
            },
          }),
      3000
    );
  }
  createEmailTemplate() {
    const newEmailTemplate = new EmailTemplate({
      updatedBy: 44,
      updatedOn: new Date(),
      clientData: '',
      arName: 'فرع عمل جديد',
      enName: 'new job title',
      isGlobal: true,
      status: true,
    });
    setTimeout(
      () =>
        this.emailTemplateService
          .create<EmailTemplate>(newEmailTemplate)
          .pipe(
            tap((data) =>
              console.log('create new job-title: ' + JSON.stringify(data))
            )
          )
          .subscribe({
            next: (emailTemplate) => {
              this.createdEmailTemplate = new EmailTemplate(emailTemplate);
              console.log(' new job-title created: ', emailTemplate);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts get failed', error.originalError);
              else throw error;
            },
          }),
      5000
    );
  }
  getEmailTemplateById() {
    setTimeout(
      () =>
        this.emailTemplateService
          .get<EmailTemplate>(0)
          .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))))
          .subscribe({
            next: (emailTemplates) => {
              this.createdEmailTemplate = emailTemplates;
              console.log('job-title get by Id: ', emailTemplates);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts get failed', error.originalError);
              else throw error;
            },
          }),
      3000
    );
  }
  updateEmailTemplate() {
    const newEmailTemplate = new EmailTemplate({
      updatedBy: 44,
      updatedOn: new Date(),
      clientData: '',
      arName: 'فرع عمل معدل',
      enName: 'updated job title',
      status: true,
    });
    setTimeout(
      () =>
        this.emailTemplateService
          .update<EmailTemplate>(newEmailTemplate)
          .pipe(
            tap((data) =>
              console.log('update job-title: ' + JSON.stringify(data))
            )
          )
          .subscribe({
            next: (emailTemplate) => {
              this.createdEmailTemplate = new EmailTemplate(emailTemplate);
              console.log('  job-title updated: ', emailTemplate);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts update failed', error.originalError);
              else throw error;
            },
          }),
      5000
    );
  }
  deleteEmailTemplate() {
    setTimeout(
      () =>
        this.emailTemplateService
          .remove('0')

          .subscribe({
            next: (response) => {
              console.log('  job-title deleted: ', response);
            },
            error: (error: AppError) => {
              if (error instanceof NotFoundError)
                console.log('posts delete failed', error.originalError);
              else throw error;
            },
          }),
      5000
    );
  }
}
