import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_get_course_details_by_id():
    session = requests.Session()
    try:
        # Step 1: Retrieve the list of courses to get a valid course id
        list_url = f"{BASE_URL}/api/courses"
        response = session.get(list_url, timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}"
        content_type = response.headers.get('Content-Type', '')
        assert 'application/json' in content_type, f"Expected JSON response, got Content-Type: {content_type}"
        courses = response.json()
        assert isinstance(courses, (list, dict)), "Courses response is not a list or dict"
        # Determine course id to test with
        course_id = None
        if isinstance(courses, list) and len(courses) > 0:
            first_course = courses[0]
            if isinstance(first_course, dict):
                cid = first_course.get("id") or first_course.get("ID") or first_course.get("course_id")
                if cid is not None:
                    course_id = str(cid)
        elif isinstance(courses, dict):
            possible_keys = ["data", "courses", "items"]
            for key in possible_keys:
                if key in courses and isinstance(courses[key], list) and len(courses[key]) > 0:
                    cid = courses[key][0].get("id") or courses[key][0].get("ID") or courses[key][0].get("course_id")
                    if cid is not None:
                        course_id = str(cid)
                        break
        assert course_id is not None, "No course id found in courses list response"

        # Step 2: Get details for selected course id
        detail_url = f"{BASE_URL}/api/courses/{course_id}"
        detail_response = session.get(detail_url, timeout=TIMEOUT)
        assert detail_response.status_code == 200, f"Expected 200 OK from course detail, got {detail_response.status_code}"
        detail_content_type = detail_response.headers.get('Content-Type', '')
        assert 'application/json' in detail_content_type, f"Expected JSON response for course detail, got Content-Type: {detail_content_type}"
        detail_data = detail_response.json()
        assert isinstance(detail_data, dict), "Course detail response is not a JSON object"
        expected_keys = ["id", "name", "description"]
        assert any(k in detail_data for k in expected_keys), "Expected keys not found in course detail response"

    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_get_course_details_by_id()
