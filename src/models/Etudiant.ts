import mongoose, { Schema, model } from 'mongoose';

// Types
const nomCohortes: string[] = ['chats_vaillants', 'chevaux_curieux', 'baleines_bossues'];
const nomCours: string[] = ['Informatique', 'Philo', 'Chimie', 'Histoire', 'Anglais', 'Math'];

export interface ISessionUser {
    id: number;
    email: string;
    name: string;
}

export interface IMoyenneEtudiant {
    _id: string;
    cours: IMoyenneCours[];
}

export interface IMoyenneCours {
    nom: string;
    moyenne: number;
}

export interface IPourcentage {
    pourcentage: number;
}

export interface IEtudiant {
    nom: string;
    courriel: string;
    dateNaissance: Date;
    da: string;
    estVulkins: boolean;
    anneeEtude: number;
    nomCohorte: string;
    cours: ICours[];
    _id?: string;
}

export interface ICours {
    nom: string;
    enseignant: string;
    nombreHeures: number;
    estGratuit: boolean;
    cout?: number;
    notes: number[];
}


// Schemas

const CoursSchema = new Schema<ICours>({
    nom: {
        type: String,
        required: [true, "Le nom du cours est obligatoire"],
        enum: {
            values: nomCours,
            message: "Le nom du cours doit etre parmis ces choix: Informatique, Philo, Chimie, Histoire, Anglais et Math",
        },
    },
    enseignant: {
        type: String,
        required: [true, "L'enseignant qui donne le cours est obligatoire"],
    },
    nombreHeures: {
        type: Number,
        required: [true, "Le nombre d'heures du cours est obligatoire"],
        min: [0, "Le cours ne peut pas avoir un nombre d'heures negatif"],
    },
    estGratuit: {
        type: Boolean,
        required: [true, "Le cours doit avoir un propriete pour savoir s'il est gratuit"]
    },
    cout: {
        type: Number,
        min: [0, "Le cout du cours ne peut pas etre negatif"],
    },
    notes: {
        type: [Number],
        validate: {
            validator: function (tableau: number[]) {
                return tableau.forEach(note => note >= 0)
            },
            message: (props) =>
              `${props.value} n'est pas une note valide. La note doit etre plus grande que 0`,
        },
    }
});

const EtudiantSchema = new Schema<IEtudiant>({
    nom: {
        type: String,
        required: [true, "Le nom de l'etudiant est obligatoire"],
    },
    courriel: {
        type: String,
        required: [true, "Le courriel de l'etudiant est obligatoire"],
        validate: {
            validator: function (courriel: string) {
                return /^.+@.+\..+$/.test(courriel);
            },
            message: (props) =>
              `${props.value} n'est pas un courriel valide. Le courriel doit etre sous format quelquechose@quelquechose.extension`,
        },
    },
    dateNaissance: {
        type: Date,
        required: [true, "La date de naissance de l'etudiant est obligatoire"],
    },
    da: {
        type: String,
        required: [true, "Le da de l'etudiant est obligatoire"],
        validate: {
            validator: function (da: string) {
                return /^[0-9]{7}$/.test(da);
            },
            message: (props) =>
              `${props.value} n'est pas un da valide. Le da doit comporter exactement 7 chiffres.`,
        },
    },
    estVulkins: {
        type: Boolean,
        required: [true, "La propriete qui determine si l'etudiant est dans les Vulkins est obligatoire."],
    },
    anneeEtude: {
        type: Number,
        required: [true, "L'annee d'etude que l'etudiant est rendu est obligatoire"],
        min: [0, "Le nombre d'annees d'etudes ne peut pas etre negatif"],
    },
    nomCohorte: {
        type: String,
        required: [true, "Le nom de cohorte de l'etudiant est obligatoire"],
        enum: {
            values: nomCohortes,
            message: "Le nom de la cohorte doit etre parmis ces choix: chats_vaillants, chevaux_curieux et baleines_bossues",
        },
    },
    cours: {
        type: [CoursSchema],
    }
});

EtudiantSchema.virtual('age').get(function() {
    const currentDate = new Date();
    return this.dateNaissance.getTime() - currentDate.getTime()
});

EtudiantSchema.virtual('nombreHeuresTotalCours').get(function() {
    let total: number = 0;
    this.cours.forEach(cours => {
        total += cours.nombreHeures;
    });
    return total;
});

// Export
mongoose.pluralize(null);
export default model<IEtudiant>('etudiants', EtudiantSchema);
