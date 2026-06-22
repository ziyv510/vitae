const STORAGE_KEY = 'resumeData_v1'

const sampleData = {
  name: '崔紫玉',
  title: '计算机科学与技术 · 软件测试',
  contact: '17526398684 · 3398075968@qq.com · 陕西省西安市',
  summary: '计算机科班本科，掌握软件测试完整流程与用例设计方法，熟悉功能测试、接口测试及MySQL数据库操作。做事细心严谨、逻辑思维清晰，善于梳理业务流程、精准定位问题；学习能力强，能快速适应新技术与工作节奏，具备良好的团队协作与沟通协调能力。',
  skills: [
    '测试基础：测试计划/用例/报告编写，禅道缺陷管理',
    '接口测试：APIFox/Postman，JMeter参数化/关联/断言',
    '编程语言：Java（常用数据类型、函数编程）',
    '数据库：MySQL（增删改查、连接查询、子查询）',
    'Linux：文件目录管理、权限设置、日志分析定位问题',
    'AI辅助测试：Cursor、ChatGPT（用例生成/数据构造/问题分析）',
    '通用能力：Office办公软件，文档报告编写规范'
  ],
  techStack: ['Java', 'MySQL', 'APIFox', 'Postman', 'JMeter', '禅道', 'JUnit5', 'Linux', 'Vue3', 'Spring Boot'],
  projects: [
    { 
      title: '校园教务管理Web应用', 
      desc: '面向师生角色的教务管理系统，涵盖课程发布、选课管理、信息维护等核心流程。独立设计功能测试用例80+条，覆盖率100%；完成20+核心接口自动化测试；使用JMeter模拟50人并发定位慢SQL瓶颈，优化后接口响应时间降低40%。', 
      tags: ['需求分析', '用例设计', '接口测试', '性能测试', '缺陷管理'] 
    },
    { 
      title: '外卖订单管理系统', 
      desc: '基于Spring Boot + Vue3的O2O外卖平台，涵盖商家入驻、菜品管理、用户下单、订单状态流转、骑手配送等全链路功能。独立负责测试全流程，设计测试用例120+条，完成35+接口自动化测试，使用JMeter模拟100人并发压测，优化后下单接口响应时间降低65%，提交并跟踪修复Bug 45+个。', 
      tags: ['全流程测试', '接口自动化', '性能压测', '安全测试', '缺陷闭环'] 
    }
  ],
  experience: [
    { role: '大学英语四级（CET-4）', period: '2025.06', detail: '通过全国大学英语四级考试。' },
    { role: '校级二等奖学金', period: '2025.02', detail: '获校级二等奖学金，成绩优异。' },
    { role: '学生会学习部部长', period: '2024.09 - 2025.06', detail: '统筹部门日常管理与工作分配，策划并落地多场学术活动，累计覆盖学生逾50人次；主导活动全流程复盘与跨部门协作，优化工作流SOP。' },
    { role: '学生会企划部干事', period: '2023.09 - 2024.06', detail: '协助策划并执行校园文化活动，撰写活动执行方案，负责活动现场统筹与秩序维护，累计参与组织大型活动3场。' }
  ]
}

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : sampleData
  }catch(e){
    console.error(e)
    return sampleData
  }
}

