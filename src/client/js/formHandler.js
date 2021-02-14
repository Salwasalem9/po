function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let text = document.getElementById('url').value;

  if (Client.checkForURL(text)) {
    console.log('True Link!');

    postData('http://localhost:8080/api', { url: text }).then(function (response) {
      document.querySelector('#arg1').innerHTML = `${(response.agreement)}`;
      document.querySelector('#sub2').innerHTML = `${(response.subjectivity)}`;
      document.querySelector('#conf3').innerHTML = `${response.confidence}`;
      document.querySelector('#score4').innerHTML = `${response.score_tag}${score(response.score_tag)}`;
    });
  } else {
    alert('False URL!');
  }
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const Data2 = await response.json();
    console.log( Data2 );
    return Data2;
  } catch (error) {
    console.log('error', error);
  }
};

 const score = (tx) => {
  let exit ;
  if (tx == 'P+' ) {
    alert(' (Very Positive)');
  }else if (tx == 'p'){
    alert(' (Positive)');
  }else if ( tx == 'NEU'){
    alert(' (Netural)');
  }else if ( tx == 'N'){
    alert(' (Negative)');
  }else if (tx == 'N+'){
    alert(' (Very Negative)');
  }else if ( tx == 'NONE'){
    alert( ' (No Sentiment)');
  }
  return exit;
}

export { handleSubmit };