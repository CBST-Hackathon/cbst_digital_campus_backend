import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        firstName: 'Test',
        lastName: 'Admin',
        email: 'admin@test.com',
        password: '12345678',
        role: 'admin',
        phone: '+88012323322234',
        gender: 'male',
        active: true,
        address: 'House #23, Road #34, Gulshan',
      },
      {
        firstName: 'Test',
        lastName: 'Faculty',
        email: 'faculty@test.com',
        password: '12345678',
        role: 'faculty',
        phone: '+880123233223443',
        gender: 'male',
        active: true,
        address: 'House #24, Road #34, Gulshan',
      },
      {
        firstName: 'Test',
        lastName: 'Student',
        email: 'student@test.com',
        password: '12345678',
        role: 'student',
        phone: '+88012323324434',
        gender: 'male',
        active: true,
        address: 'House #23, Road #34, Gulshan',
      },
    ])
  }
}
