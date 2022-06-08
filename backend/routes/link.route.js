import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requiredAuth } from "../middlewares/requireAuth.js";
import { bodyLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

//GET           /api/v1/links         all links
//GET           /api/v1/links/:id     single link
//POST          /api/v1/links         create link
//PATCH/PUT     /api/v1/links:id      update link
//DELETE        /api/v1/links:id      update link

router.get('/:id', requiredAuth, getLink);
router.get('/', requiredAuth, getLinks);
router.post('/', requiredAuth, createLink);
router.delete('/:id', requiredAuth, removeLink);

export default router;