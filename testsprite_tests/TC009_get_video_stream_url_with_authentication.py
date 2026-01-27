import requests

BASE_URL = "http://localhost:3000"
BEARER_TOKEN = "testbearertoken123"  # Placeholder token; in real test, obtain valid token
TIMEOUT = 30

def test_get_video_stream_url_with_authentication():
    session = requests.Session()
    session.headers.update({"Authorization": f"Bearer {BEARER_TOKEN}"})
    try:
        # Retrieve list of courses to find a valid lessonId
        courses_resp = session.get(f"{BASE_URL}/api/courses", timeout=TIMEOUT)
        assert courses_resp.status_code == 200, f"Failed to get courses: {courses_resp.status_code} {courses_resp.text}"
        content_type = courses_resp.headers.get("Content-Type", "")
        assert "application/json" in content_type, f"Courses response Content-Type is not application/json: {content_type}"

        try:
            courses = courses_resp.json()
        except Exception as e:
            assert False, f"Courses response is not valid JSON: {e}"

        assert isinstance(courses, (list, dict)), "Courses response should be a list or dict"
        
        lesson_id = None
        # Attempt to extract a lessonId from the first course's details (assuming course structure)
        # If courses is a list, pick the first course's id
        first_course_id = None
        if isinstance(courses, list) and len(courses) > 0:
            first_course = courses[0]
            if isinstance(first_course, dict):
                first_course_id = first_course.get("id") or first_course.get("course_id")
        elif isinstance(courses, dict):
            values = list(courses.values())
            if len(values) > 0 and isinstance(values[0], dict):
                first_course_id = values[0].get("id")
        
        assert first_course_id, "No course id found to extract lessonId"

        # Retrieve the course details to find a lessonId
        course_detail_resp = session.get(f"{BASE_URL}/api/courses/{first_course_id}", timeout=TIMEOUT)
        assert course_detail_resp.status_code == 200, f"Failed to get course details: {course_detail_resp.status_code} {course_detail_resp.text}"
        content_type = course_detail_resp.headers.get("Content-Type", "")
        assert "application/json" in content_type, f"Course detail response Content-Type is not application/json: {content_type}"

        try:
            course_detail = course_detail_resp.json()
        except Exception as e:
            assert False, f"Course detail response is not valid JSON: {e}"
        
        lessons = None
        if isinstance(course_detail, dict):
            lessons = course_detail.get("lessons")
        
        if lessons and isinstance(lessons, list) and len(lessons) > 0:
            first_lesson = lessons[0]
            if isinstance(first_lesson, dict):
                lesson_id = first_lesson.get("id") or first_lesson.get("lessonId") or first_lesson.get("lesson_id")
        else:
            if isinstance(course_detail, dict):
                lesson_id = course_detail.get("id") or course_detail.get("lessonId")

        assert lesson_id, "No lessonId found in course details"
        lesson_id = str(lesson_id)
        
        # Call the /api/player/{lessonId}/stream endpoint with authentication
        stream_resp = session.get(f"{BASE_URL}/api/player/{lesson_id}/stream", timeout=TIMEOUT)
        assert stream_resp.status_code == 200, f"Failed to get video stream: {stream_resp.status_code} {stream_resp.text}"

        content_type = stream_resp.headers.get("Content-Type", "")
        assert any(content_type.startswith(prefix) for prefix in ["video/", "application/"]), f"Response Content-Type is not a supported streaming type: {content_type}"

    finally:
        session.close()

test_get_video_stream_url_with_authentication()
