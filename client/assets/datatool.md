# DataTool

> DataTool is a way to query our 3 Dynamodb tables (FeedTable, FeedRunTable and PostingsTable) through a simple JSON query language. The output is sent to the console only (csv later?) and an attempt is made to display it in a nice format. By default, only 20 characters of any field are displayed but this can be overridden with the -m num flag to the script.

Use the script in `startwire-jobengine/engine/scripts/datatool.sh`.

This script makes the following assumptions:
  * The `DEV_DIR` environment variable points to the directory where startwire-jobengine was checked out.
  * By default it will run the json search in `/temp/datatool.json`

The script accepts the following parameters:
  * -f file: The full pathname of the file that contains the json to run. By default it will try to read `/temp/datatool.json`.
  * -h: Display usage info and exit.
  * -l: Use the **LIVE** DynamoDB database! Use with caution obviously and not necessary if this code is run from storm worker0.
  * -m number: The maximum number of characters to display for any field that is written to the console.

## JSON query language

The json sent to DataTool must a Map. The Map can have the following keys:
  * TABLE - one of FeedTable, FeedRunTable or PostingsTable (required).
  * OP - operation. One of COUNT, DELETE, SELECT, UPDATE (required).
  * FIELDS - list of fields to be returned (default to all).
  * FILTER - map of filter criteria (required only for DELETE).
  * ORDER - string of field to order by. Accepts field,D to sort in descending order.
  * SET - map of field-value pairs of changes to be made to returned items (required for UPDATE).

The FILTER map has the following format.
  * field: value - equality (field == value)
  * field: list - IN (field IN (values))
  * field: map (operator: value) - OPERATOR value
    * supported operators:
      * $eq - equals
      * $ne - not equals
      * $gt - greater than
      * $ge - greater than or equals
      * $lt - less than
      * $le - less than or equals

## Examples

To dump the FeedTable:

```json
{
  "TABLE": "FeedTable",
  "OP": "SELECT",
  "FIELDS": ["id", "name", "source", "enabled", "lastFeedRunID", "runningFeedRunID", "timestampNextRun"],
  "ORDER": "name"
}
```

To dump all running runs:

```json
{
  "TABLE": "FeedRunTable",
  "OP": "SELECT",
  "FIELDS": ["canceled", "completed", "error", "feedID", "hash", "numParsed", "numPostings", "numErrors", "numFiltered", "numRetries", "timestampStarted", "timestampParsed", "timestampCompleted"],
  "FILTER": { "canceled": { "$ne": true }, "completed": { "$ne": true } },
  "ORDER": "timestampStarted,D"
}
```

To complete running runs for a particular feed:

```json
{
  "TABLE": "FeedRunTable",
  "OP": "UPDATE",
  "FIELDS": ["canceled", "completed", "error", "feedID", "hash", "numParsed", "numPostings", "numErrors", "numFiltered", "numRetries", "timestampStarted", "timestampParsed", "timestampCompleted"],
  "FILTER": { "canceled": { "$ne": true }, "completed": { "$ne": true }, "feedID": "123" },
  "ORDER": "timestampStarted,D",
  "SET": {"completed": true, "timestampCompleted": 1472655490000}
}
```

To count runs from a particular feed:

```json
{
  "TABLE": "FeedRunTable",
  "OP": "COUNT",
  "FILTER": {"feedID": "10000"}
}
```

To look at all runs from a set of feeds:

```json
{
  "TABLE": "FeedRunTable",
  "OP": "SELECT",
  "FIELDS": ["canceled", "completed", "error", "feedID", "hash", "numParsed", "numPostings", "numErrors", "numFiltered", "numRetries", "timestampStarted", "timestampParsed", "timestampCompleted"],
  "FILTER": {"feedID": ["238","13","93","220","260","126","230","253","215","257","236"]},
  "ORDER": "timestampStarted,D"
}
```
