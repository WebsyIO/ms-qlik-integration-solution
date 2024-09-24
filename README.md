# Masters Summit for Qlik
## API Examples

### Setup
If you want to follow along with the session and try the examples, simply clone this repository and follow these steps:
1. Run an `npm install` to install the required dependencies
2. Rename the `cert.txt` file to `cert.pem`
3. Rename the `key.txt` file to `key.key`
4. Run `node index` to start the project
5. Open a browser and navigate to `https://localhost:4000`

**NOTE:** You'll be presented with a warning that the certificates are not from a trusted authority. Click on the "Advanced" options and then "Proceed anyway" to continue to the application.

### Updating the code
Each of the examples is self contained in a designated folder. For the example to work, you will need to fill in certain parameters with those from your Qlik environment. The following is a list of parameters that you might see
- your integration id (A Qlik Web Integration Id)
- yourdomain (The hostname of your Qlik Cloud instance)
- appId (The Qlik Applicatio Id that you want to work with)
- sheetId (The Qlik Sheet Id that you want to work with)
- objectId (The Qlik Object Id that you want to work with)
- clientId (An OAuth Client Id)

**NOTE:** Any parameters that you modify in the `index.js` file in the root of the project, will require a restart of the application. Any other changes will simply require a browser refresh.