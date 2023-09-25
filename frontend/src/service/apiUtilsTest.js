import apiUtils from './apiUtils.js'

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const newPost = {
    title: 'foo',
    body: 'bar',
    userId: 1
};

// Create (POST)
apiUtils.create(apiUrl, newPost)
    .then(response => console.log('Create:', response))
    .catch(error => console.error('Create Error:', error));

// Read (GET)
apiUtils.read(apiUrl)
    .then(response => console.log('Read:', response))
    .catch(error => console.error('Read Error:', error));

// Update (PUT or PATCH)
const updatedPost = { title: 'Updated title' };
const postUrl = `${apiUrl}/1`;  // Update the first post
apiUtils.update(postUrl, updatedPost)
    .then(response => console.log('Update:', response))
    .catch(error => console.error('Update Error:', error));

// Delete (DELETE)
const deleteUrl = `${apiUrl}/1`;  // Delete the first post
apiUtils.del(deleteUrl)
    .then(response => console.log('Delete:', response))
    .catch(error => console.error('Delete Error:', error));