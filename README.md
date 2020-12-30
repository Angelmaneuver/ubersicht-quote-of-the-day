# Quote of the Day

This a widget for [Übersicht](http://tracesof.net/uebersicht/) that displays a random quote from [They Said So Quotes API]()

## Installion

Download the quote-of-the-day.widget.zip and unzip it to your widgets folder (default: ~/Library/Application Support/Übersicht/widgets).

## Preview

![quote-of-the-day.widget preview](quote-of-the-day.png)

## Settings

### Refresh time

A request is made every 6 hours, this is because I am not connected all day long so this make sure that the quote is updated everyday. You might want to set it to higher number

	// the refresh frequency in milliseconds
	// 21600000 = every 6h Default
	// 43200000 = every 12h
	// 86400000 = every 24h / day
	export const refreshFrequency = 21600000;

### Quote

The plugin use the public API no need for a key, the is retrieve from a category. The default is **Funny**

Edit the file to set key of your desired category
here are the predefined categories: **"death", "love", "life", "funny", "inspire", "art"**
	
	const current_category = categries[3]; //start at 0-5
	
#### Default

A default quote is set if no quote are return and the localStorage is empty

- *Never stop being a good person because of bad people*

### Appearance

For white backgrounds, uncomment this line in the css class, increase the alpha to your liking:
```background: rgba(0,0,0,0.5)``` will be dark enough to be readable.

	.quote-of-the-day::before 
	{
		//background: rgba(0,0,0,0.2);
	}

Edit the position by changing these settings:
	
	bottom: 100px;
	left: 25%;
	width: 960px; // no make it wider or narrowed
	
<s>You can remove the line above by commenting line **97**, I use it to delimiter my clock widget</s>

	<hr>
	
#### Quote image

Comment line ** to hide the image

	<img className="image" src={image}/>
	
## Disclamer

I am not a react developer so, the widget might not be optimize I just edit the default file and throw in some Vanilla JavaScript.
I use localStorage to limit the amount of request to the end point and to have the quote even when the network is down.

## To Do

- [] Automatically set a random categry every day
- [] Errors handling
- [] A fancy desing (maybe)😃
	


