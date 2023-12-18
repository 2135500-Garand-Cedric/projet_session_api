import { NextFunction, Request, Response, Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Etudiant from '@src/models/Etudiant';
import EtudiantRoutes from './EtudiantRoutes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// Validation d'un etudiant
function validerEtudiant(req: Request, res: Response, next: NextFunction) {
  const nouvelEtudiant = new Etudiant(req.body.etudiant);
  const erreur = nouvelEtudiant.validateSync();
  if (erreur !== null && erreur !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(erreur).end();
  } else {
    next();
  }
}

const etudiantRouter = Router();
const statsRouter = Router();

// **** Ajouter les routes au routeur Etudiant **** //
// Obtenir tous les etudiants
etudiantRouter.get(Paths.Etudiants.Get, EtudiantRoutes.getAll);
// Obtenir un etudiant
etudiantRouter.get(Paths.Etudiants.GetOne, validate(['id', 'string', 'params']), EtudiantRoutes.getOne);
// Obtenir les etudiants qui ont le cours en parametre
etudiantRouter.get(Paths.Etudiants.GetByCours, validate(['cours', 'string', 'params']), EtudiantRoutes.getByCours);
// Obtenir les etudiants qui sont dans la cohorte en parametre
etudiantRouter.get(Paths.Etudiants.GetByCohorte, validate(['cohorte', 'string', 'params']), EtudiantRoutes.getByCohorte);
// Obtenir les etudiants qui sont dans les Vulkins
etudiantRouter.get(Paths.Etudiants.GetVulkins, EtudiantRoutes.getVulkins);
// Ajouter un etudiant
etudiantRouter.post(Paths.Etudiants.Add, validerEtudiant, EtudiantRoutes.add);
// Mettre a jour un etudiant
etudiantRouter.put(Paths.Etudiants.Update, validerEtudiant, EtudiantRoutes.update);
// Supprimer un etudiant
etudiantRouter.delete(Paths.Etudiants.Delete, validate(['id', 'string', 'params']), EtudiantRoutes.delete);

// **** Ajouter les routes au routeur Stats **** //
// Obtenir la moyenne de tous les cours de l'etudiant
statsRouter.get(Paths.Stats.GetMoyenneParCours, validate(['nom', 'string', 'params']), EtudiantRoutes.getMoyenneParCours);
// Obtenir le pourcentage d'etudiants dans la Vulkins
statsRouter.get(Paths.Stats.GetPourcentageVulkins, EtudiantRoutes.getPourcentageVulkins);


// **** Ajouter les routeurs **** //
// Ajouter le routeur Etudiant
apiRouter.use(Paths.Etudiants.Base, etudiantRouter);
// Ajouter le routeur Stats
apiRouter.use(Paths.Stats.Base, statsRouter);


// **** Exporter **** //

export default apiRouter;
