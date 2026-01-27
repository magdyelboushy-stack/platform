<?php
// Suppress errors in output to prevent breaking JS
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Buffer output to catch potential spurious output
ob_start();

$csrfToken = 'INITIAL_TOKEN';
$debugMessage = '';

try {
    require __DIR__ . '/../vendor/autoload.php';

    // Use SecureSession to match the backend's session configuration (Name: APP_SESSION)
    if (class_exists('App\\Utils\\SecureSession')) {
        \App\Utils\SecureSession::start();
    } elseif (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (class_exists('App\\Utils\\CSRF')) {
        $csrfToken = \App\Utils\CSRF::generate();
    } else {
        $csrfToken = 'CSRF_CLASS_NOT_FOUND';
    }

} catch (\Throwable $e) {
    $csrfToken = 'PHP_Exception';
    $debugMessage = $e->getMessage();
}

// Clean buffer
ob_end_clean();
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اختبار حماية التسجيل (Security Test)</title>
    <style>
        body { font-family: sans-serif; padding: 20px; background: #f0f2f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .test-case { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .success { border-left: 5px solid green; }
        .danger { border-left: 5px solid red; }
        .warning { border-left: 5px solid orange; }
        button { padding: 10px 20px; cursor: pointer; border: none; border-radius: 4px; color: white; margin-top: 10px; }
        .btn-green { background: #28a745; }
        .btn-red { background: #dc3545; }
        .btn-orange { background: #ffc107; color: black; }
        pre { background: #333; color: #fff; padding: 10px; overflow-x: auto; direction: ltr; min-height: 40px; }
        .response-box { margin-top: 10px; display: none; }
        .debug-info { background:#eee; padding:10px; margin-bottom:20px; font-family:monospace; direction:ltr; }
    </style>
</head>
<body>

<div class="container">
    <h1>🛡️ اختبار حماية التسجيل</h1>
    
    <div class="debug-info">
        <strong>Debug Info:</strong><br>
        Token: <?php echo htmlspecialchars(substr($csrfToken, 0, 20)) . '...'; ?><br>
        <?php if($debugMessage): ?>
            <span style="color:red">Error: <?php echo htmlspecialchars($debugMessage); ?></span>
        <?php endif; ?>
    </div>
    
    <!-- 1. اختبار تسجيل سليم -->
    <div class="test-case success">
        <h3>1. تسجيل مستخدم جديد (سليم)</h3>
        <p>تجربة إنشاء حساب ببيانات صحيحة للتحقق من أن النظام يعمل.</p>
        <button onclick="testRegister('valid')" class="btn-green">تجربة التسجيل السليم</button>
        <div id="res-valid" class="response-box"><pre></pre></div>
    </div>

    <!-- 2. اختبار XSS -->
    <div class="test-case danger">
        <h3>2. اختبار XSS Attack</h3>
        <p>محاولة إدخال كود JavaScript في الاسم: <code>&lt;script&gt;alert('Hacked')&lt;/script&gt;</code></p>
        <button onclick="testRegister('xss')" class="btn-red">نفذ هجوم XSS</button>
        <div id="res-xss" class="response-box"><pre></pre></div>
    </div>

    <!-- 3. اختبار CSRF -->
    <div class="test-case danger">
        <h3>3. اختبار CSRF Attack</h3>
        <p>إرسال طلب بدون CSRF Token أو بـ Token مزور.</p>
        <button onclick="testRegister('csrf')" class="btn-red">نفذ هجوم CSRF</button>
        <div id="res-csrf" class="response-box"><pre></pre></div>
    </div>

    <!-- 4. اختبار Rate Limiting -->
    <div class="test-case warning">
        <h3>4. اختبار Rate Limiting (Brute Force)</h3>
        <p>إرسال 6 طلبات متتالية بسرعة لتجاوز الحد المسموح (5 طلبات).</p>
        <button onclick="testRateLimit()" class="btn-orange">نفذ هجوم 6 طلبات</button>
        <div id="res-rate" class="response-box"><pre></pre></div>
    </div>

    <!-- 5. اختبار Honeypot -->
    <div class="test-case warning">
        <h3>5. اختبار Honeypot (Bot Detection)</h3>
        <p>محاولة ملء الحقل المخفي الذي لا يراه إلا البوتات.</p>
        <button onclick="testRegister('bot')" class="btn-red">نفذ كـ Bot</button>
        <div id="res-bot" class="response-box"><pre></pre></div>
    </div>

</div>

<!-- Define functions first -->
<script>
    async function testRegister(type) {
        let outputId = 'res-' + type;
        let box = document.querySelector('#' + outputId);
        box.style.display = 'block';
        box.querySelector('pre').textContent = "جارِ الإرسال...";

        let data = getPayload(type);
        
        console.log("Sending Data:", data);

        let res = await sendRequest(data);
        showResult(outputId, res);
    }

    async function testRateLimit() {
        let outputId = 'res-rate';
        let box = document.querySelector('#' + outputId);
        box.style.display = 'block';
        box.querySelector('pre').textContent = "جاري إرسال 6 طلبات...";

        for(let i=1; i<=6; i++) {
            let res = await sendRequest(getPayload('valid'));
            box.querySelector('pre').textContent += `\nRequest ${i}: Status ${res.status}`;
            if(res.status === 429) {
                box.querySelector('pre').textContent += " (✅ تم الحظر بنجاح)";
            }
        }
    }

    function getPayload(type) {
        let token = (typeof CSRF_TOKEN !== 'undefined') ? CSRF_TOKEN : 'MISSING_TOKEN_JS';
        let uniqueId = Date.now();
        let base = {
            name: "Test User " + uniqueId,
            email: "test" + uniqueId + "@example.com",
            password: "Password@123",
            phone: "010" + Math.floor(10000000 + Math.random() * 90000000),
            role: "student",
            national_id: "3010101" + Math.floor(1000000 + Math.random() * 9000000),
            csrf_token: token
        };

        if(type === 'xss') {
            base.name = "<script>alert('Hacked')<\/script>";
        }
        if(type === 'csrf') {
            base.csrf_token = "fake_token";
        }
        if(type === 'bot') {
            base.website = "I am a bot"; 
        }
        
        return base;
    }

    async function sendRequest(data) {
        try {
            let formData = new FormData();
            for(let key in data) {
                formData.append(key, data[key]);
            }

            let response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include', // Important: Send Cookies!
                body: formData
            });

            let text = await response.text();
            try {
                return { status: response.status, json: JSON.parse(text) };
            } catch(e) {
                return { status: response.status, text: text };
            }
        } catch(err) {
            return { error: err.message };
        }
    }

    function showResult(id, res) {
        let box = document.querySelector('#' + id);
        box.style.display = 'block';
        let content = `Status: ${res.status}\n`;
        content += JSON.stringify(res.json || res.text, null, 2);
        box.querySelector('pre').textContent = content;
    }
</script>

<!-- Inject Token Separate from Logic -->
<script>
    const CSRF_TOKEN = "<?php echo htmlspecialchars($csrfToken); ?>";
    console.log("CSRF Token Loaded:", CSRF_TOKEN);
</script>

</body>
</html>
