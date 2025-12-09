import React, { useState } from 'react';

// --- CONSTANTS & MOCK DATA ---
const FORM_TYPES = {
  KEY_DRIVER: 'KeyDriver',
  ACTION_PLAN: 'ActionPlan',
  SALES_ACTIVITY: 'SalesActivity'
};

const ROLES = ['IS', 'IA', 'LA', 'IS Commercial'];

const generateScenarios = () => {
  const scenarios = [];
  for (let i = 0; i < 10; i++) {
    const target = Math.round((Math.random() * 5000000) + 1000000);
    const successCount = Math.floor(Math.random() * 5) + 1;
    const nonSuccessCount = Math.floor(Math.random() * 5) + 1;
    const successAPE = Math.round((Math.random() * 100000) + 50000);
    const nonSuccessAPE = Math.round((Math.random() * 30000) + 10000);
    
    const leads = Math.floor(Math.random() * 50) + 20;
    const meets = Math.floor(leads * (0.6 + Math.random() * 0.2)); 
    const presents = Math.floor(meets * (0.7 + Math.random() * 0.2));
    const closes = Math.max(1, Math.floor(presents * (0.5 + Math.random() * 0.3))); 
    
    const avgPremium = Math.round((Math.random() * 20000) + 10000);
    const apeSubmit = closes * avgPremium;
    const issueRate = 0.8 + (Math.random() * 0.15);
    const apeIssue = Math.floor(apeSubmit * issueRate);

    scenarios.push({
      id: i,
      target,
      successCount,
      nonSuccessCount,
      successAPE, 
      nonSuccessAPE,
      leads,
      meets,
      presents,
      closes,
      avgPremium,
      apeSubmit,
      apeIssue
    });
  }
  return scenarios;
};

const MOCK_SCENARIOS = generateScenarios();

