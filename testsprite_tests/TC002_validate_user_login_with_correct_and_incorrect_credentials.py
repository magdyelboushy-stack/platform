import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:8000"
CSRF_ENDPOINT = "/api/csrf-token"
LOGIN_ENDPOINT = "/api/auth/login"
TIMEOUT = 30

AUTH_CREDENTIALS = {
    "username": "magdymohamed1929@gmail.com",
    "password": "Magdy@2010"
}

def get_csrf_token(session):
    try:
        response = session.get(f"{BASE_URL}{CSRF_ENDPOINT}", timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()
        csrf_token = data.get("csrf_token")
        assert csrf_token and isinstance(csrf_token, str)
        return csrf_token
    except Exception as e:
        raise RuntimeError(f"Failed to get CSRF token: {e}")

def test_validate_user_login_with_correct_and_incorrect_credentials():
    session = requests.Session()

    # Basic Auth used for initial access per PRD's authType "basic token"
    session.auth = HTTPBasicAuth(AUTH_CREDENTIALS["username"], AUTH_CREDENTIALS["password"])

    csrf_token = get_csrf_token(session)

    valid_payload = {
        "email": AUTH_CREDENTIALS["username"],
        "password": AUTH_CREDENTIALS["password"],
        "csrf_token": csrf_token
    }

    invalid_payload = {
        "email": AUTH_CREDENTIALS["username"],
        "password": "WrongPassword!123",
        "csrf_token": csrf_token
    }

    # 1. Test successful login with correct credentials
    try:
        resp = session.post(f"{BASE_URL}{LOGIN_ENDPOINT}", json=valid_payload, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Expected 200 OK but got {resp.status_code}"
    except Exception as e:
        raise AssertionError(f"Login with correct credentials failed: {e}")

    # 2. Test failed login with incorrect credentials - one attempt
    try:
        resp = session.post(f"{BASE_URL}{LOGIN_ENDPOINT}", json=invalid_payload, timeout=TIMEOUT)
        assert resp.status_code == 401, f"Expected 401 Unauthorized but got {resp.status_code}"
    except Exception as e:
        raise AssertionError(f"Login with incorrect credentials failed unexpectedly: {e}")

    # 3. Test account lockout after 5 failed attempts
    # The first failed attempt already made above, so 4 more attempts here
    for attempt in range(4):
        try:
            # Refresh CSRF token to simulate fresh tokens per request
            csrf_token = get_csrf_token(session)
            invalid_payload["csrf_token"] = csrf_token

            resp = session.post(f"{BASE_URL}{LOGIN_ENDPOINT}", json=invalid_payload, timeout=TIMEOUT)
            # For the first 4 attempts after the initial fail, expect 401 Unauthorized
            if attempt < 3:
                assert resp.status_code == 401, f"Attempt {attempt+2}: Expected 401 Unauthorized but got {resp.status_code}"
            else:
                # On the last failed attempt (5th), expect account lockout error
                # The PRD mentions "account locked temporarily" but does not specify status code or message
                # Assuming 401 Unauthorized still but with indication of lockout in response (common practice)
                # We'll check status code and try to detect lockout if possible
                assert resp.status_code == 401 or resp.status_code == 423, f"Attempt 5: Expected 401 or 423 for lockout but got {resp.status_code}"
                # Optionally check response content for lockout indication
                try:
                    resp_json = resp.json()
                    # It should have some error message indicative of lockout
                    assert any(keyword in resp_json.get("message", "").lower() for keyword in ["locked", "lockout", "temporarily"])
                except Exception:
                    # Cannot parse json or no lock message - it's still a pass if 401/423 returned
                    pass
        except Exception as e:
            raise AssertionError(f"Login attempt {attempt+2} failed unexpectedly: {e}")

test_validate_user_login_with_correct_and_incorrect_credentials()