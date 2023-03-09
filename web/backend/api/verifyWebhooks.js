import crypto from 'node:crypto';

export async function verifyWebhooks(req, res) {

    try {
        let hmac_header = req.headers["x-shopify-hmac-sha256"];
        const secretKey = process.env.SHOPIFY_API_SECRET;
        const hmac_calculated = crypto.createHmac("sha256", secretKey).update(req.body).digest("base64");
        console.log(hmac_calculated,  hmac_header)
    
        if(hmac_header == hmac_calculated) {
             //DB code here
             console.log("Verified")
             res.status(200).send("Success")
        } else {
            res.send(401).send("Unauthorized!!!!!")
        }
    } catch(err) {
         res.status(401).send("Unauthorized Access")
    }
}