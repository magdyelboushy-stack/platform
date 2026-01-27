import requests
import base64

BASE_URL = "http://localhost:3000"
REGISTER_ENDPOINT = "/api/auth/register"
CSRF_TOKEN_ENDPOINT = "/api/csrf-token"
TIMEOUT = 30

def test_user_registration_with_valid_data_and_file_uploads():
    session = requests.Session()
    try:
        # Step 1: Get CSRF token
        csrf_response = session.get(f"{BASE_URL}{CSRF_TOKEN_ENDPOINT}", timeout=TIMEOUT)
        csrf_response.raise_for_status()
        csrf_token = csrf_response.json().get("csrf_token")
        assert csrf_token and isinstance(csrf_token, str), "CSRF token missing or invalid"

        # Prepare multipart form data
        # Using sample bytes for files; in real cases, load from actual files.
        profile_photo_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00'
        national_id_document_content = b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n'
        student_id_image_content = b'\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\x02'

        files = {
            "profile_photo": ("profile_photo.png", profile_photo_content, "image/png"),
            "national_id_document": ("national_id.pdf", national_id_document_content, "application/pdf"),
            "student_id_image": ("student_id.jpg", student_id_image_content, "image/jpeg"),
        }

        data = {
            "name": "Test Student",
            "email": "teststudent@example.com",
            "password": "StrongPass123!",
            "phone": "01234567890",
            "national_id": "12345678901234",
            "role": "student",
            "education_stage": "secondary",
            "grade_level": "10",
            "birth_date": "2006-05-15",
            "gender": "male",
            "parent_phone": "01122334455",
            "guardian_name": "Guardian Name",
            "school_name": "Sample High School",
            "csrf_token": csrf_token
        }

        response = session.post(
            f"{BASE_URL}{REGISTER_ENDPOINT}",
            data=data,
            files=files,
            timeout=TIMEOUT,
        )

        assert response.status_code == 201, f"Expected 201 Created, got {response.status_code}"
        resp_json = response.json()
        assert resp_json.get("message") and isinstance(resp_json.get("message"), str), "Response missing 'message'"
        user_id = resp_json.get("user_id")
        assert isinstance(user_id, int) and user_id > 0, "Invalid or missing user_id in response"
        status = resp_json.get("status")
        assert status == "success" or (isinstance(status, str) and status.lower() == "success"), "Registration status not successful"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"


test_user_registration_with_valid_data_and_file_uploads()
