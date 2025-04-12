import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Initialize
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

// ======================
// API Endpoints
// ======================

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Auth Endpoints
app.post('/api/auth', async (req: Request, res: Response) => {
  try {
    const { email, password, action, role } = req.body;
    
    if (action === 'signup') {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, role: role || 'ATTENDEE' },
        select: { id: true, email: true, role: true }
      });
      return res.status(201).json({ user });
    }

    if (action === 'login') {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ error: "User not found" });
      
      const valid = await bcrypt.compare(password, user.password);
      return valid 
        ? res.json({ user: { id: user.id, email: user.email, role: user.role } })
        : res.status(401).json({ error: "Invalid password" });
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Events Endpoints
app.get('/api/events', async (req: Request, res: Response) => {
  const events = await prisma.event.findMany({
    include: { organizer: { select: { email: true } } }
  });
  res.json(events);
});

app.post('/api/events', async (req: Request, res: Response) => {
  const { title, description, date, location, organizerId } = req.body;
  const event = await prisma.event.create({
    data: { 
      id: uuidv4(),
      title,
      description,
      date: new Date(date),
      location,
      organizerId
    }
  });
  res.status(201).json(event);
});

// E-Pass Endpoints
app.post('/api/epass', async (req: Request, res: Response) => {
  const { eventId, userId } = req.body;
  const epass = await prisma.ePass.create({
    data: {
      id: uuidv4(),
      eventId,
      userId,
      qrCode: `EPASS-${uuidv4()}`
    },
    include: { event: true, user: true }
  });
  res.status(201).json(epass);
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));