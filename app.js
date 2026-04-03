// 页面切换
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// 模态框显示
function showModal(modalId) {
    document.getElementById('modal-mask').classList.add('active');
    document.getElementById(modalId).classList.add('active');
}

// 关闭模态框
function closeModal(modalId) {
    document.getElementById('modal-mask').classList.remove('active');
    document.getElementById(modalId).classList.remove('active');
}

// 关闭所有模态框
function closeAllModals() {
    document.getElementById('modal-mask').classList.remove('active');
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Toast提示
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 2000);
}

// 测算结果数据
const resultData = {
    '空亡': {
        info: '音信稀时,五行属土,颜色黄色,方位中央;临勾陈。谋事主三、六、九。有不吉、无结果、忧虑之含义。诀曰:空亡事不祥,阴人多乖张。求财无利益,行人有灾殃。失物寻不见,官事有刑伤。病人逢暗鬼,析解可安康。',
        details: [
            '出行不利,易遇阻碍,建议改日出行',
            '病情反复,需多加调养,注意休息',
            '失物难寻,可能已被人拾走',
            '不宜动土修造,诸事不顺'
        ]
    },
    '大安': {
        info: '身不动时,五行属木,颜色青色,方位东方。临青龙,谋事主一、五、七。有静止、心安。吉祥之含义。诀曰:大安事事昌,求谋在东方,失物去不远,宅舍保安康。行人身未动,病者主无妨。将军回田野,仔细好推详。',
        details: [
            '出行大吉,东方最宜,可获财运',
            '身体无碍,心情舒畅,适合养生',
            '失物在近处,仔细寻找可得',
            '宜修造动土,大吉大利'
        ]
    },
    '留连': {
        info: '人未归时,五行属水,颜色黑色,方位北方,临玄武,凡谋事主二、八、十。有喑味不明,延迟。纠缠.拖延、漫长之含义。诀曰:留连事难成,求谋日未明。官事只宜缓,去者来回程,失物南方去,急寻方心明。更需防口舌,人事且平平。',
        details: [
            '出行有阻,可能延误,需耐心等待',
            '病情缠绵,需坚持治疗',
            '失物在南方,需费时寻找',
            '修造宜缓,不宜急躁'
        ]
    },
    '速喜': {
        info: '人即至时,五行属火,颜色红色方位南方,临朱雀,谋事主三,六,九。有快速、喜庆,吉利之含义。指时机已到。诀曰:速喜喜来临,求财向南行。失物申未午,逢人要打听。官事有福德,病者无须恐。田宅六畜吉,行人音信明。',
        details: [
            '出行速吉,南方大利,有喜事临门',
            '病情好转,即将康复',
            '失物速寻可得,有人归还',
            '修造吉利,速战速决'
        ]
    },
    '赤口': {
        info: '官事凶时,五行属金,颜色白色,方位西方,临白虎,谋事主四、七,十。有不吉、惊恐,凶险、口舌是非之含义。诀曰:赤口主口舌,官非切要防。失物急去寻,行人有惊慌。鸡犬多作怪,病者出西方。更须防咀咒,恐怕染瘟殃。',
        details: [
            '出行不利,易生是非,宜避西方',
            '病情较重,需多加小心',
            '失物难寻,需防被盗',
            '不宜修造,恐有意外'
        ]
    },
    '小吉': {
        info: '人来喜时,五行属木,临六合,凡谋事主一、五、七有和合、吉利之含义。诀曰:小吉最吉昌,路上好商量。阴人来报喜,失物在坤方。行人立便至,交易甚是强,凡事皆和合,病者祈上苍。',
        details: [
            '出行吉利,有贵人相助',
            '病情好转,心情愉快',
            '失物可寻,有人相助',
            '修造顺利,万事如意'
        ]
    }
};

// 抽签相关变量
let currentSign = '';
let cupCount = 0;
let canViewResult = false;

// 抽签功能
function drawLot() {
    currentSign = Math.floor(Math.random() * 100) + 1;
    document.getElementById('sign-number').textContent = currentSign + '签';
    document.getElementById('draw-btn').style.display = 'none';
    document.getElementById('throw-btn').style.display = 'block';
    cupCount = 0;
    canViewResult = false;
    
    // 清空杯子图片
    document.getElementById('cup1').src = '';
    document.getElementById('cup2').src = '';
    document.getElementById('cup3').src = '';
    document.getElementById('cup-container').style.display = 'none';
    document.getElementById('result-text').textContent = '';
}

