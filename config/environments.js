
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "paglaediot", // generated ethereal user
          pass: "ifucku@143", // generated ethereal password
        }
    },
    google_client_id: "232712110661-u9esenc14lu6f0mv9ii6tcehla79fr42.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
}

const production = {
    name: 'production'
}


module.exports = development;