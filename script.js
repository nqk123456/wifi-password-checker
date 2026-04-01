// 获取DOM元素（无错误）
const passwordInput = document.getElementById('passwordInput');
const strengthMeter = document.getElementById('strengthMeter');
const scoreElement = document.getElementById('score');
const suggestionsElement = document.getElementById('suggestions');

// 实时查看密码输入
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const score = calculateStrength(password); // 计算强度得分
    updateUI(score); // 更新UI
});

/**
 * 计算密码的强度
 * @param {string} password - 用户输入的密码
 * @returns {number} 显示强度得分
 */
function calculateStrength(password) {
    let score = 0;
    // 规则1：长度≥8（+25分）
    if (password.length >= 8) score += 25;
    // 规则2：包含数字（+25分）
    if (/\d/.test(password)) score += 25;
    // 规则3：包含大小写字母（+25分）
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
    // 规则4：包含特殊字符（+25分）
    if (/[@#$%^&*()]/.test(password)) score += 25;
    // 弱密码库扣分（最低0分）
    const weakPasswords = ['123456', 'admin', 'password', '111111'];
    if (weakPasswords.includes(password.toLowerCase())) {
        score = Math.max(score - 50, 0); // 扣分后不低于0
    }
    return Math.min(score, 100); // 最高100分
}

/**
 * 更新UI（进度条宽度+颜色+评分+建议）
 * @param {number} score - 强度得分
 */
function updateUI(score) {
    // 1. 更新进度条宽度（0-100%）
    strengthMeter.style.width = `${score}%`;
   
    if (score < 30) {
        strengthMeter.className = 'strength-weak'; // 对应红色
    } else if (score < 70) {
        strengthMeter.className = 'strength-medium'; // 对应黄色
    } else {
        strengthMeter.className = 'strength-strong'; // 对应绿色
    }
 
    scoreElement.textContent = `强度评分：${score}`;
    // 4. 提供建议
    if (score < 30) {
        suggestionsElement.textContent = '弱：建议增加数字、特殊字符，延长长度至8位以上！';
    } else if (score < 70) {
        suggestionsElement.textContent = '中：建议混合大小写字母，添加@#$等符号！';
    } else {
        suggestionsElement.textContent = '强：密码安全，继续保持！';
    }
}