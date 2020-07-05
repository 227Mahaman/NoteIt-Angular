import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert("An error has occured;");
      }
    );
  }

  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert("Erreur de chargement des notes;");
      }
    );
  }

  /**
   * Fonction de création de Notebook
   */
  createNotebook() {
    let newNotebook: Notebook = {
      id: null,
      name:'New notebook'
    }
    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert("An error has occured while saving the notebook");
      }
    );
  }

  /**
   * Fonction de Modification d'un Notebook
   * @param updateNotebook l'objet à modifier
   */
  updateNotebook(updateNotebook: Notebook) {
    this.apiService.postNotebook(updateNotebook).subscribe(
      res => {
        this.notebooks.push(updateNotebook);
      },
      err => {
        alert("An error has occured while saving the notebook");
      }
    );
  }

  /**
   * Fonction de Suppression de Notebook
   * @param notebook l'objet à supprimer
   */
  deleteNotebook(notebook: Notebook) {
    if(confirm("Etes vous sûre de vouloir supprimer le Notebook?")){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        err => {
          alert("An error has occured while deleting the notebook");
        }
      );
    }
  }

  deleteNote(note: Note) {
    if(confirm("Etes vous sûre de vouloir supprimer la Note?")) {
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          alert("An error has occured while deleting the note");
        }
      );
    }
  }

  createNote(notebookId: string) {
    let newNote:Note = {
      id:null,
      title: "New Note",
      text:"Write some text in here",
      lastModifiedOn:null,
      notebookId: notebookId
    }
    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("An error has occured while creating the note");
      }
    );
  }

  selectNotebook(notebook: Notebook){
    this.selectedNotebook = notebook;
    this.apiService.getNotesByNotebooks(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert("An error has occured while downloading the note");
      }
    );
  }

  updateNote(updateNote: Note) {
    this.apiService.saveNote(updateNote).subscribe(
      res => {

      },
      err => {
        alert("An error has occured while updating the note");
      }
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
