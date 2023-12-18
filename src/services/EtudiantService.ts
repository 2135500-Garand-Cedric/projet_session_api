import EtudiantRepo from '@src/repos/EtudiantRepo';
import { IEtudiant, IMoyenneEtudiant, IPourcentage } from '@src/models/Etudiant';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const ETUDIANT_NOT_FOUND_ERR = 'Etudiant pas trouve';


// **** Functions **** //

/**
 * Obtenir la liste de tous les etudiants
 * @returns un tableau contenant tous les etudiants
 */
function getAll(): Promise<IEtudiant[]> {
  return EtudiantRepo.getAll();
}

/**
 * Obtenir un etudiant a partir de son id
 * @param id l'id de l'etudiant
 * @returns l'etudiant trouve avec l'id
 */
function getOne(id: string): Promise<IEtudiant | null> {
  return EtudiantRepo.getOne(id);
}

/**
 * Obtenir la liste de tous les etudiants qui ont un cours
 * @param cours le nom du cours
 * @returns un tableau avec tous les etudiants qui ont le cours
 */
function getByCours(cours: string): Promise<IEtudiant[]> {
  return EtudiantRepo.getByCours(cours);
}

/**
 * Obtenir la liste de tous les etudiants qui appartiennent a une cohorte
 * @param cohorte le nom de la cohorte
 * @returns Un tableau avec tous les etudiants qui appartiennent a la cohorte
 */
function getByCohorte(cohorte: string): Promise<IEtudiant[]> {
  return EtudiantRepo.getByCohorte(cohorte);
}

/**
 * Obtenir la liste de tous les etudiants qui font parti des vulkins
 * @returns Un tableau avec tous les etudiants qui font parti des Vulkins
 */
function getVulkins(): Promise<IEtudiant[]> {
  return EtudiantRepo.getVulkins();
}

/**
 * Obtenir la moyenne de chaque cours d'un etudiant
 * @param nom le nom de l'etudiant
 * @returns Un tableau avec le nom de chaque cours de l'etudiant ainsi que la moyenne de ceux-ci
 */
async function getMoyenneParCours(nom: string): Promise<IMoyenneEtudiant[]> {
  return EtudiantRepo.getMoyenneParCours(nom);
}

/**
 * Obtenir le pourcentage d'etudiants qui font parti des Vulkins
 * @returns le pourcentage d'etudiants Vulkins
 */
function getPourcentageVulkins(): Promise<IPourcentage[]> {
  return EtudiantRepo.getPourcentageVulkins();
}

/**
 * Ajoute un etudiant
 * @param etudiant l'etudiant a ajouter
 * @returns le nouvel etudiant ajoute
 */
function addOne(etudiant: IEtudiant): Promise<IEtudiant> {
  return EtudiantRepo.add(etudiant);
}

/**
 * Mettre a jour un etudiant
 * @param etudiant l'etudiant a mettre a jour
 * @returns l'etudiant mis a jour
 */
async function updateOne(etudiant: IEtudiant): Promise<IEtudiant> {
  const persists = await EtudiantRepo.persists(etudiant._id || "-1");
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      ETUDIANT_NOT_FOUND_ERR,
    );
  }
  return EtudiantRepo.update(etudiant);
}

/**
 * Supprime un etudiant avec l'id
 * @param id l'id de l'etudiant
 */
async function _delete(id: string): Promise<void> {
  const persists = await EtudiantRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      ETUDIANT_NOT_FOUND_ERR,
    );
  }
  EtudiantRepo.delete(id);
}


// **** Export **** //

export default {
  getAll,
  getOne,
  getByCours,
  getByCohorte,
  getVulkins,
  getMoyenneParCours,
  getPourcentageVulkins,
  addOne,
  updateOne,
  delete: _delete,
} as const;
