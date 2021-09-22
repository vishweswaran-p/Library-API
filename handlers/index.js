/** 
  * @file Handlers
  * @description This file has all the route handlers of this application
  * @author vishnu
  */

/** dependencies */
import express from 'express';
import bookRouter from 'routes/book';

let router = express.Router({caseSensitive: true});

/**
 * Book handlers
 */
router.get('/book', bookRouter.getAllBooks);
router.get('/book/count/:key/:value', bookRouter.getAggregatedCount);
router.post('/book', bookRouter.createBook);
router.put('/book/:book_identifier', bookRouter.updateBook);
router.delete('/book/:book_identifier', bookRouter.deleteBook);

export default router;

