import requests

BASE_URL = "http://localhost:3000"
USERNAME = "magdymohamed1929@gmail.com"
PASSWORD = "Magdy@2010"
TIMEOUT = 30


def get_csrf_token(session):
    resp = session.get(f"{BASE_URL}/api/csrf-token", headers={"Accept": "application/json"}, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Failed to get CSRF token: {resp.text}"
    data = resp.json()
    csrf_token = data.get('csrf_token')
    assert csrf_token, "CSRF token missing in response"
    return csrf_token


def test_enroll_in_course_with_valid_authentication():
    with requests.Session() as session:
        # Get CSRF token
        csrf_token = get_csrf_token(session)

        # Login
        login_payload = {
            "email": USERNAME,
            "password": PASSWORD,
            "csrf_token": csrf_token
        }
        login_resp = session.post(f"{BASE_URL}/api/auth/login", json=login_payload, headers={"Accept": "application/json"}, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Login failed: {login_resp.status_code} - {login_resp.text}"

        # Update headers to include Accept
        session.headers.update({"Accept": "application/json", "X-CSRF-Token": csrf_token})

        # Get list of courses
        courses_resp = session.get(f"{BASE_URL}/api/courses", timeout=TIMEOUT)
        assert courses_resp.status_code == 200, f"Failed to list courses: {courses_resp.text}"
        courses_data = courses_resp.json()

        first_course = None
        if isinstance(courses_data, list) and len(courses_data) > 0:
            first_course = courses_data[0]
        elif isinstance(courses_data, dict) and "courses" in courses_data and isinstance(courses_data["courses"], list):
            if len(courses_data["courses"]) > 0:
                first_course = courses_data["courses"][0]

        assert first_course is not None, "No course found to enroll."

        course_id = str(first_course.get("id") or first_course.get("course_id"))
        assert course_id, "Course ID not found in course data."

        # Enroll in course with CSRF token header
        enroll_url = f"{BASE_URL}/api/courses/{course_id}/enroll"
        enroll_resp = session.post(enroll_url, headers={"X-CSRF-Token": csrf_token, "Accept": "application/json"}, timeout=TIMEOUT)
        assert enroll_resp.status_code in (200, 201, 204), f"Enrollment failed: {enroll_resp.status_code} - {enroll_resp.text}"


test_enroll_in_course_with_valid_authentication()
