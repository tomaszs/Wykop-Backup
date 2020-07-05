function getPosts() {
  result = [];
  var posts = $('div[data-type="entry"]').filter('.wblock');
  for (i = 0; i < posts.length; i++) {
    post = posts[i];
    timeNode = post.getElementsByTagName('time')[0];
    textNode = post.getElementsByClassName('text')[0];
    textPNode = textNode.querySelectorAll('.text > p')[0];
    imageNode = post.getElementsByClassName('media-content')[0];
    voteNode = post.getElementsByClassName('vC');
    
    //console.log('----')
    //console.log(imageNode == null ? "null" : imageNode.getAttribute('src'));
      
    id = post.getAttribute('data-id');
    time = timeNode.getAttribute('datetime');
    
    votes = voteNode[0].innerText.replaceAll(/\+/g, '');
    
    // Text
    text = textPNode.innerHTML.trim();
    textExpandedNode = textPNode.getElementsByClassName('text-expanded');
    if (textExpandedNode.length > 0) {
      text = text.replace(/pokaż całość/g, '');
    	text = text + textExpandedNode[0].innerHTML.trim();
    }
    
    // Media
    media = '';
    if (imageNode) {
      gifNode = $(imageNode).find('p.gif');
      if (gifNode.length > 0) {
        gifNode = imageNode.getElementsByTagName('a')[0];
        media = gifNode.getAttribute('href');
      } else {
       videoNode = $(imageNode).find('p.play');
       if (videoNode.length > 0) {
         videoNode = imageNode.getElementsByTagName('a')[0];
         media = videoNode.getAttribute('href');
       } else {
         imageNode = imageNode.getElementsByTagName('img')[0];
         imageUrl = imageNode.getAttribute('data-original');
         if (!imageUrl) {
           imageUrl = imageNode.getAttribute('src');
         }
         media = imageNode === null ? "" : imageUrl.replaceAll(/,w400/g,'')
       }
      }
    } else {
      imageNode = null;
    }

    result.push({id, time, text, media, votes});
  }
  return result;
}

function clickNext() {
	var matchingElement = document.evaluate("//a[text()='następna']",
    document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  
  if (matchingElement) {
    console.info('Run again to fetch next page');
    matchingElement.click();
  } else {
    console.info('Fetching finished');
  }
}

result = getPosts();
console.log(result);
console.info('Right click on array, copy and save to disk')
clickNext();