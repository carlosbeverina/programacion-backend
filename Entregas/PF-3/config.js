config = {
    mongoDB:{
        conn:'mongodb://admin:admin@ac-qrwvjvu-shard-00-00.dzmmmmd.mongodb.net:27017,ac-qrwvjvu-shard-00-01.dzmmmmd.mongodb.net:27017,ac-qrwvjvu-shard-00-02.dzmmmmd.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-qm59pc-shard-0&authSource=admin&retryWrites=true&w=majority',
        options:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    firebase:{
        cert:{
            "type": "service_account",
            "project_id": "ecommerce-c8dd3",
            "private_key_id": "d2b3b5900610c230c0434b8561b9314f98d1fd3a",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC6vGB68yZHm24q\nZFTWaGwNFjrcZEEECZH/Pbe6umD8ghI9jkNo1tKZacR+tb2qnFfTiTCB5penMtWI\nS3whNQaaKgru5EbHzDAS9i/putPbS9aFl44bzwTF270rsPKjvh5mRyH0nP1hFVTx\n6dkb54Bh7oaHb9PlmYMo8JZsX6zJHbmGO65OY62T1H5clw4R5u/GTNuWmertPOWs\nTRW5GTVq9T/BZzGGmyfaBZrBUxHL3+9zYHfMuJJcy+9dnl8yLIa/3i97U2Zt+rYI\n1fh9C9KchYRHrdEdGnCgHrZOIsE05iQ4THyJ1KDYystMvN019JNDfCFC5v2zsJXk\nZsXUJGK1AgMBAAECggEAHuHhmOPWjFglv4gJSc5KNF3dTS6dXAQTK6Gy3YROXuRK\nDPkWp+ODP9DwqL34yJsDoV3acllG8mVjUB+fv0QsO9nBJiIFnKxltPUXFnIJ8IYZ\ny801ON8jXG+LWQryDed20pZoBLLj6qbi/gEdIVLHdirC/+ocIqghO2eSkQi/pCDn\n+TBUFw/2XaA4JXqysDDMuJrH8U14ckfR/wIvxS2NvvrNLsejgTtgY0YL2fn6hRih\nQaN1ky98V2pCbLez7AyKQVLFHRpHzPX0BKeNoX6nZvP9BYmURspSIVba1I05Vupt\nybij4Q6SFileCQwcT8yqVRY2FPV6C+96jdMJWj1MgQKBgQD3mowPPgKt+GkSwfhA\nlcDkmOCRgndLzXyvqw+uds0ssjByOQy6vPobInyOib8AUuVwKMX6/ZzGXEcZTBrl\nqAQcI+JJ/CgdsDYhQ/Jk/pAo/tT4UHaWcEy0EdzZYR6ZriqLwkjFmx+xgy40FVRJ\nAdKTWCuRlkreGM6DgJx2QWmVdQKBgQDBEW9GdT6oS6ePm3Nfz3d5V0/oz8JCipxo\nuE9xK6lwbyhO2PWK/0WUj5uuOQXwHryVCeSKnHeIzo+ubHIWZxV0YROKhHZcbCUL\nLtUjTOAYWn6msMetvZI6pQbeiMAJz0YVbaGbzQDAB+eT9X6tpNuBEI/GXHetrav7\nwVJFt6GwQQKBgBPMD5bIZn5ydjRBvg+r6ZhdgNchj1hIPcft7XsNlKoWNTlsxk/H\n/FdfEoZzDQqBlka5e9rtnDNf/W9QXnYuUOXPGLDBsJNvG2TdgewBTpV4ip6wEEtG\n/1sGcpoO4dt3yX8TMa5bENWon3Eao3qS4rtVOWaSlbncUebBycDKyh5hAoGAMzoa\nCVrgli0Et7DqaviUXcjR9hbyF0/J8ms9AO0x1xhXXJxqgkf7QVDdYNvWfIDbTrxC\nPJkJim4sZ350wwb1BV0gnzdIZHt5VL9HZEdoim2wfzAWuz26h/7zlKY6NiAeG19s\navd5BHrUckjIJPDCITuwulQcmSOkp3cDCmaP60ECgYAWQTO1c7bZ7LOa2B40KGtM\nU8IYUJhs4kRLm+m9LIDQ8ZCxnyMESg8EYR/9Fw9WNmy9UODq82wOPgiM+UgIBa5u\nfF7twHFsux+C0Szf4htPKCSI/BNGYTs753AmyWhuNpaBKvyO7Wyirssid9tT4568\ntigCtJQvaqIMBp0Pokg53Q==\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-bejyz@ecommerce-c8dd3.iam.gserviceaccount.com",
            "client_id": "110344754601114661419",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bejyz%40ecommerce-c8dd3.iam.gserviceaccount.com"
          }
    }
}

module.exports = config