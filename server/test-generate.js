import axios from 'axios';
const backendUrl = 'https://text-to-image-backend-plum.vercel.app';

(async () => {
    try {
        console.log("Registering temp user...");
        const reg = await axios.post(`${backendUrl}/api/user/register`, {
            name: "TempUser", email: `temp${Date.now()}@example.com`, password: "password"
        });
        const token = reg.data.token;
        console.log("Token:", token);

        console.log("Calling generate...");
        const res = await axios.post(`${backendUrl}/api/image/generate-image`, 
            { prompt: "a cute dog" }, 
            { headers: { token } }
        );
        console.log("Gen Image Response Success:", res.data.success);
        console.log("Message:", res.data.message);
        if (res.data.resultImage) {
            console.log("Image length:", res.data.resultImage.length);
            console.log("Image start:", res.data.resultImage.slice(0, 50));
        }
    } catch (e) {
        console.log("Error:", e.message);
    }
})();
