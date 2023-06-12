// import Usuario from '../../../models/usuario'
// import dbConnect from '../../config/dbConnect'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from './auth/[...nextauth]'
// import handler from './getCar'

// jest.mock('../../models/usuario', () => ({
// 	__esModule: true,
// 	default: {
// 		find: jest.fn().mockResolvedValue([{ name: 'User 1' }, { name: 'User 2' }]),
// 	},
// }))

// jest.mock('../../config/dbConnect', () => ({
// 	__esModule: true,
// 	default: jest.fn(),
// }))

// jest.mock('next-auth/next', () => ({
// 	__esModule: true,
// 	getServerSession: jest.fn().mockResolvedValue(null),
// }))

// describe('getCar handler', () => {
// 	let req
// 	let res

// 	beforeEach(() => {
// 		req = { method: 'GET' }
// 		res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		}
// 	})

// 	afterEach(() => {
// 		jest.clearAllMocks()
// 	})

// 	it('Should return 200 with users excluding password and __v fields', async () => {
// 		const users = [{ name: 'User 1' }, { name: 'User 2' }]

// 		getServerSession.mockResolvedValueOnce({ role: 'user' })
// 		Usuario.find.mockResolvedValueOnce(users)

// 		await handler(req, res)

// 		expect(getServerSession).toHaveBeenCalledWith(req, res, authOptions)
// 		expect(dbConnect).toHaveBeenCalled()
// 		expect(Usuario.find).toHaveBeenCalled()
// 		expect(res.status).toHaveBeenCalledWith(200)
// 		expect(res.json).toHaveBeenCalledWith({ users })
// 	})

// 	it('Should return 401 Unauthorized if session or role is missing', async () => {
// 		getServerSession.mockResolvedValueOnce(null)

// 		await handler(req, res)

// 		expect(getServerSession).toHaveBeenCalledWith(req, res, authOptions)
// 		expect(dbConnect).not.toHaveBeenCalled()
// 		expect(Usuario.find).not.toHaveBeenCalled()
// 		expect(res.status).toHaveBeenCalledWith(401)
// 	})

// 	it("Should return 401 Unauthorized if role is not 'user'", async () => {
// 		getServerSession.mockResolvedValueOnce({ role: 'admin' })

// 		await handler(req, res)

// 		expect(getServerSession).toHaveBeenCalledWith(req, res, authOptions)
// 		expect(dbConnect).not.toHaveBeenCalled()
// 		expect(Usuario.find).not.toHaveBeenCalled()
// 		expect(res.status).toHaveBeenCalledWith(401)
// 	})

// 	it('should return 401 Unauthorized if the request method is not GET', async () => {
// 		req.method = 'POST'

// 		await handler(req, res)

// 		expect(getServerSession).not.toHaveBeenCalled()
// 		expect(dbConnect).not.toHaveBeenCalled()
// 		expect(Usuario.find).not.toHaveBeenCalled()
// 		expect(res.status).toHaveBeenCalledWith(401)
// 	})
// })
