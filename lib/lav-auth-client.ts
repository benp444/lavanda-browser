let cachedToken: { token: string; expiresAt: number } | null = null

export async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    console.log("*******returning cached token")
    return cachedToken.token
  }

  const tokenUrl = 'https://platapi.lavanda.app/v1/oauth2/token';


  const params = new URLSearchParams();
  params.append('client_id', '5858nonqrakj1g4nd8c32uat18');
  params.append('client_secret', '108adi3t24j5aenpdjcj9rk7ag28tvp1f3kjremehiiu0j1hm6ns');
  params.append('grant_type', 'client_credentials');


  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: params.toString()
  };

  const response = await fetch(tokenUrl, requestOptions);

  const data = await response.json()

  console.log("got data from Lavanda Oauth API: " + data)
  console.log("DATA TYPE:", typeof data)
  console.log("IS ARRAY:", Array.isArray(data))
  console.log("DATA:", data)
  console.log("keys:", Object.keys(data))

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - 60_000,
  }

  return cachedToken.token
}

