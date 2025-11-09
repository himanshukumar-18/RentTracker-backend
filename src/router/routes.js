import { Router } from "express";
import { rentDetailsRegister, findHistory } from "../controller/user.controller.js"
import { Upload } from "../middleware/multer.middleware.js"

const router = Router();

router.post(
    "/rentDetailsRegister-form",
    Upload.fields([{
        name:"uploadProof",
        maxCount: 1
    }]),
    rentDetailsRegister
);

router.get("/getHistory", findHistory);

export default router