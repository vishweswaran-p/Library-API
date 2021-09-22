import commonConstant from 'constant/commonconstant';

const defaultQueryParams = {

    "getAllBooks": {
        'offset':commonConstant.DEFAULT_PAGINATION_OFFSET,
        'limit':commonConstant.DEFAULT_PAGINATION_LIMIT,
        'sortFields':['book_name', 'published_date', 'author_name', 'created_at', 'updated_at'],
        'sortBy':'created_at',
        'sortOrder':'ASC'
    }
};

export default defaultQueryParams;
