import { router as indexController } from '../app/controllers/index.controller'

export function configuretRoutes(app){
  app.all("*", function(req, res, next){
    app.locals.loggedIn = req.session && req.session.userId ? true : false;
    next();
  });
  app.use('/', indexController);
}