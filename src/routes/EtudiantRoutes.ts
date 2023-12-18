import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import EtudiantService from '@src/services/EtudiantService';
import { IEtudiant } from '@src/models/Etudiant';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Obtenir la liste de tous les etudiants
 */
async function getAll(_: IReq, res: IRes) {
  const etudiants = await EtudiantService.getAll();
  return res.status(HttpStatusCodes.OK).json({ etudiants });
}

/**
 * Obtenir un etudiant avec son id
 */
async function getOne(req: IReq, res: IRes) {
  const id = req.params.id;
  const etudiant = await EtudiantService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ etudiant });
}

/**
 * Obtenir tous les etudiants qui ont le cours en parametre
 */
async function getByCours(req: IReq, res: IRes) {
  const cours = req.params.cours;
  const etudiants = await EtudiantService.getByCours(cours);
  return res.status(HttpStatusCodes.OK).json({ etudiants });
}

/**
 * Obtenir tous les etudiants qui font parti de la cohorte en parametre
 */
async function getByCohorte(req: IReq, res: IRes) {
  const cohorte = req.params.cohorte;
  const etudiants = await EtudiantService.getByCohorte(cohorte);
  return res.status(HttpStatusCodes.OK).json({ etudiants });
}

/**
 * Obtenir tous les etudiants qui sont des Vulkins
 */
async function getVulkins(_: IReq, res: IRes) {
  const etudiants = await EtudiantService.getVulkins();
  return res.status(HttpStatusCodes.OK).json({ etudiants });
}

/**
 * Obtenir la moyenne de tous les cours de l'etudiant
 */
async function getMoyenneParCours(req: IReq, res: IRes) {
  const nom = req.params.nom;
  const moyennes = await EtudiantService.getMoyenneParCours(nom);
  return res.status(HttpStatusCodes.OK).json({ "nom": moyennes[0]._id, "cours": moyennes[0].cours });
}

/**
 * Obtenir le pourcentage d'etudiant qui sont des athletes Vulkins
 */
async function getPourcentageVulkins(_: IReq, res: IRes) {
  const pourcentage = await EtudiantService.getPourcentageVulkins();
  return res.status(HttpStatusCodes.OK).json({ "pourcentageVulkins": pourcentage[0].pourcentage });
}

/**
 * Ajouter un etudiant
 */
async function add(req: IReq<{etudiant: IEtudiant}>, res: IRes) {
  const { etudiant } = req.body;
  const nouvelEtudiant = await EtudiantService.addOne(etudiant);
  return res.status(HttpStatusCodes.CREATED).json({ nouvelEtudiant });
}

/**
 * Mettre a jour un etudiant 
 */
async function update(req: IReq<{etudiant: IEtudiant}>, res: IRes) {
  const { etudiant } = req.body;
  const etudiantUpdate = await EtudiantService.updateOne(etudiant);
  return res.status(HttpStatusCodes.OK).json({ etudiantUpdate });
}

/**
 * Supprimer un etudiant par son id
 */
async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await EtudiantService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getByCours,
  getByCohorte,
  getVulkins,
  getMoyenneParCours,
  getPourcentageVulkins,
  add,
  update,
  delete: delete_,
} as const;
