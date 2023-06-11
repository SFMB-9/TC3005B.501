import fs from 'fs'
import { MongoClient, ObjectId } from 'mongodb'
import handler, { config } from './handler'

jest.mock('fs', () => ({
	unlink: jest.fn((path, callback) => callback()),
}))

jest.mock('mongodb', () => ({
	MongoClient: {
		connect: jest.fn().mockReturnValue({
			db: jest.fn().mockReturnValue({
				collection: jest.fn().mockReturnThis(),
				findOne: jest.fn().mockResolvedValue({ _id: '123' }),
				deleteOne: jest.fn().mockResolvedValue(),
			}),
		}),
	},
	ObjectId: jest.fn(),
}))

jest.mock('next-auth/client', () => ({
	getSession: jest.fn().mockResolvedValue({}),
}))

describe('DELETE / endpoint', () => {
	let req
	let res

	beforeEach(() => {
		req = {
			method: 'DELETE',
			query: { id: '123' },
		}
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		}
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('Should delete the file and the document', async () => {
		await handler(req, res)

		expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		expect(ObjectId).toHaveBeenCalledWith('123')

		expect(fs.unlink).toHaveBeenCalledWith(
			'public/uploads/123.pdf',
			expect.any(Function)
		)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({
			message: 'File deleted successfully',
		})
	})

	it('Should return 404 if document is not found', async () => {
		MongoClient.connect.mockReturnValueOnce({
			db: jest.fn().mockReturnValue({
				collection: jest.fn().mockReturnThis(),
				findOne: jest.fn().mockResolvedValue(null),
			}),
		})

		await handler(req, res)

		expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		expect(ObjectId).toHaveBeenCalledWith('123')

		expect(fs.unlink).not.toHaveBeenCalled()

		expect(res.status).toHaveBeenCalledWith(404)
		expect(res.json).toHaveBeenCalledWith({ message: 'Document not found' })
	})

	it('Should return 500 if error occurs during file deletion', async () => {
		fs.unlink.mockImplementationOnce((path, callback) =>
			callback(new Error('Failed to delete file'))
		)

		await handler(req, res)

		expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		expect(ObjectId).toHaveBeenCalledWith('123')

		expect(fs.unlink).toHaveBeenCalledWith(
			'public/uploads/123.pdf',
			expect.any(Function)
		)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting file' })
	})

	it('Should return 500 if error occurs during document deletion', async () => {
		MongoClient.connect.mockReturnValueOnce({
			db: jest.fn().mockReturnValue({
				collection: jest.fn().mockReturnThis(),
				findOne: jest.fn().mockResolvedValue({ _id: '123' }),
				deleteOne: jest.fn(),
			}),
		})

		await handler(req, res)

		expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		expect(ObjectId).toHaveBeenCalledWith('123')

		expect(fs.unlink).toHaveBeenCalledWith(
			'public/uploads/123.pdf',
			expect.any(Function)
		)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.json).toHaveBeenCalledWith({
			message: 'Error deleting document',
		})
	})
})

describe('config', () => {
	it('should have bodyParser set to false', () => {
		expect(config.api.bodyParser).toBe(false)
	})
})
