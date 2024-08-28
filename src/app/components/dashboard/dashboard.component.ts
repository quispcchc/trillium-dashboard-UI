import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as powerbi from 'powerbi-client';
import { models } from 'powerbi-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get<{ embedToken: string }>('/api/getEmbedToken').subscribe(response => {
    //   this.embedReport(response.embedToken);
    // });
  }

  // embedReport(embedToken: string): void {
  //   const embedUrl = '<Your_Report_Embed_Url>'; // Replace with your actual Power BI Embed URL
  //   const reportId = '<Your_Report_Id>'; // Replace with your actual Report ID

  //   const embedConfig = {
  //     type: 'report',
  //     id: reportId,
  //     embedUrl: embedUrl,
  //     accessToken: embedToken,
  //     tokenType: models.TokenType.Embed,
  //     settings: {
  //       filterPaneEnabled: true,
  //       navContentPaneEnabled: true
  //     }
  //   };

  //   const reportContainer = document.getElementById('reportContainer');
  //   if (reportContainer) {
  //     // Use the `powerbi.embed` method to embed the report
  //     powerbi.embed(reportContainer, embedConfig);
  //   }
  // }
}
