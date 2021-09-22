export default function queryParamsValidationSchema(sort_fields) {

    let sortFieldRegex = new RegExp('\\b(?:' + sort_fields.join('|') + ')\\b','g');

    return {
        'offset':{
            notEmpty:false,
            optional:true,
            isNumeric:true,
            errorMessage:'Page offset must be numeric and not empty'
        },
        'limit':{
            notEmpty:false,
            optional:true,
            isNumeric:true,
            errorMessage:'Page limit must be numeric and not empty'
        },
        'sortOrder':{
            notEmpty:false,
            optional:true,
            matches: {
                options: [/\b(?:ASC|DESC)\b/],
                errorMessage: "Sort order field is invalid"
            },
            errorMessage:'Sort order must not be empty'
        },
        'sortBy':{
            notEmpty:false,
            optional:true,
            matches: {
                options: sortFieldRegex,
                errorMessage: "Sort by field is invalid"
            },
            errorMessage:'Sort by field cannot be empty'
        },
        'searchText':{
            notEmpty:false,
            optional:true,
            errorMessage:'Search text must not be empty'
        }
    }
}