// 掷杯功能
function throwCup() {
    // 随机结果: 0-6为圣杯, 7为笑杯
    const isHolyCup = Math.random() < 0.875; // 87.5%概率圣杯
    
    if (isHolyCup) {
        cupCount++;
        document.getElementById('cup' + cupCount).src = 'picture/圣杯.png';
        document.getElementById('cup-container').style.display = 'flex';
        
        if (cupCount === 3) {
            document.getElementById('result-text').textContent = '恭喜你,连续三次掷出了圣杯,请取灵签!';
            document.getElementById('throw-btn').style.display = 'none';
            document.getElementById('get-btn').style.display = 'block';
            canViewResult = true;
        } else {
            document.getElementById('result-text').textContent = '你掷出了一次圣杯,请再掷一次!';
        }
    } else {
        document.getElementById('cup-container').style.display = 'flex';
        document.getElementById('cup1').src = 'picture/笑杯.png';
        document.getElementById('result-text').textContent = '你掷出了笑杯,此签不灵,请重新抽签';
        document.getElementById('throw-btn').style.display = 'none';
        document.getElementById('draw-btn').style.display = 'block';
        cupCount = 0;
    }
}

// 取签结果
function getResult() {
    if (!canViewResult || !currentSign) {
        showToast('请先完成抽签和掷杯');
        return;
    }
    showAnswerPage();
}

// 查看结果
function viewResult() {
    if (!canViewResult || !currentSign) {
        showToast('请先完成抽签和掷杯');
        return;
    }
    showAnswerPage();
}

// 显示解签页面
function showAnswerPage() {
    const answerImg = document.getElementById('answer-img');
    const answerLoading = document.getElementById('answer-loading');
    answerImg.style.display = 'none';
    answerLoading.style.display = 'block';
    answerImg.src = 'picture/签文/签' + currentSign + '.jpg';
    showPage('answer-page');
}

// 随机数预测相关变量
let randomSum = 0;
let randomTypeIndex = 0;

// 添加输入框
function addInput() {
    const container = document.getElementById('random-inputs');
    const div = document.createElement('div');
    div.className = 'input-item';
    div.innerHTML = `
        <input type="number" class="num-input" placeholder="请输入数字" onchange="updateSum()">
        <button class="del-btn" onclick="removeInput(this)">−</button>
    `;
    container.appendChild(div);
    
    // 显示所有删除按钮
    document.querySelectorAll('#random-inputs .del-btn').forEach(btn => {
        btn.style.display = 'block';
    });
}

// 移除输入框
function removeInput(btn) {
    btn.parentElement.remove();
    updateSum();
    
    // 如果只剩一个输入框,隐藏删除按钮
    const items = document.querySelectorAll('#random-inputs .input-item');
    if (items.length === 1) {
        items[0].querySelector('.del-btn').style.display = 'none';
    }
}

// 更新总和
function updateSum() {
    randomSum = 0;
    document.querySelectorAll('#random-inputs .num-input').forEach(input => {
        if (input.value && input.value !== '0') {
            randomSum += parseInt(input.value);
        }
    });
}

// 开始随机数预测
function startRandomPredict() {
    updateSum();
    
    // 检查输入
    const inputs = document.querySelectorAll('#random-inputs .num-input');
    let hasValidInput = false;
    inputs.forEach(input => {
        if (input.value && input.value !== '0') {
            hasValidInput = true;
        }
    });
    
    if (!hasValidInput) {
        showToast('请输入非0整数哦!');
        return;
    }
    
    showModal('type-modal');
}

// 日期时辰预测相关变量
let selectedDate = null;
let selectedTimeIndex = null;

// 确认日期
function confirmDate() {
    const dateInput = document.getElementById('date-input');
    if (!dateInput.value) {
        showToast('请选择日期');
        return;
    }
    
    selectedDate = new Date(dateInput.value);
    closeModal('date-modal');
    
    // 简化处理:直接显示公历日期
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    document.getElementById('date-btn').textContent = `已选择: ${year}年${month}月${day}日`;
}

