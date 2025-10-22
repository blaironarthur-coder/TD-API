// Importation du module Router d'Express pour gérer les routes
import { Router } from 'express';

// Importation des contrôleurs qui gèrent la logique métier pour les utilisateurs
import { addUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';



const router = Router();

/**
* Route GET /users
* Description : Récupère la liste des utilisateurs
* Contrôleur associé : getUsers (défini dans user.controller.ts)
*/

router.get('/', getUsers);

/**
* Route POST /users
* Description : Ajoute un nouvel utilisateur
* Contrôleur associé : addUser (défini dans user.controller.ts)
*/

router.post('/', addUser);
// Exportation du routeur pour l'utiliser dans index.ts


router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
