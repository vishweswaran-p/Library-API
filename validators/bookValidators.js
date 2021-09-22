export const bookIdentifier = {
    'book_identifier': {
        notEmpty:true,
        optional:false,
        errorMessage:'Book identifier must not be empty.'
    },
};

export const createBook = {
    'book_name': {
        notEmpty:true,
        optional:false,
        errorMessage:'Book name must not be empty.'
    },
    'published_date': {
        notEmpty:true,
        optional:false,
        errorMessage:'Published date must not be empty.'
    },
    'author_name': {
        notEmpty:true,
        optional:false,
        errorMessage:'Author name must not be empty.'
    }
};

export const updateBook = {
    'book_name': {
        notEmpty:true,
        optional:true,
        errorMessage:'Book name must not be empty.'
    },
    'published_date': {
        notEmpty:true,
        optional:true,
        errorMessage:'Published date must not be empty.'
    },
    'author_name': {
        notEmpty:true,
        optional:true,
        errorMessage:'Author name must not be empty.'
    }
};

export const aggregationKey = {
    'key':{
        notEmpty:true,
        optional:false,
        matches: {
            options: [/\b(?:AUTHOR_NAME|PUBLISHED_DATE)\b/],
            errorMessage: 'Aggregation key field is invalid'
        },
        errorMessage:'Aggregation key must not be empty'
    },
};
