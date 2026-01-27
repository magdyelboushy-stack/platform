import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:3000"
USERNAME = "magdymohamed1929@gmail.com"
PASSWORD = "Magdy@2010"
TIMEOUT = 30

def test_update_lesson_progress_with_valid_data():
    lesson_id = None

    session = requests.Session()
    session.auth = HTTPBasicAuth(USERNAME, PASSWORD)
    session.headers.update({
        "Content-Type": "application/json"
    })
    try:
        courses_resp = session.get(f"{BASE_URL}/api/courses", timeout=TIMEOUT)
        assert courses_resp.status_code == 200, f"Failed to get courses: {courses_resp.text}"
        if courses_resp.headers.get("Content-Type", "").startswith("application/json") and courses_resp.text.strip():
            courses_data = courses_resp.json()
        else:
            courses_data = None

        assert courses_data and isinstance(courses_data, (list, dict)), "Courses response is not a list or dict"

        course_id = None
        if isinstance(courses_data, list) and len(courses_data) > 0 and "id" in courses_data[0]:
            course_id = courses_data[0]["id"]
        elif isinstance(courses_data, dict) and "data" in courses_data and len(courses_data["data"]) > 0 and "id" in courses_data["data"][0]:
            course_id = courses_data["data"][0]["id"]
        else:
            course_id = None

        assert course_id, "No course id found from courses list."

        course_details_resp = session.get(f"{BASE_URL}/api/courses/{course_id}", timeout=TIMEOUT)
        assert course_details_resp.status_code == 200, f"Failed to get course details: {course_details_resp.text}"

        lesson_id = None
        if course_details_resp.headers.get("Content-Type", "").startswith("application/json") and course_details_resp.text.strip():
            course_details = course_details_resp.json()
            if isinstance(course_details, dict):
                for key in ["lessons", "course_lessons", "data"]:
                    if key in course_details and isinstance(course_details[key], list) and len(course_details[key]) > 0:
                        lesson_id = course_details[key][0].get("id")
                        if lesson_id:
                            break
                if not lesson_id:
                    for v in course_details.values():
                        if isinstance(v, list) and len(v) > 0 and isinstance(v[0], dict) and "id" in v[0]:
                            lesson_id = v[0]["id"]
                            break
        if not lesson_id:
            lesson_id = "lesson123"

        csrf_resp = session.get(f"{BASE_URL}/api/csrf-token", timeout=TIMEOUT)
        assert csrf_resp.status_code == 200, f"Failed to get CSRF token: {csrf_resp.text}"
        if csrf_resp.headers.get("Content-Type", "").startswith("application/json") and csrf_resp.text.strip():
            csrf_token = csrf_resp.json().get("csrf_token")
        else:
            csrf_token = None
        assert csrf_token and isinstance(csrf_token, str), "Invalid CSRF token received"

        progress_data = {
            "progress": 75,
            "timestamp": "2026-01-21T12:00:00Z"
        }
        progress_url = f"{BASE_URL}/api/player/{lesson_id}/progress"
        headers = {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrf_token
        }

        resp = session.post(progress_url, json=progress_data, headers=headers, timeout=TIMEOUT)
        assert resp.status_code == 200 or resp.status_code == 204, f"Unexpected status code: {resp.status_code}, Response: {resp.text}"

        if resp.status_code == 200:
            if resp.headers.get("Content-Type", "").startswith("application/json") and resp.text.strip():
                resp_json = resp.json()
                assert isinstance(resp_json, dict), "Response is not a JSON object"
                assert "error" not in resp_json, f"Unexpected error in response: {resp_json}"

    except requests.RequestException as e:
        assert False, f"Request failed: {str(e)}"


test_update_lesson_progress_with_valid_data()
