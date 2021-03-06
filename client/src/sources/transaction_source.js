import * as driver from 'js-bigchaindb-driver';

import { BDB_API_PATH } from '../constants/application_constants';

import TransactionActions from '../actions/transaction_actions';


const TransactionSource = {
    lookupTransactionList: {
        remote(state) {
            const {asset_id, operation} = state.transactionMeta;
            // fetch transactions for account
            return driver.Connection.listTransactions({asset_id, operation}, BDB_API_PATH);
        },

        success: TransactionActions.successFetchTransactionList,
        error: TransactionActions.errorTransaction
    },

    postTransaction: {
        remote(state) {
            const { transaction } = state.transactionMeta;
            return driver.Connection.postTransaction(transaction, BDB_API_PATH)
        },

        success: TransactionActions.successPostTransaction,
        error: TransactionActions.errorTransaction
    },

    lookupTransaction: {
            remote(state) {
            const { tx_id } = state.transactionMeta;
            return driver.Connection.getTransaction(tx_id, BDB_API_PATH)
        },

        success: TransactionActions.successFetchTransaction,
        error: TransactionActions.errorTransaction
    },


    lookupStatus: {
        remote(state) {
                const { tx_id } = state.transactionMeta;
            return driver.Connection.getStatus(tx_id, BDB_API_PATH)
        },

        success: TransactionActions.successFetchStatus,
        error: TransactionActions.errorTransaction
    },

    lookupOutputList: {
        remote(state) {
            const { public_key, unspent } = state.transactionMeta;
            return driver.Connection.listOutputs({public_key, unspent}, BDB_API_PATH, false)
        },

            success: TransactionActions.successFetchOutputList,
            error: TransactionActions.errorTransaction
        }

};

export default TransactionSource;
