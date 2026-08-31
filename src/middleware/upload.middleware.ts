import multer from 'multer';

const storage = multer.memoryStorage(); // stochez imaginea in memoria serverului temporar, nu pe hard

export const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // limita de 10MB
