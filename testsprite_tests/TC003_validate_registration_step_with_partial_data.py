import requests

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_validate_registration_step_with_partial_data():
    url = f"{BASE_URL}/api/auth/validate-step"
    headers = {
        "Content-Type": "application/json"
    }
    # Partial data for a specific registration step, assuming step 1 and minimal data
    payload = {
        "step": 1,
        "data": {
            "name": "Ma"  # Intentionally partial/invalid to trigger validation error (minLength is 3)
        }
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    # The endpoint is used to validate registration steps; partial data should trigger server-side validation error
    # Expecting a 4xx response, typically 422 for validation errors, or some error status code
    assert response.status_code in (400, 422), f"Expected 400 or 422 status, got {response.status_code}"

    try:
        resp_json = response.json()
    except ValueError:
        assert False, "Response is not in JSON format"

    # Validate error response contains validation errors or messages related to the partial field
    # Since the schema in PRD does not specify response schema for validation errors,
    # just check that response contains some error indication
    error_indicators = ["error", "errors", "message", "validation"]
    assert any(key in resp_json for key in error_indicators), "Error details not found in response JSON"

test_validate_registration_step_with_partial_data()