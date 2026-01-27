import requests

BASE_URL = "http://localhost:3000"
LOGIN_ENDPOINT = "/api/auth/login"
ME_ENDPOINT = "/api/auth/me"
TIMEOUT = 30

def test_get_authenticated_user_information_with_valid_token():
    session = requests.Session()

    username = "magdymohamed1929@gmail.com"
    password = "Magdy@2010"

    try:
        # Step 1: Obtain CSRF token
        csrf_response = session.get(f"{BASE_URL}/api/csrf-token", timeout=TIMEOUT)
        csrf_response.raise_for_status()
        csrf_token = csrf_response.json().get("csrf_token")
        assert csrf_token and isinstance(csrf_token, str), "CSRF token is missing or invalid"

        # Step 2: Login with session
        login_payload = {
            "email": username,
            "password": password,
            "csrf_token": csrf_token
        }
        headers = {"Content-Type": "application/json"}
        login_response = session.post(
            f"{BASE_URL}{LOGIN_ENDPOINT}",
            json=login_payload,
            headers=headers,
            timeout=TIMEOUT
        )
        assert login_response.status_code == 200, f"Login failed with status code {login_response.status_code}"

        # Step 3: Call /api/auth/me with session cookies (no Authorization header needed)
        me_response = session.get(f"{BASE_URL}{ME_ENDPOINT}", timeout=TIMEOUT)
        assert me_response.status_code == 200, f"Failed to get user info, status code: {me_response.status_code}"

        user_info = me_response.json()
        # Validate user information keys and types
        for key in ["id", "name", "email", "role"]:
            assert key in user_info, f"Key '{key}' missing in user info"
        assert isinstance(user_info["id"], int), "User id is not an integer"
        assert isinstance(user_info["name"], str) and user_info["name"], "User name is invalid"
        assert isinstance(user_info["email"], str) and user_info["email"], "User email is invalid"
        assert isinstance(user_info["role"], str) and user_info["role"], "User role is invalid"

    except requests.RequestException as e:
        assert False, f"HTTP request failed: {e}"

    except ValueError as e:
        assert False, f"Invalid JSON response: {e}"

# Execute the test function
test_get_authenticated_user_information_with_valid_token()
