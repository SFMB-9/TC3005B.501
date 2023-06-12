// import handler from './register'

// describe('Register Handler', () => {
// 	it('Should create a new user', async () => {
// 		const req = {
// 			method: 'POST',
// 			body: {
// 				name: 'John',
// 				surname: 'Doe',
// 				email: 'john@example.com',
// 				password: 'password',
// 				encrypted_role: 'user',
// 			},
// 		}

// 		const res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}

// 		await handler(req, res)

// 		expect(res.status).toHaveBeenCalledWith(200)
// 	})

// 	it('Should create a new seller', async () => {
// 		const req = {
// 			method: 'POST',
// 			body: {
// 				name: 'Jane',
// 				surname: 'Doe',
// 				email: 'jane@example.com',
// 				password: 'password',
// 				encrypted_role: 'seller',
// 				agency: 'Agency Name',
// 				phone: '1234567890',
// 			},
// 		}

// 		const res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}

// 		await handler(req, res)

// 		expect(res.status).toHaveBeenCalledWith(200)
// 		expect(res.json).toHaveBeenCalledWith({
// 			message: 'Seller registered successfully',
// 		})
// 	})

// 	it('Should return an error for invalid email', async () => {
// 		const req = {
// 			method: 'POST',
// 			body: {
// 				name: 'John',
// 				surname: 'Doe',
// 				email: 'invalidemail',
// 				password: 'password',
// 				encrypted_role: 'user',
// 			},
// 		}

// 		const res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}

// 		await handler(req, res)

// 		expect(res.status).toHaveBeenCalledWith(400)
// 	})
// })
