## Overview 
1. The application will determine nodes with name input by the user and put them in an array *Mn*. 
2. In the array *Mn* the application will determine nodes that has less distance input by the user and put them in an array *Md*.
3. A canvas will show the names of the nodes in *Mn* in green text centred on their x and y coordinates, and the names of the nodes in *Md* in blue text centred on their x and y coordinates as well.
## Input 
A form with the elements : 
- File : A file uupload element accepting a single JSON file. 
- Name : String field 
- Distance : Numeric field 
## Output 
- A canvas element displaying the visual output. 
## JSON file format 
```javascript
[{
  name : <string>, 
  x : <number>,
  y : <number>, 
  connections : [
    <list of node names> 
  ]
}, ... ]
```
## Running the program 
```console
cd app 
npm start
```
## Requirement 
- Node.js
- React native 
      
      
