import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notebook} from "../notes/model/notebook";
import {FeedbackViewModel} from "../feedback/feedback.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8081/api";
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}\\notebooks\\all`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}\\api\\feedback`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks\\save`;
  private DELETE_NOTEBBOK_URL = `${this.BASE_URL}\\notebooks\\`;

  constructor(private http: HttpClient) { }

  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }

  postFeedback(feedback: FeedbackViewModel): Observable<any>{
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK, notebook);
  }

  /**
   * API Fonction Delete Notebook
   * @param id du NoteBook à supprimer
   */
  deleteNotebook(id:string): Observable<any> {
    return this.http.delete(this.DELETE_NOTEBBOK_URL + id);
  }


}