// --- ICON COMPONENTS ---
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const CalculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="16" y2="14"/>
    <line x1="8" y1="18" x2="16" y2="18"/>
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const CheckCircleIcon = ({ color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const AlertCircleIcon = ({ color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const RefreshCwIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

const ChevronDownIcon = ({ direction = "down" }) => {
  const transform = direction === "left" ? "rotate(90)" : direction === "right" ? "rotate(-90)" : "rotate(0)";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" transform={transform}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
};

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const Edit3Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

// --- UI COMPONENTS ---
const LoadingScreen = ({ onStart }) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.loadingScreen}>
      <div style={styles.loadingBgCircle1}></div>
      <div style={styles.loadingBgCircle2}></div>

      <div style={styles.loadingContent}>
        <div style={styles.logoContainer}>
          <div style={styles.logoText}>ttb</div>
        </div>
        
        <h1 style={styles.loadingTitle}>Performance Planner</h1>
        <p style={styles.loadingSubtitle}>Training & Calculation System</p>
        
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${progress}%`}}></div>
          </div>
          <p style={styles.progressText}>Initializing System... {progress}%</p>
        </div>

        <button 
          onClick={onStart}
          style={styles.startButton}
          disabled={progress < 100}
        >
          <PlayIcon />
          <span style={styles.startButtonText}>เข้าสู่ระบบ</span>
        </button>
      </div>
      
      <div style={styles.versionText}>
        v2.0.1 Production (Hotfix) | ttb Training Team
      </div>
    </div>
  );
};

const InputField = ({ 
  label, value, onChange, type = "text", 
  variant = "default",
  placeholder = "", highlight = false, unit = "", icon: Icon 
}) => {
  const inputStyle = {
    ...styles.input,
    ...(variant === 'readonly' && styles.inputReadonly),
    ...(variant === 'calculated' && styles.inputCalculated),
    ...(highlight && styles.inputHighlight),
    ...(variant === 'default' && styles.inputDefault)
  };

  return (
    <div style={styles.inputContainer}>
      <label style={styles.inputLabel}>{label}</label>
      <div style={styles.inputWrapper}>
        <input
          type={type}
          inputMode={type === 'number' ? 'decimal' : 'text'}
          value={value}
          onChange={variant === 'default' ? onChange : undefined}
          readOnly={variant !== 'default'}
          placeholder={placeholder}
          style={inputStyle}
        />
        <div style={styles.inputSuffix}>
          {unit && <span style={styles.unitText}>{unit}</span>}
          {variant === 'readonly' && <LockIcon />}
          {variant === 'calculated' && <ZapIcon />}
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, color = "blue", icon: Icon }) => {
  const colorStyle = color === 'blue' ? styles.sectionHeaderBlue : 
                    color === 'green' ? styles.sectionHeaderGreen :
                    color === 'red' ? styles.sectionHeaderRed : styles.sectionHeaderBlue;
  
  return (
    <div style={{...styles.sectionHeader, ...colorStyle}}>
      {Icon && <Icon />}
      <h3 style={styles.sectionTitle}>{title}</h3>
    </div>
  );
};

// --- SCREEN COMPONENTS ---
const ModeSelectionScreen = ({ onSelectMode }) => {
  const [passcode, setPasscode] = useState('');
  const [isPasscodeMode, setIsPasscodeMode] = useState(false);
  const [error, setError] = useState('');

  const verifyPasscode = () => {
    if (passcode === '54321') {
      onSelectMode('calculator');
    } else {
      setError('รหัสผ่านไม่ถูกต้อง');
      setPasscode('');
    }
  };

  if (isPasscodeMode) {
    return (
      <div style={styles.passcodeScreen}>
        <div style={styles.passcodeCard}>
          <h2 style={styles.passcodeTitle}>Enter Passcode</h2>
          <div style={styles.passcodeIcon}>
            <LockIcon />
          </div>
          <input 
            type="password"
            inputMode="numeric"
            value={passcode}
            onChange={(e) => {setPasscode(e.target.value); setError('');}}
            style={styles.passcodeInput}
            placeholder="•••••"
            maxLength={5}
            autoFocus
          />
          <p style={styles.errorText}>{error}</p>
          <div style={styles.passcodeButtons}>
            <button onClick={() => setIsPasscodeMode(false)} style={styles.cancelButton}>ยกเลิก</button>
            <button onClick={verifyPasscode} style={styles.confirmButton}>ยืนยัน</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modeScreen}>
      <div style={styles.modeContent}>
        <div style={styles.modeHeader}>
          <h2 style={styles.modeTitle}>เลือกโหมดการทำงาน</h2>
          <p style={styles.modeSubtitle}>Select working mode</p>
        </div>
        
        <div style={styles.modeButtons}>
          <button 
            onClick={() => onSelectMode('training')}
            style={styles.modeButton}
          >
            <div style={styles.modeButtonLeftBorder}></div>
            <div style={styles.modeIconOrange}>
              <BookOpenIcon />
            </div>
            <div style={styles.modeButtonContent}>
              <h3 style={styles.modeButtonTitle}>Training Mode</h3>
              <p style={styles.modeButtonDesc}>ฝึกคำนวณและกรอกฟอร์ม (สุ่มโจทย์)</p>
            </div>
            <ChevronDownIcon direction="left" />
          </button>

          <button 
            onClick={() => setIsPasscodeMode(true)}
            style={styles.modeButton}
          >
            <div style={styles.modeButtonLeftBorderBlue}></div>
            <div style={styles.modeIconBlue}>
              <CalculatorIcon />
            </div>
            <div style={styles.modeButtonContent}>
              <h3 style={styles.modeButtonTitle}>Working Mode</h3>
              <p style={styles.modeButtonDesc}>เครื่องมือช่วยคำนวณ (Passcode)</p>
            </div>
            <ChevronDownIcon direction="left" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FormSelectionScreen = ({ mode, onSelectForm, onBack }) => (
  <div style={styles.formScreen}>
    <div style={styles.formHeader}>
      <button onClick={onBack} style={styles.backButton}>
        <ArrowLeftIcon />
      </button>
      <div>
        <h2 style={styles.formTitle}>เลือกแบบฟอร์ม</h2>
        <span style={styles.formSubtitle}>{mode} Mode</span>
      </div>
    </div>
    
    <div style={styles.formGrid}>
      {Object.values(FORM_TYPES).map(type => (
        <div key={type} style={styles.formCard}>
          <h3 style={styles.formCardTitle}>{type.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <div style={styles.roleGrid}>
            {ROLES.map(r => (
              <button 
                key={r}
                onClick={() => onSelectForm(type, r)}
                style={styles.roleButton}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [screen, setScreen] = useState('loading');
  const [mode, setMode] = useState('training');
  const [formType, setFormType] = useState(FORM_TYPES.KEY_DRIVER);
  const [role, setRole] = useState('IA');
  
  const [scenario, setScenario] = useState(null);
  const [formData, setFormData] = useState({});
  const [validationResult, setValidationResult] = useState(null);

  const startForm = (selectedType, selectedRole) => {
    setFormType(selectedType);
    setRole(selectedRole);
    setValidationResult(null);
    setFormData({});

    if (mode === 'training') {
      const newScenario = MOCK_SCENARIOS[Math.floor(Math.random() * MOCK_SCENARIOS.length)];
      setScenario(newScenario);
      
      const initialData = {
        name: "Test User",
        zone: "BKK-1",
        rh: "Manager A",
        target: newScenario.target,
        success_count: newScenario.successCount,
        success_ape_per_head: newScenario.successAPE,
        nonsuccess_count: newScenario.nonSuccessCount,
        nonsuccess_ape_per_head: newScenario.nonSuccessAPE,
        leads: newScenario.leads,
        meets: newScenario.meets,
        presents: newScenario.presents,
        closes: newScenario.closes,
        ape_issue: newScenario.apeIssue,
        ape_submit: newScenario.apeSubmit,
      };
      setFormData(initialData);

    } else {
      setScenario(null);
      setFormData({});
    }
    setScreen('form');
  };

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    if (mode === 'calculator') {
      const safeFloat = (v) => parseFloat(String(v).replace(/,/g,'')) || 0;
      
      if (formType === FORM_TYPES.KEY_DRIVER || formType === FORM_TYPES.ACTION_PLAN) {
        const s_count = safeFloat(newData.success_count);
        const s_ape = safeFloat(newData.success_ape_per_head);
        const n_count = safeFloat(newData.nonsuccess_count);
        const n_ape = safeFloat(newData.nonsuccess_ape_per_head);
        const target = safeFloat(newData.target);

        const s_total = s_count * s_ape;
        const n_total = n_count * n_ape;
        const total_ape = s_total + n_total;
        const total_people = s_count + n_count;
        const s_percent = total_people > 0 ? (s_count / total_people) * 100 : 0;
        const n_percent = total_people > 0 ? (n_count / total_people) * 100 : 0;
        const ach = target > 0 ? (total_ape / target) * 100 : 0;

        setFormData(prev => ({
          ...prev,
          [field]: value,
          success_total_ape: s_total > 0 ? s_total : '',
          nonsuccess_total_ape: n_total > 0 ? n_total : '',
          success_percent: s_percent > 0 ? s_percent.toFixed(1) : '',
          nonsuccess_percent: n_percent > 0 ? n_percent.toFixed(1) : '',
          total_ape: total_ape > 0 ? total_ape : '',
          ach_target_percent: ach > 0 ? ach.toFixed(2) : ''
        }));
      }

      if (formType === FORM_TYPES.SALES_ACTIVITY) {
        const leads = safeFloat(newData.leads);
        const meets = safeFloat(newData.meets);
        const presents = safeFloat(newData.presents);
        const closes = safeFloat(newData.closes);
        const ape_issue = safeFloat(newData.ape_issue);
        const ape_submit = safeFloat(newData.ape_submit);

        const conv_lead_meet = leads > 0 ? (meets / leads) * 100 : 0;
        const conv_meet_present = meets > 0 ? (presents / meets) * 100 : 0;
        const conv_present_close = presents > 0 ? (closes / presents) * 100 : 0;
        const issue_rate = ape_submit > 0 ? (ape_issue / ape_submit) * 100 : 0;
        const avg_prem = closes > 0 ? (ape_submit / closes) : 0;

        setFormData(prev => ({
          ...prev,
          [field]: value,
          conv_lead_meet: conv_lead_meet > 0 ? conv_lead_meet.toFixed(0) : '',
          conv_meet_present: conv_meet_present > 0 ? conv_meet_present.toFixed(0) : '',
          conv_present_close: conv_present_close > 0 ? conv_present_close.toFixed(0) : '',
          issue_rate: issue_rate > 0 ? issue_rate.toFixed(1) : '',
          avg_premium: avg_prem > 0 ? avg_prem.toFixed(0) : ''
        }));
      }
    }
  };

  const validateTraining = () => {
    const safeFloat = (v) => parseFloat(String(v).replace(/,/g,'')) || 0;
    let errors = {};
    let isCorrect = true;

    const isClose = (a, b) => Math.abs(a - b) < 0.5;

    if (formType === FORM_TYPES.KEY_DRIVER || formType === FORM_TYPES.ACTION_PLAN) {
      const s_total = safeFloat(formData.success_count) * safeFloat(formData.success_ape_per_head);
      const n_total = safeFloat(formData.nonsuccess_count) * safeFloat(formData.nonsuccess_ape_per_head);
      const total_ape = s_total + n_total;
      const total_people = safeFloat(formData.success_count) + safeFloat(formData.nonsuccess_count);
      const s_perc = (safeFloat(formData.success_count) / total_people) * 100;
      const ach = (total_ape / safeFloat(formData.target)) * 100;

      if (!isClose(safeFloat(formData.success_total_ape), s_total)) errors.success_total_ape = `ที่ถูกต้อง: ${s_total.toLocaleString()}`;
      if (!isClose(safeFloat(formData.nonsuccess_total_ape), n_total)) errors.nonsuccess_total_ape = `ที่ถูกต้อง: ${n_total.toLocaleString()}`;
      if (!isClose(safeFloat(formData.total_ape), total_ape)) errors.total_ape = `ที่ถูกต้อง: ${total_ape.toLocaleString()}`;
      if (!isClose(safeFloat(formData.success_percent), s_perc)) errors.success_percent = `ที่ถูกต้อง: ${s_perc.toFixed(1)}%`;
      if (!isClose(safeFloat(formData.ach_target_percent), ach)) errors.ach_target_percent = `ที่ถูกต้อง: ${ach.toFixed(2)}%`;
    }

    if (formType === FORM_TYPES.SALES_ACTIVITY) {
      const c1 = (safeFloat(formData.meets) / safeFloat(formData.leads)) * 100;
      const c2 = (safeFloat(formData.presents) / safeFloat(formData.meets)) * 100;
      const c3 = (safeFloat(formData.closes) / safeFloat(formData.presents)) * 100;
      const issue_rate = (safeFloat(formData.ape_issue) / safeFloat(formData.ape_submit)) * 100;

      if (!isClose(safeFloat(formData.conv_lead_meet), c1)) errors.conv_lead_meet = `ที่ถูกต้อง: ${c1.toFixed(0)}%`;
      if (!isClose(safeFloat(formData.conv_meet_present), c2)) errors.conv_meet_present = `ที่ถูกต้อง: ${c2.toFixed(0)}%`;
      if (!isClose(safeFloat(formData.conv_present_close), c3)) errors.conv_present_close = `ที่ถูกต้อง: ${c3.toFixed(0)}%`;
      if (!isClose(safeFloat(formData.issue_rate), issue_rate)) errors.issue_rate = `ที่ถูกต้อง: ${issue_rate.toFixed(1)}%`;
    }

    if (Object.keys(errors).length > 0) isCorrect = false;
    setValidationResult({ isCorrect, errors });
  };

  // --- RENDER MAIN ---
  if (screen === 'loading') return <LoadingScreen onStart={() => setScreen('menu')} />;
  
  if (screen === 'menu') return (
    <ModeSelectionScreen 
      onSelectMode={(m) => { setMode(m); setScreen('select_form'); }} 
    />
  );
  
  if (screen === 'select_form') return (
    <FormSelectionScreen 
      mode={mode}
      onSelectForm={startForm}
      onBack={() => setScreen('menu')}
    />
  );

  // --- FORM RENDER ---
  const isTraining = mode === 'training';
  const isCalc = mode === 'calculator';

  return (
    <div style={styles.appContainer}>
      {/* Top Navbar */}
      <div style={styles.navbar}>
        <button onClick={() => setScreen('select_form')} style={styles.navButton}>
          <ArrowLeftIcon />
        </button>
        <div style={styles.navTitle}>
          <h1 style={styles.navTitleText}>{formType.replace(/([A-Z])/g, ' $1')}</h1>
          <p style={styles.navSubtitle}>
            {role} • {isTraining ? 'Training' : 'Calculator'}
          </p>
        </div>
        <div style={styles.navSpacer}></div>
      </div>

      {/* Scenario Box (Only for Training) */}
      {isTraining && scenario && (
        <div style={styles.scenarioBox}>
          <div style={styles.scenarioContent}>
            <div style={styles.scenarioHeader}>
              <div style={styles.scenarioIcon}>
                <BookOpenIcon />
              </div>
              <div style={styles.scenarioText}>
                <h3 style={styles.scenarioTitle}>Scenario / โจทย์</h3>
                <div style={styles.scenarioDetails}>
                  <p><span style={styles.scenarioLabel}>Target:</span> {scenario.target.toLocaleString()}</p>
                  
                  {(formType === FORM_TYPES.KEY_DRIVER || formType === FORM_TYPES.ACTION_PLAN) && (
                    <>
                      <div style={styles.scenarioGrid}>
                        <div style={styles.scenarioGroup}>
                          <p style={styles.groupTitleGreen}>Success Group</p>
                          <p>{scenario.successCount} คน</p>
                          <p>APE: {scenario.successAPE.toLocaleString()}/คน</p>
                        </div>
                        <div style={styles.scenarioGroup}>
                          <p style={styles.groupTitleRed}>Non-Success Group</p>
                          <p>{scenario.nonSuccessCount} คน</p>
                          <p>APE: {scenario.nonSuccessAPE.toLocaleString()}/คน</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {formType === FORM_TYPES.SALES_ACTIVITY && (
                    <div style={styles.salesScenario}>
                      <p>Lead: <span style={styles.bold}>{scenario.leads}</span></p>
                      <p>Meet: <span style={styles.bold}>{scenario.meets}</span></p>
                      <p>Present: <span style={styles.bold}>{scenario.presents}</span></p>
                      <p>Close: <span style={styles.bold}>{scenario.closes}</span></p>
                      <p style={styles.apeInfo}>
                        APE Issue: {scenario.apeIssue.toLocaleString()} | Submit: {scenario.apeSubmit.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
                <p style={styles.scenarioHint}>* กรุณากรอกข้อมูลในช่องว่างให้ถูกต้องตามโจทย์</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Content */}
      <div style={styles.formContainer}>
        
        {/* Basic Info Section */}
        <div style={styles.formSection}>
          <SectionHeader title="ข้อมูลพื้นฐาน" icon={Edit3Icon} />
          <div style={styles.formGrid2}>
            <InputField 
              label="ชื่อพนักงาน" 
              placeholder="ชื่อ-สกุล" 
              variant={isTraining ? 'default' : 'default'} 
              value={formData.name || ''} 
              onChange={e => handleInputChange('name', e.target.value)} 
            />
            <InputField 
              label="Zone" 
              placeholder="Zone" 
              variant={isTraining ? 'default' : 'default'} 
              value={formData.zone || ''} 
              onChange={e => handleInputChange('zone', e.target.value)} 
            />
            <div style={styles.fullWidth}>
              <InputField 
                label="Target (เป้าหมาย)" 
                type="number" 
                unit="บาท"
                value={formData.target || ''} 
                onChange={(e) => handleInputChange('target', e.target.value)}
                variant={isTraining ? 'readonly' : 'default'}
              />
            </div>
          </div>
        </div>

        {/* --- KEY DRIVER / ACTION PLAN FORM --- */}
        {(formType === FORM_TYPES.KEY_DRIVER || formType === FORM_TYPES.ACTION_PLAN) && (
          <>
            {/* Success Group */}
            <div style={styles.successSection}>
              <div style={styles.successBgIcon}></div>
              <h3 style={styles.successTitle}>
                <div style={styles.successIcon}>
                  <CheckCircleIcon color="#059669" />
                </div>
                กลุ่ม Success
              </h3>
              <div style={styles.formGrid2}>
                <InputField 
                  label="จำนวนคน" 
                  type="number" 
                  unit="คน"
                  value={formData.success_count || ''} 
                  onChange={(e) => handleInputChange('success_count', e.target.value)} 
                  variant={isTraining ? 'readonly' : 'default'}
                />
                <InputField 
                  label="% ของคนทั้งหมด" 
                  type="number" 
                  unit="%"
                  value={formData.success_percent || ''} 
                  onChange={(e) => handleInputChange('success_percent', e.target.value)} 
                  variant={isCalc ? 'calculated' : 'default'}
                  highlight={validationResult?.errors?.success_percent}
                />
                <InputField 
                  label="APE / คน" 
                  type="number"
                  value={formData.success_ape_per_head || ''} 
                  onChange={(e) => handleInputChange('success_ape_per_head', e.target.value)} 
                  variant={isTraining ? 'readonly' : 'default'}
                />
                <InputField 
                  label="Total APE (Success)" 
                  type="number"
                  value={formData.success_total_ape || ''} 
                  onChange={(e) => handleInputChange('success_total_ape', e.target.value)} 
                  variant={isCalc ? 'calculated' : 'default'}
                  highlight={validationResult?.errors?.success_total_ape}
                />
              </div>
            </div>

            {/* Non-Success Group */}
            <div style={styles.nonSuccessSection}>
              <div style={styles.nonSuccessBgIcon}></div>
              <h3 style={styles.nonSuccessTitle}>
                <div style={styles.nonSuccessIcon}>
                  <AlertCircleIcon color="#dc2626" />
                </div>
                กลุ่ม Non-Success
              </h3>
              <div style={styles.formGrid2}>
                <InputField 
                  label="จำนวนคน" 
                  type="number" 
                  unit="คน"
                  value={formData.nonsuccess_count || ''} 
                  onChange={(e) => handleInputChange('nonsuccess_count', e.target.value)} 
                  variant={isTraining ? 'readonly' : 'default'}
                />
                <InputField 
                  label="% ของคนทั้งหมด" 
                  type="number" 
                  unit="%"
                  value={formData.nonsuccess_percent || ''} 
                  onChange={(e) => handleInputChange('nonsuccess_percent', e.target.value)} 
                  variant={isCalc ? 'calculated' : 'default'}
                />
                <InputField 
                  label="APE / คน" 
                  type="number"
                  value={formData.nonsuccess_ape_per_head || ''} 
                  onChange={(e) => handleInputChange('nonsuccess_ape_per_head', e.target.value)} 
                  variant={isTraining ? 'readonly' : 'default'}
                />
                <InputField 
                  label="Total APE (Non-Success)" 
                  type="number"
                  value={formData.nonsuccess_total_ape || ''} 
                  onChange={(e) => handleInputChange('nonsuccess_total_ape', e.target.value)} 
                  variant={isCalc ? 'calculated' : 'default'}
                  highlight={validationResult?.errors?.nonsuccess_total_ape}
                />
              </div>
            </div>

            {/* Summary */}
            <div style={styles.summarySection}>
              <SectionHeader title="สรุปผลรวม" color="blue" icon={ZapIcon} />
              <div style={styles.summaryContent}>
                <InputField 
                  label="Total APE (รวมทั้งหมด)" 
                  type="number"
                  value={formData.total_ape || ''} 
                  onChange={(e) => handleInputChange('total_ape', e.target.value)} 
                  variant={isCalc ? 'calculated' : 'default'}
                  highlight={validationResult?.errors?.total_ape}
                />
                <InputField 
                  label="% ACH Target" 
                  type="number" 
                  unit="%"
                  value={formData.ach_target_percent || ''} 
                  onChange={(e) => handleInputChange('ach_target_percent', e.target.value)} 
                  variant={isCalc ? 'calculated' : 'default'}
                  highlight={validationResult?.errors?.ach_target_percent}
                />
              </div>
            </div>
          </>
        )}

        {/* --- SALES ACTIVITY FORM --- */}
        {formType === FORM_TYPES.SALES_ACTIVITY && (
          <>
            <div style={styles.formSection}>
              <SectionHeader title="ผลลัพธ์ (APE)" icon={ZapIcon} />
              <div style={styles.apeGrid}>
                <div style={styles.apeRow}>
                  <div style={styles.apeField}>
                    <InputField 
                      label="APE Issue" 
                      type="number" 
                      value={formData.ape_issue || ''} 
                      onChange={(e) => handleInputChange('ape_issue', e.target.value)} 
                      variant={isTraining ? 'readonly' : 'default'}
                    />
                  </div>
                  <div style={styles.apeField}>
                    <InputField 
                      label="APE Submit" 
                      type="number" 
                      value={formData.ape_submit || ''} 
                      onChange={(e) => handleInputChange('ape_submit', e.target.value)} 
                      variant={isTraining ? 'readonly' : 'default'}
                    />
                  </div>
                </div>
                <InputField 
                  label="Issue Rate (%)" 
                  type="number" 
                  unit="%"
                  value={formData.issue_rate || ''} 
                  onChange={(e) => handleInputChange('issue_rate', e.target.value)} 
                  variant={isCalc ? 'calculated' : 'default'}
                  highlight={validationResult?.errors?.issue_rate}
                />
                <InputField 
                  label="เบี้ยฯ เฉลี่ย / Case" 
                  type="number"
                  value={formData.avg_premium || ''} 
                  onChange={(e) => handleInputChange('avg_premium', e.target.value)} 
                  variant={isCalc ? 'calculated' : (isTraining ? 'readonly' : 'default')}
                />
              </div>
            </div>

            <div style={styles.formSection}>
              <SectionHeader title="Sales Funnel Conversion" color="indigo" icon={RefreshCwIcon} />
              <div style={styles.funnelContainer}>
                <div style={styles.funnelLine}></div>
                
                {/* Step 1 */}
                <div style={styles.funnelStep}>
                  <div style={styles.stepCircle}>
                    <span style={styles.stepLabel}>Step</span>
                    <span style={styles.stepNumber}>1</span>
                  </div>
                  <div style={styles.stepInput}>
                    <InputField 
                      label="Lead (ราย)" 
                      type="number" 
                      value={formData.leads || ''} 
                      onChange={(e) => handleInputChange('leads', e.target.value)} 
                      variant={isTraining ? 'readonly' : 'default'} 
                    />
                  </div>
                </div>

                {/* Conversion 1-2 */}
                <div style={styles.conversionStep}>
                  <div style={styles.conversionIcon}>
                    <ChevronDownIcon />
                  </div>
                  <div style={styles.conversionInput}>
                    <div style={styles.conversionBox}>
                      <span style={styles.conversionLabel}>Conv. Rate</span>
                      <input 
                        type="number"
                        inputMode="decimal"
                        placeholder="%"
                        style={{
                          ...styles.conversionField,
                          ...(validationResult?.errors?.conv_lead_meet ? styles.conversionError : {})
                        }}
                        value={formData.conv_lead_meet || ''} 
                        onChange={(e) => handleInputChange('conv_lead_meet', e.target.value)} 
                        readOnly={isCalc}
                      />
                      <span style={styles.conversionUnit}>%</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={styles.funnelStep}>
                  <div style={styles.stepCircle}>
                    <span style={styles.stepLabel}>Step</span>
                    <span style={styles.stepNumber}>2</span>
                  </div>
                  <div style={styles.stepInput}>
                    <InputField 
                      label="ได้พบ (ราย)" 
                      type="number" 
                      value={formData.meets || ''} 
                      onChange={(e) => handleInputChange('meets', e.target.value)} 
                      variant={isTraining ? 'readonly' : 'default'} 
                    />
                  </div>
                </div>

                {/* Conversion 2-3 */}
                <div style={styles.conversionStep}>
                  <div style={styles.conversionIcon}>
                    <ChevronDownIcon />
                  </div>
                  <div style={styles.conversionInput}>
                    <div style={styles.conversionBox}>
                      <span style={styles.conversionLabel}>Conv. Rate</span>
                      <input 
                        type="number"
                        inputMode="decimal"
                        placeholder="%"
                        style={{
                          ...styles.conversionField,
                          ...(validationResult?.errors?.conv_meet_present ? styles.conversionError : {})
                        }}
                        value={formData.conv_meet_present || ''} 
                        onChange={(e) => handleInputChange('conv_meet_present', e.target.value)} 
                        readOnly={isCalc}
                      />
                      <span style={styles.conversionUnit}>%</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={styles.funnelStep}>
                  <div style={styles.stepCircle}>
                    <span style={styles.stepLabel}>Step</span>
                    <span style={styles.stepNumber}>3</span>
                  </div>
                  <div style={styles.stepInput}>
                    <InputField 
                      label="นำเสนอ (ราย)" 
                      type="number" 
                      value={formData.presents || ''} 
                      onChange={(e) => handleInputChange('presents', e.target.value)} 
                      variant={isTraining ? 'readonly' : 'default'} 
                    />
                  </div>
                </div>

                {/* Conversion 3-4 */}
                <div style={styles.conversionStep}>
                  <div style={styles.conversionIcon}>
                    <ChevronDownIcon />
                  </div>
                  <div style={styles.conversionInput}>
                    <div style={styles.conversionBox}>
                      <span style={styles.conversionLabel}>Closing Rate</span>
                      <input 
                        type="number"
                        inputMode="decimal"
                        placeholder="%"
                        style={{
                          ...styles.conversionField,
                          ...(validationResult?.errors?.conv_present_close ? styles.conversionError : {})
                        }}
                        value={formData.conv_present_close || ''} 
                        onChange={(e) => handleInputChange('conv_present_close', e.target.value)} 
                        readOnly={isCalc}
                      />
                      <span style={styles.conversionUnit}>%</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div style={styles.funnelStep}>
                  <div style={styles.stepCircleClose}>
                    <span style={styles.stepLabelClose}>Step</span>
                    <span style={styles.stepNumberClose}>4</span>
                  </div>
                  <div style={styles.stepInput}>
                    <InputField 
                      label="ปิดการขาย (ราย)" 
                      type="number" 
                      value={formData.closes || ''} 
                      onChange={(e) => handleInputChange('closes', e.target.value)} 
                      variant={isTraining ? 'readonly' : 'default'} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Bar (Fixed Bottom) */}
      <div style={styles.actionBar}>
        <div style={styles.actionContent}>
          {isTraining ? (
            <button 
              onClick={validateTraining}
              style={styles.validateButton}
            >
              <CheckCircleIcon color="white" />
              <span style={styles.buttonText}>ตรวจคำตอบ</span>
            </button>
          ) : (
            <button 
              onClick={() => alert("ข้อมูลถูกบันทึกเรียบร้อยแล้ว (Demo)")}
              style={styles.saveButton}
            >
              <SaveIcon />
              <span style={styles.buttonText}>บันทึก</span>
            </button>
          )}
          
          <button 
            onClick={() => { 
              if(window.confirm('ต้องการล้างค่าทั้งหมด?')) setFormData({}); 
            }} 
            style={styles.resetButton}
            title="Reset"
          >
            <RefreshCwIcon />
          </button>
        </div>
      </div>

      {/* Validation Modal (Popup) */}
      {validationResult && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={{
              ...styles.modalHeader,
              backgroundColor: validationResult.isCorrect ? '#10b981' : '#ef4444'
            }}></div>
            
            <div style={styles.modalIcon}>
              {validationResult.isCorrect ? (
                <div style={styles.successModalIcon}>
                  <CheckCircleIcon color="#059669" />
                </div>
              ) : (
                <div style={styles.errorModalIcon}>
                  <AlertCircleIcon color="#dc2626" />
                </div>
              )}
            </div>
            
            <h3 style={{
              ...styles.modalTitle,
              color: validationResult.isCorrect ? '#059669' : '#dc2626'
            }}>
              {validationResult.isCorrect ? 'ยอดเยี่ยม! ถูกต้อง' : 'ยังไม่ถูกต้อง'}
            </h3>
            <p style={styles.modalText}>
              {validationResult.isCorrect ? 'คุณคำนวณได้อย่างแม่นยำ' : 'ลองตรวจสอบจุดที่ผิดแล้วแก้ไขอีกครั้ง'}
            </p>
            
            {!validationResult.isCorrect && (
              <div style={styles.errorList}>
                <p style={styles.errorListTitle}>
                  <Edit3Icon />
                  จุดที่ต้องแก้ไข:
                </p>
                <ul style={styles.errorItems}>
                  {Object.entries(validationResult.errors).map(([key, msg]) => (
                    <li key={key} style={styles.errorItem}>
                      <span style={styles.errorDot}></span>
                      <span>{msg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button 
              onClick={() => setValidationResult(null)}
              style={{
                ...styles.modalButton,
                backgroundColor: validationResult.isCorrect ? '#059669' : '#1f2937'
              }}
            >
              {validationResult.isCorrect ? 'ทำข้อต่อไป' : 'กลับไปแก้ไข'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- STYLES ---
const styles = {
  // Loading Screen Styles
  loadingScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #002d63 0%, #005099 100%)',
    color: 'white',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden'
  },
  loadingBgCircle1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '256px',
    height: '256px',
    backgroundColor: 'white',
    opacity: 0.05,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(48px)'
  },
  loadingBgCircle2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '384px',
    height: '384px',
    backgroundColor: '#f97316',
    opacity: 0.1,
    borderRadius: '50%',
    transform: 'translate(33%, 33%)',
    filter: 'blur(48px)'
  },
  loadingContent: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoContainer: {
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  logoText: {
    color: '#002d63',
    fontWeight: 'bold',
    fontSize: '36px',
    letterSpacing: '-0.025em'
  },
  loadingTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '8px',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  loadingSubtitle: {
    color: '#bfdbfe',
    marginBottom: '48px',
    textAlign: 'center',
    fontWeight: 300,
    letterSpacing: '0.05em'
  },
  progressContainer: {
    width: '256px'
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#1e3a8a',
    opacity: 0.3,
    borderRadius: '9999px',
    overflow: 'hidden',
    backdropFilter: 'blur(4px)'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(to right, #f97316, #ea580c)',
    transition: 'width 0.3s ease-in-out'
  },
  progressText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#93c5fd',
    opacity: 0.8,
    marginTop: '8px'
  },
  startButton: {
    marginTop: '64px',
    background: 'linear-gradient(to right, #f97316, #ea580c)',
    color: 'white',
    fontWeight: 'bold',
    padding: '16px 40px',
    borderRadius: '9999px',
    boxShadow: '0 10px 25px rgba(249, 115, 22, 0.2)',
    transform: 'transition',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '18px',
    zIndex: 50
  },
  startButtonText: {
    fontSize: '18px'
  },
  versionText: {
    position: 'absolute',
    bottom: '24px',
    fontSize: '10px',
    color: '#93c5fd',
    opacity: 0.6,
    fontFamily: 'monospace'
  },

  // Input Field Styles
  inputContainer: {
    marginBottom: '16px'
  },
  inputLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    marginBottom: '6px',
    marginLeft: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  inputWrapper: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid',
    borderRadius: '12px',
    transition: 'all 0.2s',
    outline: 'none',
    fontWeight: 500,
    fontSize: '16px'
  },
  inputDefault: {
    backgroundColor: 'white',
    color: '#1f2937',
    borderColor: '#d1d5db'
  },
  inputReadonly: {
    backgroundColor: '#f8fafc',
    color: '#64748b',
    borderColor: '#e2e8f0',
    cursor: 'not-allowed',
    userSelect: 'none'
  },
  inputCalculated: {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    borderColor: '#dbeafe',
    fontWeight: 'bold',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
  },
  inputHighlight: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    animation: 'shake 0.4s ease-in-out'
  },
  inputSuffix: {
    position: 'absolute',
    right: '12px',
    top: '12px',
    color: '#9ca3af',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  unitText: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6b7280'
  },

  // Section Header Styles
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    marginTop: '24px',
    paddingBottom: '8px',
    borderBottomWidth: '2px'
  },
  sectionHeaderBlue: {
    borderBottomColor: '#dbeafe'
  },
  sectionHeaderGreen: {
    borderBottomColor: '#d1fae5'
  },
  sectionHeaderRed: {
    borderBottomColor: '#fee2e2'
  },
  sectionTitle: {
    color: '#1e3a8a',
    fontWeight: 'bold',
    fontSize: '18px'
  },

  // Mode Selection Screen Styles
  modeScreen: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '80px'
  },
  modeContent: {
    width: '100%',
    maxWidth: '448px',
    marginTop: '32px'
  },
  modeHeader: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  modeTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e3a8a'
  },
  modeSubtitle: {
    color: '#6b7280'
  },
  modeButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  modeButton: {
    width: '100%',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #fed7aa',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'left'
  },
  modeButtonLeftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '8px',
    backgroundColor: '#f97316'
  },
  modeButtonLeftBorderBlue: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '8px',
    backgroundColor: '#2563eb'
  },
  modeIconOrange: {
    backgroundColor: '#ffedd5',
    padding: '16px',
    borderRadius: '9999px',
    color: '#ea580c'
  },
  modeIconBlue: {
    backgroundColor: '#dbeafe',
    padding: '16px',
    borderRadius: '9999px',
    color: '#2563eb'
  },
  modeButtonContent: {
    flex: 1
  },
  modeButtonTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  modeButtonDesc: {
    fontSize: '14px',
    color: '#6b7280'
  },

  // Passcode Screen Styles
  passcodeScreen: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  },
  passcodeCard: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '384px'
  },
  passcodeTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '24px',
    textAlign: 'center'
  },
  passcodeIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  passcodeInput: {
    width: '100%',
    textAlign: 'center',
    fontSize: '32px',
    letterSpacing: '0.5em',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '8px',
    outline: 'none'
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '24px',
    height: '20px'
  },
  passcodeButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  cancelButton: {
    padding: '12px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    borderRadius: '12px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer'
  },
  confirmButton: {
    padding: '12px',
    color: 'white',
    backgroundColor: '#2563eb',
    borderRadius: '12px',
    fontWeight: 'bold',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
    border: 'none',
    cursor: 'pointer'
  },

  // Form Selection Screen Styles
  formScreen: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '24px'
  },
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    paddingTop: '16px'
  },
  backButton: {
    padding: '12px',
    marginRight: '16px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer'
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1e3a8a',
    lineHeight: '1.2'
  },
  formSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    textTransform: 'capitalize'
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '448px',
    margin: '0 auto'
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    border: '1px solid #f1f5f9'
  },
  formCardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
    borderLeft: '4px solid #f97316',
    paddingLeft: '12px'
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px'
  },
  roleButton: {
    fontSize: '14px',
    padding: '10px 12px',
    backgroundColor: '#f8fafc',
    color: '#475569',
    borderRadius: '8px',
    fontWeight: 500,
    border: '1px solid #e2e8f0',
    cursor: 'pointer'
  },

  // Main App Styles
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    paddingBottom: '128px'
  },
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    color: '#1e3a8a',
    padding: '16px',
    position: 'sticky',
    top: 0,
    zIndex: 20,
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '672px',
    margin: '0 auto'
  },
  navButton: {
    padding: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer'
  },
  navTitle: {
    textAlign: 'center'
  },
  navTitleText: {
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '1'
  },
  navSubtitle: {
    fontSize: '10px',
    color: '#6b7280',
    marginTop: '4px',
    fontWeight: 500,
    backgroundColor: '#f3f4f6',
    padding: '2px 8px',
    borderRadius: '9999px',
    display: 'inline-block'
  },
  navSpacer: {
    width: '32px'
  },

  // Scenario Box Styles
  scenarioBox: {
    background: 'linear-gradient(to right, #fffbeb, white)',
    padding: '20px',
    borderBottom: '1px solid #fed7aa',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
  },
  scenarioContent: {
    maxWidth: '672px',
    margin: '0 auto'
  },
  scenarioHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  scenarioIcon: {
    backgroundColor: '#ffedd5',
    padding: '8px',
    borderRadius: '8px',
    color: '#ea580c',
    marginTop: '4px'
  },
  scenarioText: {
    flex: 1
  },
  scenarioTitle: {
    fontWeight: 'bold',
    color: '#c2410c',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px'
  },
  scenarioDetails: {
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #fed7aa',
    fontSize: '14px',
    color: '#374151'
  },
  scenarioLabel: {
    fontWeight: 600,
    color: '#1f2937'
  },
  scenarioGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid #f3f4f6'
  },
  scenarioGroup: {
    padding: '4px'
  },
  groupTitleGreen: {
    fontSize: '12px',
    color: '#059669',
    fontWeight: 'bold'
  },
  groupTitleRed: {
    fontSize: '12px',
    color: '#dc2626',
    fontWeight: 'bold'
  },
  salesScenario: {
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid #f3f4f6',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '4px 16px',
    fontSize: '12px'
  },
  bold: {
    fontWeight: 'bold'
  },
  apeInfo: {
    gridColumn: 'span 2',
    marginTop: '4px',
    paddingTop: '4px',
    borderTop: '1px dashed #d1d5db'
  },
  scenarioHint: {
    fontSize: '12px',
    color: '#ea580c',
    fontStyle: 'italic',
    marginTop: '8px'
  },

  // Form Container Styles
  formContainer: {
    padding: '16px',
    maxWidth: '672px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  formSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9'
  },
  formGrid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  fullWidth: {
    gridColumn: 'span 2'
  },

  // Success Section Styles
  successSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    borderLeft: '4px solid #10b981',
    position: 'relative',
    overflow: 'hidden'
  },
  successBgIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '8px',
    opacity: 0.05
  },
  successTitle: {
    color: '#059669',
    fontWeight: 'bold',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: 10,
    fontSize: '18px'
  },
  successIcon: {
    backgroundColor: '#d1fae5',
    padding: '6px',
    borderRadius: '8px'
  },

  // Non-Success Section Styles
  nonSuccessSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    borderLeft: '4px solid #ef4444',
    position: 'relative',
    overflow: 'hidden'
  },
  nonSuccessBgIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '8px',
    opacity: 0.05
  },
  nonSuccessTitle: {
    color: '#dc2626',
    fontWeight: 'bold',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: 10,
    fontSize: '18px'
  },
  nonSuccessIcon: {
    backgroundColor: '#fee2e2',
    padding: '6px',
    borderRadius: '8px'
  },

  // Summary Section Styles
  summarySection: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #dbeafe'
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  // Sales Activity Styles
  apeGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  apeRow: {
    display: 'flex',
    gap: '16px'
  },
  apeField: {
    flex: 1
  },

  // Funnel Styles
  funnelContainer: {
    position: 'relative'
  },
  funnelLine: {
    position: 'absolute',
    left: '26px',
    top: '24px',
    bottom: '24px',
    width: '2px',
    backgroundColor: '#e5e7eb',
    zIndex: 0
  },
  funnelStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
    zIndex: 10
  },
  stepCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    backgroundColor: '#eff6ff',
    border: '2px solid #dbeafe',
    color: '#1e40af',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  stepLabel: {
    fontSize: '10px',
    color: '#60a5fa',
    textTransform: 'uppercase'
  },
  stepNumber: {
    fontSize: '20px',
    lineHeight: '1'
  },
  stepInput: {
    flex: 1
  },
  stepCircleClose: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
  },
  stepLabelClose: {
    fontSize: '10px',
    color: '#a7f3d0',
    textTransform: 'uppercase'
  },
  stepNumberClose: {
    fontSize: '20px',
    lineHeight: '1'
  },
  conversionStep: {
    display: 'flex',
    margin: '8px 0'
  },
  conversionIcon: {
    width: '56px',
    display: 'flex',
    justifyContent: 'center'
  },
  conversionInput: {
    flex: 1,
    paddingLeft: '12px'
  },
  conversionBox: {
    backgroundColor: '#fffbeb',
    borderRadius: '8px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #fde68a'
  },
  conversionLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#c2410c',
    whiteSpace: 'nowrap'
  },
  conversionField: {
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid #fbbf24',
    borderRadius: '4px',
    padding: '4px 8px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#92400e',
    outline: 'none'
  },
  conversionError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2'
  },
  conversionUnit: {
    fontSize: '12px',
    color: '#f59e0b'
  },

  // Action Bar Styles
  actionBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTop: '1px solid #e5e7eb',
    padding: '16px',
    paddingBottom: '24px',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
    zIndex: 30
  },
  actionContent: {
    maxWidth: '672px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    gap: '12px'
  },
  validateButton: {
    flex: 1,
    background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
    color: 'white',
    fontWeight: 'bold',
    padding: '14px 16px',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    cursor: 'pointer'
  },
  saveButton: {
    flex: 1,
    background: 'linear-gradient(to right, #10b981, #059669)',
    color: 'white',
    fontWeight: 'bold',
    padding: '14px 16px',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    cursor: 'pointer'
  },
  resetButton: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: '16px'
  },

  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 50
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '32px',
    width: '100%',
    maxWidth: '384px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    overflow: 'hidden'
  },
  modalHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '8px'
  },
  modalIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  successModalIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#d1fae5',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#059669'
  },
  errorModalIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#fee2e2',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#dc2626'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '8px'
  },
  modalText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '24px'
  },
  errorList: {
    backgroundColor: '#fef2f2',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#991b1b',
    marginBottom: '24px',
    maxHeight: '192px',
    overflowY: 'auto',
    border: '1px solid #fecaca'
  },
  errorListTitle: {
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  errorItems: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  errorItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '12px'
  },
  errorDot: {
    minWidth: '6px',
    height: '6px',
    borderRadius: '9999px',
    backgroundColor: '#ef4444',
    marginTop: '4px'
  },
  modalButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer'
  }
};
