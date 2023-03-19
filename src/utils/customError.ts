export class CustomError extends Error {
    statusCode: number
    status: boolean

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        this.status = false
    }
}