import urllib.request
import json
import time

backend = "https://text-to-image-backend-plum.vercel.app"
email = f"test{int(time.time())}@example.com"

req = urllib.request.Request(f"{backend}/api/user/register", 
    data=json.dumps({"name": "Test", "email": email, "password": "password"}).encode('utf-8'),
    headers={"Content-Type": "application/json"})
res = urllib.request.urlopen(req)
token = json.loads(res.read().decode('utf-8')).get("token")

req2 = urllib.request.Request(f"{backend}/api/image/generate-image",
    data=json.dumps({"prompt": "A cute tiny dog"}).encode('utf-8'),
    headers={"Content-Type": "application/json", "token": token})
res2 = urllib.request.urlopen(req2)
data2 = json.loads(res2.read().decode('utf-8'))
img = data2.get("resultImage", "")
print("Image string len:", len(img))
print("Image string start:", img[:60])
print("Image string end:", img[-30:])

