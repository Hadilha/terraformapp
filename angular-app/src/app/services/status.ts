import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environments';

export interface ProjectInsight {
projectName: string;
analysisTimestamp: string;
folderStructure: {
files: string[];
folders: Array<{ name: string; contents: any }>;
};
linesOfCode: { angular: number; flask: number; terraform: number; total: number };
technologyStack: string[];
infrastructure: { terraform: boolean; dockerCompose: boolean; ciCd: boolean };
codeQuality: { score: number; issues: string[] };
narrativeReport: string;
status: string;
version: string;
}






@Injectable({ providedIn: 'root' })
export class StatusService {
private apiUrl = `${environment.apiUrl}/project/insight`;
constructor(private http: HttpClient) {}
getInsight(): Observable<ProjectInsight> {
return this.http.get<ProjectInsight>(this.apiUrl);
}
}