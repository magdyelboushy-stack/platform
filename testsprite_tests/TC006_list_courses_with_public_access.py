import requests

def test_list_courses_with_public_access():
    base_url = "http://localhost:3000"
    endpoint = "/api/courses"
    url = base_url + endpoint

    # Basic token auth credential from instructions
    username = "magdymohamed1929@gmail.com"
    password = "Magdy@2010"

    try:
        response = requests.get(url, auth=(username, password), timeout=30)
        # Assert status code is 200 OK
        assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"

        # Validate that the response content type is JSON
        content_type = response.headers.get("Content-Type", "")
        assert "application/json" in content_type, f"Expected 'application/json' in Content-Type but got {content_type}"

        # Validate response structure is a list or dict (assuming list of courses or object with courses list)
        data = response.json()

        assert isinstance(data, (list, dict)), "Response JSON is not a list or dict"

        # If dict, check if contains list of courses or relevant key
        if isinstance(data, dict):
            # Check for key 'courses' or verify that keys present
            # Just verify it is not empty dict
            assert len(data) > 0, "Response JSON dict is empty"

            # Optionally check nested structure if possible
            # For this test, general structure check is sufficient
        else:
            # If list, optionally check each item has expected keys (not required explicitly)
            if len(data) > 0:
                first_course = data[0]
                assert isinstance(first_course, dict), "Items in courses list are not dicts"

    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {e}"

test_list_courses_with_public_access()
