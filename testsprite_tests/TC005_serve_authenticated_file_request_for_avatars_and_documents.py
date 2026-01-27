import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:3000"
USERNAME = "magdymohamed1929@gmail.com"
PASSWORD = "Magdy@2010"
TIMEOUT = 30

def test_serve_authenticated_file_request_for_avatars_and_documents():
    auth = HTTPBasicAuth(USERNAME, PASSWORD)
    headers = {}

    # Test data for existing file - for the purpose of this test, assume we have at least one known file names.
    # Since no filename provided, we'll simulate with some common filenames.
    # In real tests, these would be retrieved or created beforehand.
    test_files = {
        "avatars": "test_avatar.png",
        "documents": "test_document.pdf"
    }

    # 1. Test valid serving of avatar and document files with authentication
    for file_type, filename in test_files.items():
        url = f"{BASE_URL}/api/files/{file_type}/{filename}"
        try:
            response = requests.get(url, auth=auth, headers=headers, timeout=TIMEOUT)
            # Check if access is granted and file served
            if response.status_code == 200:
                content_type = response.headers.get("Content-Type", "")
                if file_type == "avatars":
                    assert content_type.startswith("image/"), f"Expected image content type for avatars but got {content_type}"
                elif file_type == "documents":
                    assert content_type == "application/pdf", f"Expected PDF content type for documents but got {content_type}"
                else:
                    assert False, f"Unknown file type {file_type}"
            elif response.status_code == 403:
                # Access denied should not happen with valid auth, fail test if seen here
                assert False, f"Access denied for authenticated file request {url}"
            elif response.status_code == 404:
                # File not found - acceptable if test file does not exist
                pass
            else:
                assert False, f"Unexpected status code {response.status_code} for GET {url}"
        except requests.RequestException as e:
            assert False, f"Request failed for {url} with exception: {e}"

    # 2. Test access denial with invalid authentication
    invalid_auth = HTTPBasicAuth("invalid_user", "invalid_pass")
    sample_type = "avatars"
    sample_filename = "anyfile.png"
    url = f"{BASE_URL}/api/files/{sample_type}/{sample_filename}"
    try:
        response = requests.get(url, auth=invalid_auth, headers=headers, timeout=TIMEOUT)
        assert response.status_code == 403 or response.status_code == 401, f"Expected 403 or 401 for invalid auth but got {response.status_code}"
    except requests.RequestException as e:
        assert False, f"Request failed for access denial test with exception: {e}"

    # 3. Test file not found scenario with valid auth and non-existent file
    non_existent_file_url = f"{BASE_URL}/api/files/avatars/nonexistentfile.notexist"
    try:
        response = requests.get(non_existent_file_url, auth=auth, headers=headers, timeout=TIMEOUT)
        assert response.status_code == 404, f"Expected 404 for non-existent file but got {response.status_code}"
    except requests.RequestException as e:
        assert False, f"Request failed for file not found test with exception: {e}"

test_serve_authenticated_file_request_for_avatars_and_documents()
