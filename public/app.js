// A js document for the frontend

// A function that renders the Article data to our modal
const renderArticle = (data) => {
  // Declare everything
  const modalArticle = document.getElementById('modal-article');
  const list = document.createElement('ul');
  const title = document.createElement('h2');
  const interviewee = document.createElement('li');
  const summary = document.createElement('li');
  const dateReleased = document.createElement('li');
  const URL = document.createElement('li');
  const a = document.createElement('a');

  // Clear the article portion of our modal
  modalArticle.innerHTML = '';

  // Define our anchor tag
  a.setAttribute('href', data.URL);
  a.setAttribute('target', '_blank');
  a.textContent = 'Link to the episode';

  // Add an anchor tag to the URL
  URL.appendChild(a);
  URL.setAttribute('id', 'modal-article-URL');
  URL.setAttribute('class', 'modal-list');

  // Build the dateReleased of the articl modal
  dateReleased.innerHTML = `Released: ${data.dateReleased}`;
  dateReleased.setAttribute('id', 'modal-article-dateReleased');
  dateReleased.setAttribute('class', 'modal-list');

  // Build the summary of the article modal
  summary.textContent = `Summary: ${data.summary}`;
  summary.setAttribute('id', 'modal-article-summary');
  summary.setAttribute('class', 'modal-list');

  // Build the interviewee of the article modal
  interviewee.textContent = `Interviewee: ${data.interviewee}`;
  interviewee.setAttribute('id', 'modal-article-interviewee');
  interviewee.setAttribute('class', 'modal-list');

  // Build the title of the article modal
  title.textContent = `Title: ${data.title}`;
  title.setAttribute('id', 'modal-article-title');

  // Append everything to the Article portion of the modal
  list.appendChild(interviewee);
  list.appendChild(summary);
  list.appendChild(dateReleased);
  list.appendChild(URL);
  modalArticle.appendChild(title);
  modalArticle.appendChild(list);
  return 'Complete!';
};

// A function that renders the comment data to our modal
const renderComment = (data) => {
  // All of the functions declarations
  const modalComment = document.getElementById('modal-comment');
  const form = document.createElement('form');
  const labelTitle = document.createElement('label');
  const inputTitle = document.createElement('input');
  const labelAuthor = document.createElement('label');
  const inputAuthor = document.createElement('input');
  const labelBody = document.createElement('label');
  const textArea = document.createElement('textarea');
  const button = document.createElement('button');
  let values = {};

  // Function that changes our values on all of our inputs depending on 
  // whether or not there is a comment stored in the DB
  if(data.comment) {
    values = {
      title: data.comment.title,
      author: data.comment.author,
      body: data.comment.body
    };
  } else {
    values = {
      title: '',
      author: '',
      body: ''
    };
  }

  // Clear the content of the section
  modalComment.innerHTML = '';

  // Add an action to our form
  // form.setAttribute('action', `/articles/${data._id}`);
  // form.setAttribute('method', 'post');
  form.setAttribute('id', 'comment-form');

  // Add title content of the comment section
  labelTitle.setAttribute('for', 'title');
  labelTitle.textContent = 'Comment Title';
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('name', 'title');
  inputTitle.value = values.title;

  // Add author content of the comment section
  labelAuthor.setAttribute('for', 'author');
  labelAuthor.textContent = 'Comment Author';
  inputAuthor.setAttribute('type', 'text');
  inputAuthor.setAttribute('name', 'author');
  inputAuthor.value = values.author;

  // Add body content of the comment section
  labelBody.setAttribute('for', 'body');
  labelBody.textContent = 'Comment';
  textArea.setAttribute('type', 'textarea');
  textArea.setAttribute('name', 'body');
  textArea.value = values.body;

  // Add our submit button
  button.setAttribute('type', 'submit');
  button.setAttribute('id', 'comment-update');
  button.setAttribute('data-articleid', data._id);
  button.setAttribute('form', 'comment-form');
  button.textContent = 'Click Here to Update';

  // Append everything to the comment section
  form.appendChild(labelTitle);
  form.appendChild(inputTitle);
  form.appendChild(labelAuthor);
  form.appendChild(inputAuthor);
  form.appendChild(labelBody);
  form.appendChild(textArea);
  form.appendChild(button);
  modalComment.appendChild(form);
};

// An event delegator for our clicks
document.addEventListener('click', (event) => {
  event.preventDefault();
  const idOrClass = () => {
    if(event.target.id === 'comment-update') {
      return { 
        grab: event.target.id, 
        articleID: event.target.getAttribute('data-articleid'),
        data: {
          'title': event.target.form.title.value,
          'author': event.target.form.author.value,
          'body': event.target.form.body.value
        }
      };
    } else if(event.target.className === 'modal-close') {
      return { grab: event.target.className};
    } else {
      return 'No Class or ID';
    }
  };
  if(idOrClass() !== undefined) {
    if(idOrClass().grab === 'comment-update') {
      // fetch post for adding to the comment
      fetch(`/articles/${idOrClass().articleID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(idOrClass().data)
      })
        .then((response) => {
          return response;
        });
    } else if(idOrClass().grab === 'modal-close') {
      document.getElementById('modal-bg').classList.toggle('invisible');
      document.body.classList.toggle('noscroll');
    } else {
      const path = event.composedPath();
      path.forEach(element => {
        if(element.dataset !== undefined) {
          if('articleid' in element.dataset) {
            fetch(`/comment/${element.dataset.articleid}`)
              .then((response) => {
                return response.json();
              })
              .then(function(data) {
                renderArticle(data);
                renderComment(data);
                document.getElementById('modal-bg').classList.toggle('invisible');
                document.body.classList.toggle('noscroll');
              })
              .catch((err) => {
                return err;
              });
          }
        }
      });
    }
  }
});
