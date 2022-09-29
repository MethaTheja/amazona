import bcrypt from 'bcryptjs';
const users = [
  {
    name: 'Basir',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 8),
    isAdmin: true,
  },
  {
    name: 'User',
    email: 'user@example.com',
    password: bcrypt.hashSync('tassword', 8),
    isAdmin: false,
  },
];
