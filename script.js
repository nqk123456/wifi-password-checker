const passwordInput = document.getElementById('passwordInput');
const strengthMeter = document.getElementById('strengthMeter');
const scoreElement = document.getElementById('score');
const suggestionsElement = document.getElementById('suggestions');

//实时密码输入
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const score = calculateStrength(password);
    updateUI(score);
});

// 计算密码强度评分（0-100分）
function calculateStrength(password) {
    let score = 0;
    
    // 规则1：长度≥8
    if (password.length >= 8) score += 25;
    
    // 规则2：包含数字
    if (/\d/.test(password)) score += 25;
    
    // 规则3：包含大小写字母
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
    
    // 规则4：包含特殊字符
    if (/[@#$%^&*()]/.test(password)) score += 25;
    
    return Math.min(score, 100); // 最大100分
}

function updateUI(score) {
    scoreElement.textContent = `强度评分：${score}`;
    
    // 进度条颜色的设置
    if (score < 30) {
        strengthMeter.className = 'strength-weak';
        suggestionsElement.textContent = '弱：建议增加数字和特殊字符！';
    } else if (score < 70) {
        strengthMeter.className = 'strength-medium';
        suggestionsElement.textContent = '中：建议混合大小写字母！';
    } else {
        strengthMeter.className = 'strength-strong';
        suggestionsElement.textContent = '强：安全！';
    }
}