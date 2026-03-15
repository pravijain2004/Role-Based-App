import express from "express";
import { protect,authorize} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/dashboard',protect,(req,res) => {
  res.json({ message:`Welcome ${req.user.name}!`,user:req.user
   });
});

router.get('/admin-panel',protect,authorize('admin'),(req,res) => {
  res.json({ message:'Admin access granted',user:req.user});
});

router.get('/manager',protect,authorize('manager','admin'),(req,res) => {
  res.json({ message:'Manager access granted',user:req.user});
})

export default router;