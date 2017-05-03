# clickcast-api
High-level Clickcast RESTful API

## Overview <a name="overview"></a>
This guide provides an overview on how to use the Clickcast API.

## Authorization <a name="authorization"></a>
Token based authentication is supported. Every API request must be accompanied by a header value that identifies the token to be used. Tokens are created by the administrative U/I at either the administrator or partner level.

There are 2 headers supported:

**X-Private-Token** - This token is used by administrators to look across all Enterprises. API calls marked **admin** need to use this token.

**X-Partner-Token** - This token is used by partners and implicitly identifies the Enterprise that the partner is attached to. API calls marked **partner** need to use this token.

## Headers <a name="headers"></a>
The following headers are used in requests:  

| Header | Values | Description |  
| --- | --- | --- |  
| Accept | ```application/json``` | If not present ```application/json``` is assumed |  
| X-Partner-Token | token string | An authorization token that identifies the Enterprise the request is for |  
| X-Private-Token | token string | An authorization token that allows access to administrative endpoints not tied to a particular Enterprise |  

The following headers are used in responses:  

| Header | Values | Description |  
| --- | --- | --- |  
| Content-Type | ```application/json``` | The only content type we support |  



## Status Codes <a name="statuscodes"></a>
The following status codes can be returned from the API:

| Code | Message | Description |
| --- | --- | --- |
| 200 | OK  | The request was processed and returned successfully |
| 201 | Created | The new resource was created successfully |
| 204 | Deleted | The resource was deleted successfully |
| 400 | Bad Request | Problem with the request such as a missing or invalid parameter |
| 401 | Unauthorized | The request did not contain a valid authorization token |
| 403 | Forbidden | Private data that your authorization does not allow you to access or hitting a rate limit |
| 404 | Not Found | The requested resource does not exist |
| 500 | Server Error | There was a problem on the server side |
| 503 | Service Unavailable | The API is temporarily down |

#### Error Payload
This is what the **40x** and **50x** status codes return in the payload:
```json
{
  "error": "Header must contain either X-Private-Token or X-Partner-Token",
  "userMessage": "Request requires authentication"
}
```

## Resources <a name="resources"></a>
The following resources are supported by the API. All are represented below in JSON.

#### Enterprise
This represents a top-level Enterprise.

```json
{
  "id": "1001",
  "name": "Example Enterprise",
  "url": "http://www.enterprise.com"
}
```

#### Employer
This objects represents an Employer.

```json
{
  "enterpriseId": "1001",
  "id": "1002",
  "name": "Example Employer",
  "url": "http://www.employer.com",
  "xmlFeedUrl": "http://www.employer.com/feed.xml"
}
```

#### Publisher
This object represents a Publisher.

```json
{
  "enterpriseId": "1001",
  "id": "1003",
  "name": "Example Publisher"
}
```

#### Campaign**
This object represents a Campaign. Campaigns are owned by Employers and hold Jobs.

```json
{
  "categories": ["category1", "category2", "category3"],
  "cities": ["city1", "city2", "city3"],
  "companies": ["company1", "company2", "company3"],
  "employerId": "1002",
  "functions": ["function1", "function2", "function3"],
  "id": "1004",
  "keywords": ["keyword1", "keyword2", "keyword2"],
  "name": "Example Campaign",
  "maxApplies": 100,
  "maxClicks": 1000,
  "maxPaidApplies": 50,
  "maxPaidClicks": 500,
  "model": "Automatic",
  "reqNums": ["num1", "num2", "num3"],
  "states": ["NH", "VT", "ME"]
}
```

#### Job
This object represents a Job. Every job is contained in a Campaign.

```json
{
  "campaignId": "1004",
  "id": "1005",
  "reference": "12345",
  "title": "Example Job"
}
```

## Collections <a name="collections"></a>
The API returns several collections of resources. All collection endpoints support the same query parameters for paging and field selection. All collections also return the same wrapper for meta information about the collection.

### Wrapper
All resource collections return a standard payload that contains meta information about the result set as well as the actual resources.
```json
{
  "count": "Number of returned resources",
  "links": {
    "first": "URI to first page of resources",
    "last": "URI to last page of resources",
    "next": "URI to next page of resources",
    "prev": "URI to previous page of resources"
  },
  "results": [
    {  },
    {  }
  ],
  "totalCount": "Total number resources in the collection"
}
```

#### Paging
Use the ```offset``` to specify the starting point of the returned collection. Use ```limit``` to speficy the number of objects to return.
```
 GET /enterprises?offset=0&limit=100
```

#### Field Selection
To return a reduced set of attributes for the resources in a collection use the ```fields``` parameter.
```
  GET /enterprises?fields=id,name
```

## Endpoints <a name="endpoints"></a>
The following endoints are supported:

| Endopint | Method | Authorization | Description |
| --- | --- | --- | --- |
| ```/enterprises``` | GET | Admin | Return collection of Enterprises |
| ```/enterprises/:id``` | GET | Admin | Return one Enterprise |
| ```/employers``` | GET | Partner | Return collection of Employers |
| ```/employers/:id``` | GET | Partner | Return one Employer |
| ```/employers/:id/campaigns``` | GET | Partner | Return collection of Campaigns for Employer |
| ```/employers/:id/campaigns/:id``` | GET | Partner | Return one Campaign |
| ```/employers/:id/campaigns/:id/jobs``` | GET | Partner | Return collection of Jobs in Campaign |
| ```/employers/:id/campaigns/:id/jobs/:id``` | GET | Partner | Return one Job |
| ```/publishers``` | GET | Partner | Return collection of Publishers |
| ```/publishers/:id``` | GET | Partner | Return one Publisher |
