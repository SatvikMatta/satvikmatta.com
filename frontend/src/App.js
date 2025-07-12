import { useState, useEffect } from 'react';
import './App.css';
import ProfileCard from './ProfileCard';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const PRIMARY_API_URL = process.env.NODE_ENV === 'production' 
        ? 'https://www.satvikmatta.com/api' 
        : 'http://localhost:8000/api';
      
      
      const FALLBACK_API_URL = 'https://fourth-physics-422720-p2.uk.r.appspot.com/api';

      const fetchWithFallback = async (endpoint) => {
        try {
          // Create a timeout promise
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), 3000)
          );

          // Try primary API first with 3-second timeout
          const response = await Promise.race([
            fetch(`${PRIMARY_API_URL}${endpoint}`),
            timeoutPromise
          ]);
          
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(`Primary API failed or timed out for ${endpoint}, trying fallback...`);
          // If primary fails or times out, try fallback
          const fallbackResponse = await fetch(`${FALLBACK_API_URL}${endpoint}`);
          return await fallbackResponse.json();
        }
      };

      const [projectsData, skillsData, experienceData] = await Promise.all([
        fetchWithFallback('/projects/'),
        fetchWithFallback('/skills/'),
        fetchWithFallback('/experience/')
      ]);

      setProjects(projectsData);
      setSkills(skillsData);
      setExperience(experienceData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data from both APIs:', error);
      setIsLoading(false);
    }
  };

  const TypewriterText = ({ text, delay = 100 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        // Hide cursor after typing is complete
        const timeout = setTimeout(() => {
          setShowCursor(false);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, delay, text]);

    return <span>{displayText}{showCursor && <span className="cursor">|</span>}</span>;
  };

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count}</span>;
  };

  const GlowingButton = ({ children, href, primary = false }) => (
    <a 
      href={href} 
      className={`glowing-btn ${primary ? 'primary' : 'secondary'}`}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = primary 
          ? '0 10px 25px rgba(52, 152, 219, 0.4)' 
          : '0 10px 25px rgba(155, 89, 182, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = primary 
          ? '0 5px 15px rgba(52, 152, 219, 0.3)' 
          : '0 5px 15px rgba(155, 89, 182, 0.3)';
      }}
    >
      {children}
    </a>
  );

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="#hero" className="logo-text">Satvik Matta</a>
          </div>
          <ul className="nav-menu">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-background">
          <div className="tech-grid">
            <div className="grid-line grid-line-vertical" style={{left: '10%'}}></div>
            <div className="grid-line grid-line-vertical" style={{left: '25%'}}></div>
            <div className="grid-line grid-line-vertical" style={{left: '50%'}}></div>
            <div className="grid-line grid-line-vertical" style={{left: '75%'}}></div>
            <div className="grid-line grid-line-vertical" style={{left: '90%'}}></div>
            <div className="grid-line grid-line-horizontal" style={{top: '20%'}}></div>
            <div className="grid-line grid-line-horizontal" style={{top: '40%'}}></div>
            <div className="grid-line grid-line-horizontal" style={{top: '60%'}}></div>
            <div className="grid-line grid-line-horizontal" style={{top: '80%'}}></div>
          </div>
          <div className="floating-code">
            <div className="code-snippet code-1">
              <span className="code-keyword">const</span> <span className="code-variable">developer</span> = <span className="code-string">"Satvik"</span>;
            </div>
            <div className="code-snippet code-2">
              <span className="code-keyword">function</span> <span className="code-function">innovate</span>() {'{'}
            </div>
            <div className="code-snippet code-3">
              <span className="code-keyword">return</span> <span className="code-string">"solutions"</span>;
            </div>
            <div className="code-snippet code-5">
              <span className="code-keyword">import</span> <span className="code-string">"AI"</span> <span className="code-keyword">from</span> <span className="code-string">"future"</span>;
            </div>
            <div className="code-snippet code-6">
              <span className="code-keyword">class</span> <span className="code-function">Engineer</span> {'{'}
            </div>
            <div className="code-snippet code-7">
              <span className="code-variable">skills</span>: [<span className="code-string">"Python"</span>, <span className="code-string">"ML"</span>]
            </div>
            <div className="code-snippet code-9">
              <span className="code-keyword">async</span> <span className="code-function">solve</span>(<span className="code-variable">problem</span>)
            </div>
            <div className="code-snippet code-10">
              <span className="code-keyword">npm</span> <span className="code-function">install</span> <span className="code-string">innovation</span>
            </div>
            <div className="code-snippet code-11">
              <span className="code-keyword">git</span> <span className="code-function">commit</span> -m <span className="code-string">"✨ magic"</span>
            </div>
            <div className="code-snippet code-13">
              <span className="code-keyword">docker</span> <span className="code-function">run</span> <span className="code-string">--gpu</span>
            </div>
            <div className="code-snippet code-14">
              <span className="code-variable">model</span>.<span className="code-function">compile</span>(<span className="code-string">"adam"</span>)
            </div>
            <div className="code-snippet code-16">
              <span className="code-keyword">from</span> <span className="code-string">sklearn</span> <span className="code-keyword">import</span> <span className="code-variable">*</span>
            </div>
            <div className="code-snippet code-17">
              <span className="code-keyword">while</span>(<span className="code-variable">learning</span>) {'{'}
            </div>
            <div className="code-snippet code-18">
              <span className="code-variable">cv2</span>.<span className="code-function">imread</span>(<span className="code-string">"data.jpg"</span>)
            </div>
            <div className="code-snippet code-19">
              <span className="code-keyword">export</span> <span className="code-keyword">default</span> <span className="code-variable">Innovation</span>
            </div>
            <div className="code-snippet code-22">
              <span className="code-variable">neural_net</span>.<span className="code-function">forward</span>()
            </div>
          </div>
          <div className="circuit-lines">
            <div className="circuit-line circuit-1"></div>
            <div className="circuit-line circuit-2"></div>
            <div className="circuit-line circuit-3"></div>
            <div className="circuit-line circuit-4"></div>
            <div className="circuit-line circuit-5"></div>
            <div className="circuit-line circuit-6"></div>
            <div className="circuit-line circuit-7"></div>
            <div className="circuit-line circuit-8"></div>
          </div>
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
            <div className="particle particle-7"></div>
            <div className="particle particle-8"></div>
            <div className="particle particle-9"></div>
            <div className="particle particle-10"></div>
          </div>
          <div className="matrix-rain">
            <div className="matrix-column matrix-col-1">01101</div>
            <div className="matrix-column matrix-col-2">11010</div>
            <div className="matrix-column matrix-col-3">00110</div>
            <div className="matrix-column matrix-col-4">10101</div>
            <div className="matrix-column matrix-col-5">01010</div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <TypewriterText text="Satvik Matta" delay={150} />
            </h1>
            <h2 className="hero-subtitle">
              <TypewriterText text="Innovator and Developer" delay={80} />
            </h2>
            <p className="hero-description">
              with a Passion for Artifical Intelligence and Embedded Systems
            </p>
          </div>
          <div className="hero-buttons">
            <GlowingButton href="#experience" primary={true}>
              View Resume
            </GlowingButton>
            <GlowingButton href="#about">
              Get In Touch
            </GlowingButton>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="about-content">
            <div className="about-left">
              <div className="about-text">
                <p>
                  I'm a Duke University student pursuing a BSE in Electrical and Computer Engineering 
                  and Computer Science. I'm passionate about AI, machine learning, and 
                  embedded systems, with hands-on experience in developing innovative solutions.
                </p>
                <p>
                  From building AI-powered mental health crisis response systems to developing 
                  5G modem analysis platforms, I love tackling challenging problems 
                  that make a real-world impact.
                </p>
              </div>
              <div className="skills-section">
                <h3 className="skills-title">Technical Skills</h3>
                <div className="skills-grid-compact">
                  {skills.map((skill, index) => (
                    <div 
                      key={skill.id} 
                      className="skill-card-compact"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="skill-info">
                        <div className="skill-icon">
                          {skill.name === 'Python' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />}
                          {skill.name === 'Java' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />}
                          {skill.name === 'C' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" />}
                          {skill.name === 'C++' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />}
                          {skill.name === 'Verilog' && <img src="https://www.svgrepo.com/show/374163/verilog.svg" alt="Verilog" />}
                          {skill.name === 'MIPS' && <img src="/static/MIPS.png" alt="MIPS" />}
                          {skill.name === 'Google Cloud Platform' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" alt="GCP" />}
                          {skill.name === 'PyTorch' && <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" />}
                          {!['Python', 'Java', 'C', 'C++', 'Verilog', 'MIPS', 'Google Cloud Platform', 'PyTorch'].includes(skill.name) && 
                            <div className="skill-letter">{skill.name.charAt(0)}</div>
                          }
                        </div>
                        <div className="skill-details">
                          <h4 className="skill-name">{skill.name}</h4>
                          <div className="skill-category">{skill.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-image">
              <ProfileCard />
              <div className="contact-section-compact">
                <h3 className="contact-title">Let's Connect</h3>
                <div className="contact-links-compact">
                  <a href="https://linkedin.com/in/satvikmatta" className="contact-card-compact">
                    <div className="contact-icon-compact contact-icon-logo">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
                    </div>
                    <div className="contact-info-compact">
                      <h4>LinkedIn</h4>
                      <p>linkedin.com/in/satvikmatta</p>
                    </div>
                  </a>
                  <a href="https://github.com/satvikmatta" className="contact-card-compact">
                    <div className="contact-icon-compact contact-icon-logo">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
                    </div>
                    <div className="contact-info-compact">
                      <h4>GitHub</h4>
                      <p>github.com/satvikmatta</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Professional Experience</h2>
          </div>
          <div className="timeline">
            {experience.map((exp, index) => (
              <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-date">
                    {exp.start_date} - {exp.end_date || 'Present'}
                  </div>
                  <h3 className="timeline-title">{exp.position}</h3>
                  <h4 className="timeline-company">{exp.company}</h4>
                  <p className="timeline-description">{exp.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-subtitle">Some of My Favorites ❤️</div>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="project-image">
                  {project.title.includes('TriCen') ? (
                    <img 
                      src="/static/TriCen.png" 
                      alt="TriCen AI Mental Health Crisis Response System"
                      className="project-img"
                    />
                  ) : project.title.includes('Fire Sentry') ? (
                    <img 
                      src="/static/Fire_Sentry.jpg" 
                      alt="Fire Sentry Wildfire Prediction System"
                      className="project-img"
                    />
                  ) : (
                    <div className="project-placeholder">
                      <span>{project.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    <span className="tech-tag">{project.technology}</span>
                  </div>
                  <div className="project-links">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                        GitHub
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;
