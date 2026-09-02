import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // fereastra de timp 15 min
  max: 5, //  fiecare IP are limita 5 cereri pe fereastra (per 15 min)
  message: {
    error: 'Prea multe incercari de autentificare de la acest IP. Incearca din nou dupa 15 minute.'
  },
  standardHeaders: true, // ret informatiile despre limita in headerele `RateLimit-*`
  legacyHeaders: false, // dezactiveaza headerele vechi `X-RateLimit-*`
});