const { Router } = require('express')

const NotesController = require('../controllers/noteController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)  // Adicionando middleware de autenticação à rota de notas.  
// Atenção: Esse middleware deve ser adicionado antes das rotas que necessitam de autenticação. 
 // Por exemplo, no caso do método DELETE, que exige autenticação. 
  // Isso evita que usuários sem autenticação tentem acessar essas rotas.  
  // Adicionar esse middleware antes das

notesRoutes.get('/', notesController.index)
notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)


module.exports = notesRoutes