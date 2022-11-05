export default async function getAccessToken () {
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    return await fetch("https://accounts.spotify.com/api/token", {
        headers:
            {
                Authorization: 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded"
            },
        body: urlencoded,
        method: "POST"
    }).then(res => res.json()) as { access_token: string, token_type: string, expires_in: number }
}
