// import User from '../../models/user'
// import dbConnect from '../../config/dbConnect'
// import { getServerSession } from 'next-auth/next'
// import handler from './getUser'

// jest.mock('../../models/user', () => ({
// 	find: jest.fn().mockReturnThis(),
// 	select: jest.fn().mockReturnThis(),
// }))

// jest.mock('../../config/dbConnect', () => jest.fn())

// jest.mock('next-auth/next', () => ({
// 	getServerSession: jest.fn().mockResolvedValue(null),
// }))

// describe('getUser handler', () => {
// 	let req
// 	let res

// 	beforeEach(() => {
// 		req = {}
// 		res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}
// 	})

// 	afterEach(() => {
// 		jest.clearAllMocks()
// 	})

// 	it('Should return 401 Unauthorized if session or role is missing', async () => {
// 		await handler(req, res)

// 		expect(getServerSession).toHaveBeenCalledWith(req, res, expect.any(Object))
// 		expect(res.status).toHaveBeenCalledWith(401)
// 	})

// 	it('Should return list of users if session and role are valid', async () => {
// 		const session = { role: 'user' }
// 		getServerSession.mockResolvedValueOnce(session)

// 		const users = [{ name: 'John' }, { name: 'Jane' }]
// 		User.find.mockResolvedValueOnce(users)

// 		await handler(req, res)

// 		expect(getServerSession).toHaveBeenCalledWith(req, res, expect.any(Object))
// 		expect(User.find).toHaveBeenCalled()
// 		expect(res.status).toHaveBeenCalledWith(200)
// 		expect(res.json).toHaveBeenCalledWith({ users })
// 	})
// })
