### Unofficial API for [Backloggd](https://www.backloggd.com) written in Typescript.


## Deploy Locally
To use this API, you will need Node.js and npm installed on your machine. You can install the necessary dependencies by running:

```bash
git clone https://github.com/Qewertyy/Backloggd-API && cd Backloggd-API && npm i && npm start
```

## Deploy to vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FQewertyy%2FBackloggd-API&demo-title=Backloggd%20API&demo-description=Unoffical%20Backloggd%20API&demo-url=https%3A%2F%2Fbackloggd-api.vercel.app%2F)

## Usage

### Endpoint
#### for now only this endpoint has been added

- **GET /user/:username**
  - Retrieves information for the specified user.

- **POST /user/:username**
  - Retrieves information for the specified user.

#### Request Parameters
- **username**: The username of the user to retrieve information for.


### Response
The API returns a JSON response with the following structure:

```json
{
  "message": "success",
  "code": 2,
  "content": {
    // User information object
  }
}
```

In case of an error, the response will include an appropriate error message along with the HTTP status code.

### Error Handling

If the username is not provided or if there's an error retrieving the user information, the API will respond with an error message and an appropriate HTTP status code.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer
This API is unofficial and is not affiliated with the official web service.