function formatResponse(err, data, message) {
    return {
        error: { code: err ? err.code : 0 },
        message: err ? err.message : message,
        result: data,
        links: [
           {
                href: 'localhost:8080',
                rel: 'get full score',
                method: 'GET',
           },
           {
               href: 'localhost:8080',
               rel: 'save single score result',
               method: 'POST',
               body: 'username=Nikita&email=randomemail@box.com&score=10',
           }
        ],
    }
}

module.exports = {
    formatResponse,
}