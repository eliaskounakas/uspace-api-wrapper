export interface Lehrveranstaltung {
  lvNr: string;
  gruppenNr: string;
  semesterKuerzel: string;
  titel: string;
  typ: string;
  lehrende: Lehrende[]; 
  pruefungsimmanent: boolean;
  termine: Termin[];
  anmerkungStattTermin: boolean;
  terminAnmerkungen: string | null;
  durchfuehrungsform: any | null; 
}

export interface Pruefung {
  extId: number;
  datum: number;
  lehrinhaltTitel: string;
  lehrinhaltNummer: string;
  beurteilender: Pruefer; 
  ufindLink: string;
  titelzusatz: string | null;
  terminAnmerkungen: string | null;
  termine: Termin[]; 
  pruefer: Pruefer[]; 
  durchfuehrungsform: any | null; 
}

export interface ElearningCourse {
  name: string;
  url: string;
}

export interface Studium {
  studienElementVerlaufExtId: string;
  name: string;
}

export interface Termin {
    beginn: number;
    ende: number;
    raumName: string;
}

export interface Lehrende {
    vorname: string;
    nachname: string;
    rolle: string | null;
}

export interface Pruefer extends Lehrende {}

export interface CourseData {
  lehrveranstaltung: Lehrveranstaltung;
  pruefung: Pruefung | null;
  elearningCourse: ElearningCourse | null;
  gruppenbezeichnung: string | null;
  studium: Studium;
  anmeldekennung: string;
  status: string;
  nichtErschienen: boolean;
  semesterKuerzel: string;
  anmeldungTyp: string;
  belegungTid: number | null;
  reservedPlaetze: number;
  gesamtkontingent: number | null;
  wartelistenPlatz: number | null;
  wartelistenPlatzRange: string | null;
  usesUspaceAnmeldesystem: boolean;
  bestaetigenBis: string | null;
}
