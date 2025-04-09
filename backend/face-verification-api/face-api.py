# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from deepface import DeepFace
# import requests
# import base64
# import tempfile

# app = FastAPI()

# class FaceRequest(BaseModel):
#     captured_image: str
#     stored_image_url: str

# def base64_to_file(base64_string):
#     decoded = base64.b64decode(base64_string.split(",")[1])
#     temp = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
#     temp.write(decoded)
#     temp.close()
#     return temp.name

# @app.post("/verify")
# def verify_face(data: FaceRequest):
#     try:
#         captured_img_path = base64_to_file(data.captured_image)

#         result = DeepFace.verify(
#             img1_path=captured_img_path,
#             img2_path=data.stored_image_url,
#             enforce_detection=False
#         )
#         return { "verified": result["verified"] }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

import sys
import json
from deepface import DeepFace

if __name__ == "__main__":
    try:
        stored_image_url = sys.argv[1]
        captured_image_path = sys.argv[2]

        result = DeepFace.verify(img1_path=stored_image_url, img2_path=captured_image_path, enforce_detection=False)
        print(json.dumps({"verified": result["verified"]}))

    except Exception as e:
        print(json.dumps({"verified": False, "error": str(e)}))
