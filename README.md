# OData Service
OData Service Test APIs

### Pre-Requirement
1. NodeJS (=>12.18)

### Setup and Running Instructions
1. Clone the repository using -  git clone https://github.com/mowaiskalam/odata_service.git
2. Move to odata_service
3. Install Packages with command 
``` npm install ```
4. Run Server
``` npm start ```
5. Open link on browser (Default port = 8080)
``` http://localhost:8080 ```

### Implementation & Pages
* Homepage
    * People List will be shown on Homepage from `OData API`
    * On Search, it will search by `FirstName` and `LastName` from `OData API` and filter the records
    * On Clicking on `Username`, page will redirect to `View Specific Person` detail page
    * On Edit, that user will be open in edit mode
* User Detail Page
    * On given `Username`, it fetch details from OData API and show details
* User Edit Page
    * On give `Username`, it call OData Modify API to update the record

### Code Structure
* server.js
    -> main file of express server
* routes.js
    -> api routes
* service
    -> service file for communicating with OData service
* views
    -> EJS (https://ejs.co/) views