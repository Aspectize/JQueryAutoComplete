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

Add BootstrapSwitch in the Directories list :
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
<div aas-name='JQueryAutoCompleteSample' aas-type='JQueryAutoComplete.JQueryAutoComplete'></div>
```
    
b/ Binding

The following properties are bindable (reference of properties are here: http://www.bootstrap-switch.org/options.html):
- Label: can be bound to data to receive the label of the selected entry of the list.
- Value: can be bound to data to receive the value of the selected entry of the list.
- MultiValue: if true, multiple choices may be added into the input. Default is false.
- MultiValueSeparator: if MultiValue, specify character used to separate values. Default is ','.
- FillSelected: if true, the input is filled with the selected entry. if false, the input is cleared when an entry is selected. Default is true
- Custom: allow to fill the input with entry not in the list. Default is false.

The control has the following event:
- OnItemSelected: Fired when an item of the list is selected. Receive 2 arguments: 
  - IsCustom: true or false depending of custom typing in the input
  - Item: the selected entry of the list
- OnNeedData: specify wich command retreive the suggestion list. The command may be server side or client side.
- OnLabelChanged: 

c/ Retreive suggestion from server side

Your command should have the following signature:

Dictionary<string, object>[] SearchSuggestion(string term);

The dictionary should contain the following keys for each element of the list:
- label: the visible text of the element
- value: the Id of the element
- type: optional, is added as class attribute of the item in the list (usefull to add decoration icon in the list)
Any other keys may be retrieve as custom properties of Item parameter in the OnItemSelected Command.
