import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:8000"
AUTH = HTTPBasicAuth("magdymohamed1929@gmail.com", "Magdy@2010")
TIMEOUT = 30

def test_validate_user_registration_with_valid_and_invalid_data():
    session = requests.Session()
    session.auth = AUTH

    # Get CSRF token
    try:
        csrf_resp = session.get(f"{BASE_URL}/api/csrf-token", timeout=TIMEOUT)
        assert csrf_resp.status_code == 200, f"Expected 200 from CSRF token endpoint, got {csrf_resp.status_code}"
        csrf_data = csrf_resp.json()
        csrf_token = csrf_data.get("csrf_token")
        assert csrf_token and isinstance(csrf_token, str), "CSRF token missing or invalid."
    except Exception as e:
        raise AssertionError(f"Failed to get CSRF token: {e}")

    headers = {
        "Content-Type": "application/json"
    }

    # Valid user data
    valid_user = {
        "name": "Test User",
        "email": "test.user+valid@example.com",
        "password": "StrongPassw0rd!",
        "csrf_token": csrf_token
    }

    # Invalid user data sets (missing fields, invalid email, weak password)
    invalid_users = [
        # Missing name
        {
            "email": "invalid1@example.com",
            "password": "StrongPassw0rd!",
            "csrf_token": csrf_token
        },
        # Invalid email format
        {
            "name": "Invalid Email",
            "email": "invalid-email-format",
            "password": "StrongPassw0rd!",
            "csrf_token": csrf_token
        },
        # Weak password (too short)
        {
            "name": "Weak Password",
            "email": "weak.password@example.com",
            "password": "123",
            "csrf_token": csrf_token
        },
        # Missing csrf_token
        {
            "name": "No CSRF",
            "email": "no.csrf@example.com",
            "password": "StrongPassw0rd!"
        }
    ]

    created_user_email = None

    # Test valid registration (should return 201)
    try:
        resp = session.post(f"{BASE_URL}/api/auth/register", json=valid_user, headers=headers, timeout=TIMEOUT)
        assert resp.status_code == 201, f"Expected 201 Created for valid registration, got {resp.status_code}"
        created_user_email = valid_user["email"]
    except Exception as e:
        raise AssertionError(f"Valid registration test failed: {e}")

    # Test invalid registrations (should return 400)
    for idx, invalid_user in enumerate(invalid_users, start=1):
        try:
            resp = session.post(f"{BASE_URL}/api/auth/register", json=invalid_user, headers=headers, timeout=TIMEOUT)
            assert resp.status_code == 400, f"Expected 400 Bad Request for invalid user data set {idx}, got {resp.status_code}"
        except Exception as e:
            raise AssertionError(f"Invalid registration test case {idx} failed: {e}")

    # Cleanup: delete the created user if applicable
    if created_user_email:
        try:
            # Assuming we have a user deletion endpoint: DELETE /api/users?email={email}
            del_resp = session.delete(f"{BASE_URL}/api/users", params={"email": created_user_email}, timeout=TIMEOUT)
            # It's okay if the user deletion endpoint is not implemented; no assertion here.
        except Exception:
            # Ignore any exception in cleanup
            pass

test_validate_user_registration_with_valid_and_invalid_data()