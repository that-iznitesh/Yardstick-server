
import express from 'express';
import Tenant from '../models/Tenant.js';

import {authMiddleware} from '../middleware/auth.js';
const router = express.Router();
router.post('/:slug/upgrade', authMiddleware, async (req,res)=>{
  if(req.user.role !== 'Admin') return res.status(403).json({ error: 'Forbidden' });
  if(req.user.tenant !== req.params.slug) return res.status(403).json({ error: 'Forbidden' });
  const t = await Tenant.findOneAndUpdate({ slug: req.params.slug }, { plan: 'pro' }, { new: true });
  res.json({ ok: true, plan: t.plan });
});
export default router;
