// import handler from './changePassword'
// import { User } from '../../models/user'
// import dbConnect from '../../config/dbConnect'
// import bcrypt from 'bcryptjs'

// jest.mock('../../config/dbConnect')
// jest.mock('../../models/user')

// describe('Change Password Handler', () => {
// 	beforeEach(() => {
// 		jest.clearAllMocks()
// 	})

// 	it("should update the user's password", async () => {
// 		const req = {
// 			method: 'PUT',
// 			body: {
// 				email: 'user@example.com',
// 				password: 'newpassword',
// 				oldPassword: 'oldpassword',
// 			},
// 		}

// 		const res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}

// 		const mockUser = {
// 			email: 'user@example.com',
// 			password: await bcrypt.hash('oldpassword', 10),
// 		}

// 		User.findOne.mockResolvedValue(mockUser)
// 		bcrypt.compare.mockResolvedValue(true)
// 		bcrypt.hash.mockResolvedValue(await bcrypt.hash('newpassword', 10))
// 		User.updateOne.mockResolvedValue({})

// 		await handler(req, res)

// 		expect(dbConnect).toHaveBeenCalledTimes(1)
// 		expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' })
// 		expect(bcrypt.compare).toHaveBeenCalledWith(
// 			'oldpassword',
// 			mockUser.password
// 		)
// 		expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10)
// 		expect(User.updateOne).toHaveBeenCalledWith(
// 			{ email: 'user@example.com' },
// 			{ $set: { password: expect.any(String) } }
// 		)
// 		expect(res.status).toHaveBeenCalledWith(200)
// 	})

// 	it('should return an error for wrong current password', async () => {
// 		const req = {
// 			method: 'PUT',
// 			body: {
// 				email: 'user@example.com',
// 				password: 'newpassword',
// 				oldPassword: 'wrongpassword',
// 			},
// 		}

// 		const res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}

// 		const mockUser = {
// 			email: 'user@example.com',
// 			password: await bcrypt.hash('oldpassword', 10),
// 		}

// 		User.findOne.mockResolvedValue(mockUser)
// 		bcrypt.compare.mockResolvedValue(false)

// 		await handler(req, res)

// 		expect(dbConnect).toHaveBeenCalledTimes(1)
// 		expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' })
// 		expect(bcrypt.compare).toHaveBeenCalledWith(
// 			'wrongpassword',
// 			mockUser.password
// 		)
// 		expect(User.updateOne).not.toHaveBeenCalled()
// 		expect(res.status).toHaveBeenCalledWith(400)
// 	})

// 	it('should return an error for same old and new password', async () => {
// 		const req = {
// 			method: 'PUT',
// 			body: {
// 				email: 'user@example.com',
// 				password: 'oldpassword',
// 				oldPassword: 'oldpassword',
// 			},
// 		}

// 		const res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}

// 		const mockUser = {
// 			email: 'user@example.com',
// 			password: await bcrypt.hash('oldpassword', 10),
// 		}

// 		User.findOne.mockResolvedValue(mockUser)
// 		bcrypt.compare.mockResolvedValue(true)

// 		await handler(req, res)

// 		expect(dbConnect).toHaveBeenCalledTimes(1)
// 		expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' })
// 		expect(bcrypt.compare).toHaveBeenCalledWith(
// 			'oldpassword',
// 			mockUser.password
// 		)
// 		expect(User.updateOne).not.toHaveBeenCalled()
// 		expect(res.status).toHaveBeenCalledWith(400)
// 	})
// })
