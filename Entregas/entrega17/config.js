config = {
    firebase:{
        cert:{
            "type": "service_account",
            "project_id": "ecommerce-c8dd3",
            "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID,
            "private_key": process.env.GOOGLE_PRIVATE_KEY,
            "client_email": "firebase-adminsdk-bejyz@ecommerce-c8dd3.iam.gserviceaccount.com",
            "client_id": process.env.GOOGLE_CLIENT_ID,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bejyz%40ecommerce-c8dd3.iam.gserviceaccount.com"
          }
    },
    mongoDB:{
        conn:process.env.MONGO_URL,
        options:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    }
}

module.exports = config