function saveData(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function render(){
  const data = loadData()
  document.getElementById('name').textContent = data.name
  document.getElementById('title').textContent = data.title
  document.getElementById('contact').textContent = data.contact
  
  const summaryEl = document.getElementById('summary')
  if (summaryEl) summaryEl.textContent = data.summary

  const skillsEl = document.getElementById('skills')
  if (skillsEl) {
    skillsEl.innerHTML = ''
    data.skills.forEach(s => {
      const li = document.createElement('li')
      li.className = 'skill-list-item'
      li.textContent = s
      skillsEl.appendChild(li)
    })
  }

  const projectsEl = document.getElementById('projects')
  if (projectsEl) {
    projectsEl.innerHTML = ''
    data.projects.forEach(p => {
      const card = document.createElement('div')
      card.className = 'project-card'
      card.innerHTML = `
        <h3 class="font-semibold text-[#2a1f18] text-base">${p.title}</h3>
        <p class="text-sm text-[#4d3d32] mt-2 leading-relaxed">${p.desc}</p>
        <div class="mt-3 flex flex-wrap gap-1.5">
          ${p.tags.map(t => `<span class='project-tag px-2.5 py-0.5'>${t}</span>`).join('')}
        </div>
      `
      projectsEl.appendChild(card)
    })
  }

  const techStackEl = document.getElementById('techStack')
  if (techStackEl) {
    techStackEl.innerHTML = ''
    data.techStack.forEach(item => {
      const span = document.createElement('span')
      span.className = 'skill-tag'
      span.textContent = item
      techStackEl.appendChild(span)
    })
  }

  const expEl = document.getElementById('experience')
  if (expEl) {
    expEl.innerHTML = ''
    data.experience.forEach(e => {
      const d = document.createElement('div')
      d.className = 'exp-divider border-b pb-3 last:border-0'
      d.innerHTML = `
        <div class="font-medium text-[#2a1f18] text-sm">${e.role} <span class="text-xs text-[#8a7a6e] font-normal">${e.period}</span></div>
        <div class="text-sm text-[#4d3d32] mt-0.5 leading-relaxed">${e.detail}</div>
      `
      expEl.appendChild(d)
    })
  }
}

function openEditor(){
  const data = loadData()
  document.getElementById('inputName').value = data.name
  document.getElementById('inputTitle').value = data.title
  document.getElementById('inputContact').value = data.contact
  document.getElementById('inputSummary').value = data.summary
  document.getElementById('inputSkills').value = data.skills.join(', ')
  document.getElementById('inputTechStack').value = data.techStack.join(', ')
  document.getElementById('inputProjects').value = data.projects.map(p => `${p.title}|${p.desc}|${p.tags.join(',')}`).join('\n')
  document.getElementById('inputExperience').value = data.experience.map(e => `${e.role}|${e.period}|${e.detail}`).join('\n')
  document.getElementById('editor').classList.remove('hidden')
  document.getElementById('editor').style.display = 'flex'
}

function closeEditor(){ 
  document.getElementById('editor').classList.add('hidden')
  document.getElementById('editor').style.display = 'none'
}

function applyEditor(){
  const name = document.getElementById('inputName').value.trim()
  const title = document.getElementById('inputTitle').value.trim()
  const contact = document.getElementById('inputContact').value.trim()
  const summary = document.getElementById('inputSummary').value.trim()
  const skills = document.getElementById('inputSkills').value.split(',').map(s => s.trim()).filter(Boolean)
  const techStack = document.getElementById('inputTechStack').value.split(',').map(s => s.trim()).filter(Boolean)
  const projectsRaw = document.getElementById('inputProjects').value.split('\n').map(l => l.trim()).filter(Boolean)
  const projects = projectsRaw.map(line => {
    const [t, desc, tags] = line.split('|').map(s => s ? s.trim() : '')
    return { title: t || 'Untitled', desc: desc || '', tags: tags ? tags.split(',').map(x => x.trim()).filter(Boolean) : [] }
  })
  const experienceRaw = document.getElementById('inputExperience').value.split('\n').map(l => l.trim()).filter(Boolean)
  const experience = experienceRaw.map(line => {
    const [role, period, detail] = line.split('|').map(s => s ? s.trim() : '')
    return { role: role || '未命名', period: period || '', detail: detail || '' }
  })

  const newData = { ...loadData(), name, title, contact, summary, skills, techStack, projects, experience }
  saveData(newData)
  closeEditor()
  render()
}

function resetSample(){
  if (confirm('恢复示例数据？会覆盖当前本地数据。')) {
    saveData(sampleData)
    render()
  }
}

document.getElementById('editBtn').addEventListener('click', openEditor)
document.getElementById('cancelEdit').addEventListener('click', closeEditor)
document.getElementById('saveEdit').addEventListener('click', applyEditor)
document.getElementById('resetBtn').addEventListener('click', resetSample)

render()