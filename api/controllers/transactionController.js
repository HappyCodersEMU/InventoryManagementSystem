const TransactionService = require("../services/transactionSvc");

module.exports = class Transaction {


    // TODO: protect the route.
    static async searchTransactions(req, res, next) {
        const defaultLimit = 100
        let limit = 0

        try {

            if (req.query.limit != null) {
                limit = parseInt(req.query.limit);
            } else {
                limit = defaultLimit
            }

            const searchQuery = TransactionService.toSearch(req.query)

            const data = await TransactionService.search(searchQuery, limit)
            res.status(200).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }
}
