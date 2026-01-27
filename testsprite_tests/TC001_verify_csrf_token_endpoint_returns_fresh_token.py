import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:8000"
AUTH_USERNAME = "magdymohamed1929@gmail.com"
AUTH_PASSWORD = "Magdy@2010"
TIMEOUT = 30

def test_verify_csrf_token_endpoint_returns_fresh_token():
    url = f"{BASE_URL}/api/csrf-token"
    try:
        response = requests.get(url, auth=HTTPBasicAuth(AUTH_USERNAME, AUTH_PASSWORD), timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"
        
        json_data = response.json()
        
        assert isinstance(json_data, dict), "Response is not a JSON object"
        assert "csrf_token" in json_data, "'csrf_token' key missing in response"
        assert isinstance(json_data["csrf_token"], str) and json_data["csrf_token"], "'csrf_token' should be a non-empty string"
        
        assert "message" in json_data, "'message' key missing in response"
        assert isinstance(json_data["message"], str) and json_data["message"], "'message' should be a non-empty string"
        
        assert "session_id" in json_data, "'session_id' key missing in response"
        assert isinstance(json_data["session_id"], str) and json_data["session_id"], "'session_id' should be a non-empty string"
        
    except requests.RequestException as e:
        raise AssertionError(f"Request to CSRF endpoint failed: {e}")

test_verify_csrf_token_endpoint_returns_fresh_token()