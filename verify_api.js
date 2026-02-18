const http = require('http');

const url = 'http://localhost:3000/api/gallery';

http.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        try {
            const json = JSON.parse(data);
            if (json.images && Array.isArray(json.images)) {
                console.log('Success: Received ' + json.images.length + ' images');
                json.images.forEach(img => {
                    console.log(`ID: ${img.id}, Type: ${img.mimeType}, Link: ${img.webViewLink ? 'Yes' : 'No'}`);
                });
            } else if (json.error) {
                console.log('API Error:', json.error);
            } else {
                console.log('Unknown response structure:', Object.keys(json));
            }
        } catch (e) {
            console.log('Error parsing JSON:', e.message);
            console.log('Raw data preview:', data.substring(0, 100));
        }
    });

}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
