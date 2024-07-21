const prod = {
    url: {
        API_URL: 'https://builder-server-new-ivory.vercel.app'
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8080/api'
    }
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod;