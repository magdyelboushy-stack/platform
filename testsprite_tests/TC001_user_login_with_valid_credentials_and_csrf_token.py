import requests

BASE_URL = "http://localhost:3000"
LOGIN_URL = f"{BASE_URL}/api/auth/login"
CSRF_TOKEN_URL = f"{BASE_URL}/api/csrf-token"
TIMEOUT = 30

USERNAME = "magdymohamed1929@gmail.com"
PASSWORD = "Magdy@2010"


def test_user_login_with_valid_credentials_and_csrf_token():
    session = requests.Session()
    try:
        # Authenticate to get the CSRF token cookie and token value
        headers_get = {"Accept": "application/json"}
        csrf_resp = session.get(CSRF_TOKEN_URL, headers=headers_get, timeout=TIMEOUT)
        assert csrf_resp.status_code == 200, f"Failed to fetch CSRF token: {csrf_resp.text}"

        try:
            csrf_json = csrf_resp.json()
        except Exception as e:
            assert False, f"Failed to decode CSRF token response as JSON: {str(e)} Response content: {csrf_resp.text}"

        csrf_token = csrf_json.get("csrf_token")
        assert csrf_token and isinstance(csrf_token, str), "CSRF token missing or invalid"

        headers = {
            "Content-Type": "application/json"
        }

        payload = {
            "email": USERNAME,
            "password": PASSWORD,
            "csrf_token": csrf_token
        }

        # Actually login without Basic Auth (not specified in PRD)
        login_resp = session.post(LOGIN_URL, json=payload, headers=headers, timeout=TIMEOUT)

        # Assert expected success status code
        assert login_resp.status_code == 200, f"Expected 200 OK, got {login_resp.status_code}. Response: {login_resp.text}"

        try:
            login_data = login_resp.json()
        except Exception as e:
            assert False, f"Failed to decode login response as JSON: {str(e)} Response content: {login_resp.text}"

        # Validate response content
        assert "message" in login_data and isinstance(login_data["message"], str), "Missing or invalid 'message' in response"
        user = login_data.get("user")
        assert user and isinstance(user, dict), "'user' missing or invalid in response"
        for key in ["id", "name", "email", "role"]:
            assert key in user, f"User key '{key}' missing in response"
        assert isinstance(user["id"], int), "'id' should be int in user object"
        assert isinstance(user["name"], str), "'name' should be str in user object"
        assert isinstance(user["email"], str), "'email' should be str in user object"
        assert isinstance(user["role"], str), "'role' should be str in user object"
        assert "redirect" in login_data and isinstance(login_data["redirect"], str), "Missing or invalid 'redirect' in response"

    except (requests.RequestException, AssertionError) as e:
        raise AssertionError(f"Test failed: {str(e)}")
    finally:
        session.close()


test_user_login_with_valid_credentials_and_csrf_token()
