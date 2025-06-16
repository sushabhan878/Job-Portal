import multer from "multer";

const storage = multer.diskStorage({});
const uplode = multer({ storage });

export default uplode;
