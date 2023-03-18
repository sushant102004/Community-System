export class CustomError extends Error {
    statusCode: string
    status: boolean

    constructor(message: string, statusCode: string) {
        super(message)
        this.statusCode = statusCode
        this.status = statusCode.startsWith('2') ? true : false
    }
}