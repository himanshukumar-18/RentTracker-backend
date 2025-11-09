class ApiResponse {
    constructor(
        status,
        message,
        data = null
    ) {
        this.status = status,
            this.message = message,
            this.data = data
        this.success = true
    }
}

export default ApiResponse 