// 确认时辰
function confirmTime() {
    const timeSelect = document.getElementById('time-select');
    selectedTimeIndex = parseInt(timeSelect.value);
    closeModal('time-modal');
    
    const timeNames = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
    document.getElementById('time-btn').textContent = `已选择: ${timeNames[selectedTimeIndex]}`;
}

// 开始日期时辰预测
function startDatetimePredict() {
    if (!selectedDate) {
        showToast('请选择日期哦~');
        return;
    }
    if (selectedTimeIndex === null) {
        showToast('请选择时辰哦~');
        return;
    }
    
    showModal('type-modal');
}

// 选择预测类型
function selectType(index) {
    randomTypeIndex = index;
    closeModal('type-modal');
    
    // 禁用按钮
    const activePage = document.querySelector('.page.active');
    const startBtn = activePage.querySelector('.start-btn');
    startBtn.disabled = true;
    
    // 执行预测
    setTimeout(() => {
        let result;
        
        // 判断当前页面
        if (activePage.id === 'random-page') {
            // 随机数预测
            const length = document.querySelectorAll('#random-inputs .input-item').length;
            result = (randomSum - (length - 1)) % 6;
        } else {
            // 日期时辰预测
            // 简化: 使用日期和时辰的组合
            const dateSum = selectedDate.getDate() + selectedDate.getMonth() + selectedTimeIndex;
            result = (dateSum - 2) % 6;
        }
        
        // 确保结果为正数
        if (result < 0) result += 6;
        
        // 显示结果
        showPredictResult(result);
    }, 500);
}

// 显示预测结果
function showPredictResult(resultIndex) {
    const resultNames = ['空亡', '大安', '留连', '速喜', '赤口', '小吉'];
    const resultName = resultNames[resultIndex];
    const resultInfo = resultData[resultName];
    
    const typeNames = ['出行求财', '疾病康愈', '失物寻找', '吊宫修造'];
    
    document.getElementById('result-type').textContent = `你的测算选择是【${typeNames[randomTypeIndex]}】`;
    document.getElementById('result-res').textContent = `测算结果是【${resultName}】`;
    document.getElementById('result-info-toggle').textContent = `点击展开【${resultName}】的通用解释`;
    document.getElementById('result-info').textContent = resultInfo.info;
    document.getElementById('result-detail').textContent = `本次测算解析: ${resultInfo.details[randomTypeIndex]}`;
    document.getElementById('result-info').style.display = 'none';
    
    showModal('result-modal');
    
    // 旋转八卦图
    const activePage = document.querySelector('.page.active');
    const bagua = activePage.querySelector('.bagua-img');
    if (bagua) {
        const rotateDeg = [1620, 1680, 1740, 1800, 1500, 1560][resultIndex];
        bagua.style.transform = `translateX(-50%) rotate(${rotateDeg}deg)`;
        
        // 重置旋转
        setTimeout(() => {
            bagua.style.transition = 'none';
            bagua.style.transform = 'translateX(-50%) rotate(0deg)';
            setTimeout(() => {
                bagua.style.transition = 'transform 1s linear';
            }, 100);
        }, 1000);
    }
    
    // 重置按钮状态
    const startBtn = activePage.querySelector('.start-btn');
    startBtn.disabled = false;
}

// 切换详细信息显示
function toggleInfo() {
    const infoEl = document.getElementById('result-info');
    const toggleEl = document.getElementById('result-info-toggle');
    
    if (infoEl.style.display === 'none') {
        infoEl.style.display = 'block';
        const resultName = document.getElementById('result-res').textContent.match(/【(.+)】/)[1];
        toggleEl.textContent = `点击收起【${resultName}】的通用解释`;
    } else {
        infoEl.style.display = 'none';
        const resultName = document.getElementById('result-res').textContent.match(/【(.+)】/)[1];
        toggleEl.textContent = `点击展开【${resultName}】的通用解释`;
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载动画
    const loadingPage = document.getElementById('loading-page');
    const mainPage = document.getElementById('main-page');
    
    let current = 0;
    const dots = document.querySelectorAll('.load-dot');
    
    const timer = setInterval(() => {
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
        });
        dots[current].classList.add('active');
        current = (current + 1) % 4;
    }, 400);
    
    // 2秒后切换到主页面
    setTimeout(() => {
        clearInterval(timer);
        showPage('main-page');
    }, 2000);
    
    // 设置日期输入框的默认值为今天
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    document.getElementById('date-input').value = dateStr;
});
