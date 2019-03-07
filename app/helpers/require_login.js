export function require_login(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    req.flash('error', "Must login first");
    res.redirect(301, "/");
  }
}