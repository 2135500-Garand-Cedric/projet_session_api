import Etudiant, { IEtudiant, IMoyenneEtudiant, IPourcentage } from '@src/models/Etudiant';

// **** Functions **** //

/**
 * Verifie si l'etudiant existe
 * @param id l'id de l'etudiant
 * @returns vrai si l'etudiant existe, faux sinon
 */
async function persists(id: string): Promise<boolean> {
  const etudiant = Etudiant.findById(id);
  return etudiant !== null;
}

/**
 * Obtenir la liste de tous les etudiants
 * @returns un tableau contenant tous les etudiants
 */
async function getAll(): Promise<IEtudiant[]> {
  const etudiants = Etudiant.find();
  return etudiants;
}

/**
 * Obtenir un etudiant a partir de son id
 * @param id l'id de l'etudiant
 * @returns l'etudiant trouve avec l'id
 */
async function getOne(id: string): Promise<IEtudiant | null> {
  const etudiant = Etudiant.findById(id);
  return etudiant;
}

/**
 * Obtenir la liste d'etudiants qui ont un cours
 * @param cours le nom du cours
 * @returns un tableau d'etudiant qui ont le cours
 */
async function getByCours(cours: string): Promise<IEtudiant[]> {
  const etudiants = Etudiant.find({"cours.nom": cours});
  return etudiants;
}

/**
 * Obtenir la liste d'etudiants qui appartiennent a une cohorte
 * @param cohorte le nom de la cohorte
 * @returns un tableau d'etudiants qui appartiennent a la cohorte
 */
async function getByCohorte(cohorte: string): Promise<IEtudiant[]> {
  const etudiants = Etudiant.find({"nomCohorte": cohorte});
  return etudiants;
}

/**
 * Obtenir la liste d'etudiants qui sont dans les Vulkins
 * @returns un tableau d'etudiants qui sont dans les Vulkins
 */
async function getVulkins(): Promise<IEtudiant[]> {
  const etudiants = Etudiant.find({"estVulkins": true});
  return etudiants;
}

/**
 * Obtenir la moyenne de chaque cours d'un etudiants
 * @param nom le nom de l'etudiant
 * @returns un tableau avec le nom de chaque cours que l'etudiant possede ainsi que la moyenne de ceux-ci
 */
async function getMoyenneParCours(nom: string): Promise<IMoyenneEtudiant[]> {
  const moyennes = Etudiant.aggregate([
    {
      $match: {
        "nom": nom,
      }
    },
    {
      $unwind: "$cours"
    },
    {
      $group: {
        _id: "$nom",
        cours: {
          $push: {
            nom: "$cours.nom",
            moyenne: { $avg: "$cours.notes" },
          }
        }
      }
    }
  ]);
  return moyennes;
}

/**
 * Obtenir le pourcentage d'eleves qui font parti des Vulkins
 * @returns le pourcentage d'etudiants Vulkins
 */
async function getPourcentageVulkins(): Promise<IPourcentage[]> {
  const pourcentage = Etudiant.aggregate([
    { "$facet": {
      "total": [
        { "$count": "total" },
      ],
      "vulkins": [
        { "$match" : {"estVulkins": {"$eq": true}}},
        { "$count": "vulkins" }
      ]
    }},
    { "$project": {
      "pourcentage": {
        "$multiply": [
            { "$divide": [
              {"$arrayElemAt": ["$vulkins.vulkins", 0]},
              {"$arrayElemAt": ["$total.total", 0]}
            ]},
            100
          ]
      }
    }}
  ]);
  return pourcentage;
}

/**
 * Ajouter un etudiant
 * @param etudiant l'etudiant a ajouter
 * @returns le nouvel etudiant ajoute
 */
async function add(etudiant: IEtudiant): Promise<IEtudiant> {
  const nouvelEtudiant = new Etudiant(etudiant);
  await nouvelEtudiant.save();
  return nouvelEtudiant;
}

/**
 * Mettre a jour un etudiant
 * @param etudiant l'etudiant a mettre a jour
 * @returns l'etudiant mis a jour
 */
async function update(etudiant: IEtudiant): Promise<IEtudiant> {
  const etudiantAUpdate = await Etudiant.findById(etudiant._id);
  if (etudiantAUpdate === null) {
    throw new Error('Etudiant non trouvé');
  }
  etudiantAUpdate.nom = etudiant.nom;
  etudiantAUpdate.courriel = etudiant.courriel;
  etudiantAUpdate.dateNaissance = etudiant.dateNaissance;
  etudiantAUpdate.da = etudiant.da;
  etudiantAUpdate.estVulkins = etudiant.estVulkins;
  etudiantAUpdate.anneeEtude = etudiant.anneeEtude;
  etudiantAUpdate.nomCohorte = etudiant.nomCohorte;
  etudiantAUpdate.cours = etudiant.cours;
  await etudiantAUpdate.save();
  return etudiantAUpdate;
}

/**
 * Supprime un etudiant avec son id
 * @param id l'id de l'etudiant a supprimer
 */
async function delete_(id: string): Promise<void> {
  await Etudiant.findByIdAndDelete(id);
}

// **** Export default **** //

export default {
  persists,
  getOne,
  getAll,
  getByCours,
  getByCohorte,
  getVulkins,
  getMoyenneParCours,
  getPourcentageVulkins,
  add,
  update,
  delete: delete_,
} as const;
