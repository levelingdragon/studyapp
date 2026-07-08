import { useEffect, useMemo, useState } from 'react';
import { demoCourses, demoLectures, demoNotes, stats } from './data/demoData';

const STORAGE_KEY = 'studyapp-user';

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [form, setForm] = useState({ name: '', email: '', password: '', remember: true });
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const timer = window.setTimeout(() => setIsSplashVisible(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const handleAuth = (event) => {
    event.preventDefault();
    const nextUser = {
      name: form.name || 'Aarav Patel',
      email: form.email || 'aarav@example.com',
      course: 'B.Tech Computer Science',
      streak: 7,
      target: 'GATE 2026',
    };
    setUser(nextUser);
  };

  const profileSummary = useMemo(() => {
    if (!user) return null;
    return {
      label: `${user.name} • ${user.course}`,
      detail: `${user.target} • ${user.streak} day streak`,
    };
  }, [user]);

  if (isSplashVisible) {
    return (
      <div className="app-shell splash-screen">
        <div className="glow" />
        <div className="card splash-card">
          <div className="badge">Offline • Premium</div>
          <h1>Engineering Study App</h1>
          <p>Learn faster with local-first notes, lectures, quizzes, and progress tracking.</p>
          <div className="loader" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-shell auth-screen">
        <div className="auth-card">
          <div className="auth-header">
            <span className="badge">Client-side demo</span>
            <h1>Welcome back</h1>
            <p>Sign in to continue your engineering study journey.</p>
          </div>
          <div className="tab-row">
            <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>
              Login
            </button>
            <button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>
              Sign up
            </button>
          </div>
          <form onSubmit={handleAuth} className="auth-form">
            {authMode === 'signup' && (
              <input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={() => setForm({ ...form, remember: !form.remember })}
              />
              Keep me signed in locally
            </label>
            <button className="primary-btn" type="submit">
              {authMode === 'login' ? 'Continue' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Courses':
        return (
          <>
            <section className="section-block">
              <div className="section-title">
                <h4>All courses</h4>
                <span className="pill">4 curated tracks</span>
              </div>
              <div className="card-grid">
                {demoCourses.map((course) => (
                  <article className="course-card" key={course.id} style={{ background: course.color }}>
                    <div className="course-top">
                      <span>{course.category}</span>
                      <span>{course.rating}★</span>
                    </div>
                    <h5>{course.title}</h5>
                    <p>{course.lessons} lessons • {course.duration}</p>
                    <div className="progress-bar">
                      <div style={{ width: `${course.progress}%` }} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section className="section-block">
              <div className="section-title">
                <h4>Study paths</h4>
                <a href="#">See roadmap</a>
              </div>
              <div className="list-card">
                {['GATE Prep', 'Semester Revision', 'Interview Sprint'].map((path) => (
                  <div className="list-item" key={path}>
                    <div>
                      <strong>{path}</strong>
                      <p>Structured weekly plan ready locally</p>
                    </div>
                    <span>→</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
      case 'Search':
        return (
          <section className="section-block">
            <div className="section-title">
              <h4>Search everything</h4>
              <span className="pill">Local demo</span>
            </div>
            <div className="list-card">
              <div className="list-item">
                <div>
                  <strong>Search notes</strong>
                  <p>Find revision sheets, cheat notes, and summaries</p>
                </div>
                <span>🔎</span>
              </div>
              <div className="list-item">
                <div>
                  <strong>Search lectures</strong>
                  <p>Jump into any recorded lesson instantly</p>
                </div>
                <span>▶</span>
              </div>
              <div className="list-item">
                <div>
                  <strong>Search courses</strong>
                  <p>Browse engineering subjects and modules</p>
                </div>
                <span>📚</span>
              </div>
            </div>
          </section>
        );
      case 'Profile':
        return (
          <section className="section-block">
            <div className="section-title">
              <h4>Profile</h4>
              <span className="pill">Offline ready</span>
            </div>
            <div className="list-card">
              <div className="list-item">
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.course}</p>
                </div>
                <span>👤</span>
              </div>
              <div className="list-item">
                <div>
                  <strong>Target exam</strong>
                  <p>{user.target}</p>
                </div>
                <span>🎯</span>
              </div>
              <div className="list-item">
                <div>
                  <strong>Current streak</strong>
                  <p>{user.streak} days of focused study</p>
                </div>
                <span>🔥</span>
              </div>
              <div className="list-item">
                <div>
                  <strong>Logout</strong>
                  <p>Clear this local session</p>
                </div>
                <button className="primary-btn small" onClick={() => setUser(null)}>
                  Sign out
                </button>
              </div>
            </div>
          </section>
        );
      case 'Home':
      default:
        return (
          <>
            <section className="hero-card">
              <div>
                <p className="eyebrow">Daily focus</p>
                <h3>Stay consistent with 45 minutes of revision.</h3>
                <p className="muted">Your local schedule and notes are ready offline.</p>
              </div>
              <button className="primary-btn small">Start session</button>
            </section>

            <section className="stats-grid">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </section>

            <section className="section-block">
              <div className="section-title">
                <h4>Recommended courses</h4>
                <a href="#">View all</a>
              </div>
              <div className="card-grid">
                {demoCourses.map((course) => (
                  <article className="course-card" key={course.id} style={{ background: course.color }}>
                    <div className="course-top">
                      <span>{course.category}</span>
                      <span>{course.rating}★</span>
                    </div>
                    <h5>{course.title}</h5>
                    <p>{course.lessons} lessons • {course.duration}</p>
                    <div className="progress-bar">
                      <div style={{ width: `${course.progress}%` }} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-block">
              <div className="section-title">
                <h4>Recent notes</h4>
                <a href="#">Open library</a>
              </div>
              <div className="list-card">
                {demoNotes.map((note) => (
                  <div className="list-item" key={note.id}>
                    <div>
                      <strong>{note.title}</strong>
                      <p>{note.category} • {note.pages} pages</p>
                    </div>
                    <span>{note.bookmarked ? '★' : '☆'}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-block">
              <div className="section-title">
                <h4>Continue learning</h4>
                <a href="#">More</a>
              </div>
              <div className="list-card">
                {demoLectures.map((lecture) => (
                  <div className="list-item" key={lecture.id}>
                    <div>
                      <strong>{lecture.title}</strong>
                      <p>{lecture.duration} • {lecture.progress}% watched</p>
                    </div>
                    <span>{lecture.bookmarked ? '🔖' : '➕'}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="app-shell dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">Good evening</p>
          <h2>{user.name}</h2>
        </div>
        <div className="pill">{profileSummary?.detail}</div>
      </header>

      {renderContent()}

      <nav className="bottom-nav">
        {['Home', 'Courses', 'Search', 'Profile'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
