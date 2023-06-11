import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'
import connectToDatabase from '@/utils/mongodb'
import handler from './uploadDocument'

jest.mock('@/utils/mongodb', () => ({
	__esModule: true,
	default: jest.fn().mockResolvedValue({ db: { collection: jest.fn() } }),
}))

jest.mock('next-auth/client', () => ({
	__esModule: true,
	getSession: jest.fn().mockResolvedValue(null),
}))

describe('uploadDocument handler', () => {
	let req
	let res

	beforeEach(() => {
		req = { method: 'GET', body: null }
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		}
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it("Should return 200 with the user's documents", async () => {
		const userId = 'mockUserId'
		const documents = [{ name: 'Document 1' }, { name: 'Document 2' }]

		getSession.mockResolvedValueOnce({ user: { user_id: userId } })
		const docCollectionMock = {
			find: jest.fn().mockReturnValueOnce(documents),
		}
		connectToDatabase.mockResolvedValueOnce({
			db: { collection: jest.fn().mockReturnValueOnce(docCollectionMock) },
		})

		await handler(req, res)

		expect(getSession).toHaveBeenCalledWith({ req })
		expect(connectToDatabase).toHaveBeenCalled()
		expect(docCollectionMock.find).toHaveBeenCalledWith({
			usuario_propietario_id: ObjectId(userId),
		})
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({
			message: 'Documentos del usuario recuperados exitosamente',
			result: { documentos: documents },
		})
	})

	it('Should return 400 with an error message if an error occurs', async () => {
		const errorMessage = 'Error retrieving user documents'
		const error = new Error(errorMessage)

		getSession.mockResolvedValueOnce({ user: { user_id: 'mockUserId' } })
		connectToDatabase.mockRejectedValueOnce(error)

		await handler(req, res)

		expect(getSession).toHaveBeenCalledWith({ req })
		expect(connectToDatabase).toHaveBeenCalled()
		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.json).toHaveBeenCalledWith({
			message: 'Error al recuperar documentos del usuario',
			error: error,
		})
	})

	it('Should return 401 Unauthorized if the request method is not GET or the body is not null', async () => {
		req.method = 'POST'
		req.body = {}

		await handler(req, res)

		expect(getSession).not.toHaveBeenCalled()
		expect(connectToDatabase).not.toHaveBeenCalled()
		expect(res.status).toHaveBeenCalledWith(401)
	})
})
