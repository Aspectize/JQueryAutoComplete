# JQueryAutoComplete
JQueryAutoComplete Aspectize extension for https://jqueryui.com/autocomplete/

## 1 - Download

Download extension package from aspectize.com:
- in the portal, goto extension section
- browse extension, and find JQueryAutoComplete
- download package and unzip it into your local WebHost Applications directory; you should have a JQueryAutoComplete directory next to your app directory.

## 2 - Configuration

Add JQueryAutoComplete as Shared Application in your application configuration file.
In your Visual Studio Project, find the file Application.js in the Configuration folder.

Add JQueryAutoComplete in the Directories list :
```javascript
app.Directories = "... , JQueryAutoComplete";
```

## 3 - Include js and css

In your application.htm.ashx file, add the following files included: these are standard files from jquery and jquery-ui
```javascript
<script src="~Bootstrap/jQuery/jQuery-1.9.1.min.js"></script>
<link rel='stylesheet' type='text/css' href='~Bootstrap/jQuery/jquery-ui.css' />
<script src="~Bootstrap/jQuery/jquery-ui.min.js"></script>
```

## 4 - Usage

a/ Html

Insert the following html into your control:
```html
<input name='JQueryAutoCompleteSample' aas-type='JQueryAutoComplete.JQueryAutoComplete' />
```

b/ Command to retreive suggestion

The command may be server or client side.

On the server side, the command should have the following signature:

```csharp
Dictionary<string, object>[] SearchSuggestion(string term);
```

The parameter term is mandatory, and should not be bound on the OnNeedData event.
Any other parameter can be bound.

The dictionary should contain the following keys for each element of the array:
- label: the visible text of the element, displayed in the list
- value: the Id of the element
- type: optional, is added as class attribute of the item in the list (usefull to add decoration icon in the list)
- Any other keys may be retrieve as custom properties, and retreived in the Item parameter of the OnItemSelected Command.

c/ Binding

The following properties are bindable:
- Label: can be bound to data to receive the label of the selected entry of the list.
- Value: can be bound to data to receive the value of the selected entry of the list.
- MultiValue: if true, multiple choices may be added into the input. Default is false.
- MultiValueSeparator: if MultiValue, specify character used to separate values. Default is ','.
- FillSelected: indicates if the input should be filled with the selected entry or cleared. Default is true.
   - if true, the input is filled with the selected entry. 
   - if false, the input is cleared when an entry is selected (usefull in case of search).
- Custom: allow to fill the input with an entry not present in the list. Default is false.

The control has the following event:
- OnItemSelected: Fired when an item is selected. Receive 1 arguments aasEventArgs with the following properties:
  - IsCustom: true or false depending of custom typing in the input
  - Item: the selected entry of the list, which has a value and label property, and any other properties present in the dictionary returned by the command.
- OnNeedData: specify wich command retreive the suggestion list. The command may be server side or client side, 
indifferently. the parameter term should not be bound.


