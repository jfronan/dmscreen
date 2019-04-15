import React from 'react';

export const capitalizeWord = (stringBase)=> {
    try {
        return stringBase.charAt(0).toUpperCase() + stringBase.slice(1);
    } catch (error) {
        if (typeof stringBase === 'string') {
            console.log(error);
        }
        return null;
    }
}

export const capitalizeEveryWord = (stringBase)=> {
    try {
        var stringFinal = "";
        var stringFragments = stringBase.split(" ");
        for (let i = 0; i < stringFragments.length; i++) {
            if (i < (stringFragments.length - 1)) {
                stringFinal = stringFinal + capitalizeWord(stringFragments[i]) + " ";
            } else {
                stringFinal = stringFinal + capitalizeWord(stringFragments[i]);
            }
        };
        return stringFinal;
    } catch (error) {
        if (typeof stringBase === 'string') {
            console.log(error);
        }
        return capitalizeWord(stringBase);
    }
}

export const addPlusIfPositive = (number)=> {
    try {
        if (number >= 0) {
            return ("+" + number);
        }
        else {
            return number;
        }
    } catch (error) {
        return number;
    }
}

export const renderIframe = (url, classes)=> {
  var frameLoad = (frameRef)=> {
    var frame = frameRef.target;
    var body = frame.contentWindow.document.body;
    var images = frame.contentWindow.document.images;
    body.style.fontSize = '14px';
    body.style.whiteSpace = 'pre-line';
    for (var i = 0; i < images.length; i++) {
    images[i].style.maxWidth = '100%';
    images[i].style.maxHeight = '100%';
    images[i].style.objectFit = 'contain';
    images[i].style.alignSelf = 'center';
    }
  };
  return(
    <iframe id="myFrame" className={classes} src={url} onLoad={(frameRef)=> frameLoad(frameRef)} seamless/>
  )
}

export const isImageString = (fileName)=> {
    return (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".svg") || fileName.endsWith(".gif"))
};

export const percent = (total, incognito)=> {
    return (incognito*100/total);
}
