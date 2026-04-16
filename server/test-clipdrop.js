import axios from 'axios';
import FormData from 'form-data';
const formdata = new FormData();
formdata.append('prompt', 'a cute cat');
axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
    headers: { 'x-api-key': 'aba4e7d625a2ced8d55b5cacf081cf1c340fd418cdb47656d36b95623e5081cd25f652f29b1b8a0aa43c187bb27c8588' }
}).then(res => console.log('Success:', res.status))
.catch(err => console.log('Error:', err.response ? err.response.data : err.message));
