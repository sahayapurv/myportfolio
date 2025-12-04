import React, { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Linkedin, MapPin, Mail, Phone, ChevronUp, Lock, LayoutDashboard, FileText, User, Settings, LogOut, Globe, Share2, Plus, Trash2, Edit2, Save, RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { INITIAL_STATE } from './constants';
import { AppState, Post, ProfileData } from './types';

// --- Context & State Management ---

interface AppContextType {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('app_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem('app_state', JSON.stringify(state));
    // Apply theme
    if (state.settings.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const login = (password: string) => {
    // Mock password for demo
    if (password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <AppContext.Provider value={{ state, updateState, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Components ---

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'danger'; size?: 'sm' | 'md' }> = ({ 
  children, className = '', variant = 'primary', size = 'md', ...props 
}) => {
  const base = "rounded-md font-medium transition-all duration-200 flex items-center gap-2";
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2"
  };
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800",
    ghost: "text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800"
  };
  return (
    <button className={`${base} ${sizeStyles[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 ${className}`}>
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: boolean }> = ({ children, subtitle }) => (
  <div className="mb-8 md:mb-12 text-center">
    <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-3">{children}</h2>
    {subtitle && <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>}
  </div>
);

// --- Layout Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAppContext();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // { name: 'Posts', path: '/posts' },
    { name: 'Contact', path: '/contact' },
  ];

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="font-serif text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Dr. Sahay<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-blue-600' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link to="/admin" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
                <LayoutDashboard size={14} /> Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {link.name}
              </Link>
            ))}
            <Link 
               to="/admin" 
               className="block px-3 py-2 rounded-md text-base font-medium text-amber-600 hover:bg-amber-50"
               onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { state } = useAppContext();
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-serif font-bold mb-4">{state.profile.name}</h3>
            <p className="text-slate-400 max-w-sm">{state.profile.tagline}</p>
            <div className="flex gap-4 mt-6">
              <a href={state.profile.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${state.profile.email}`} className="text-slate-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-400">About Me</Link></li>
              <li><Link to="/posts" className="hover:text-blue-400">Publications & Posts</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-blue-400">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>{state.profile.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>{state.profile.email}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {state.profile.name}. All rights reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-4 md:mt-0 flex items-center gap-1 hover:text-white">
            Back to Top <ChevronUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const Home = () => {
  const { state } = useAppContext();
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-32 px-4 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="text-blue-600 font-medium tracking-wider text-sm uppercase mb-2 block">Academic Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {state.profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 font-light">
              {state.profile.title}
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
              {state.profile.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/contact">
                <Button className="w-full sm:w-auto justify-center">Get in Touch</Button>
              </Link>
              <a href={state.profile.scholar} target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full sm:w-auto justify-center">View Publications</Button>
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-2xl opacity-20 transform translate-x-4 translate-y-4"></div>
              <img 
                src={state.profile.image} 
                alt={state.profile.name} 
                className="w-full h-full object-cover rounded-full border-8 border-white dark:border-slate-700 shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Highlight */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle subtitle>Research & Expertise</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {state.profile.skills.slice(0, 8).map((skill, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-center font-medium text-slate-700 dark:text-slate-200 hover:shadow-md transition-shadow">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const About = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'publications'>('experience');

  const chartData = [
    { name: 'Research', value: 35 },
    { name: 'Teaching', value: 30 },
    { name: 'Development', value: 20 },
    { name: 'Admin', value: 15 },
  ];
  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
  
  const tabs: Array<'experience' | 'education' | 'publications'> = ['experience', 'education', 'publications'];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 min-h-screen">
      <SectionTitle>About Me</SectionTitle>
      
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="text-lg font-medium text-slate-900 dark:text-white">{state.profile.about}</p>
          <p>
            With a strong foundation in Model-Driven Engineering and Artificial Intelligence, 
            I have dedicated my career to bridging the gap between theoretical computer science 
            and practical application. My work spans across multiple prestigious institutions 
            in India and Europe.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-bold uppercase text-slate-500 mb-4 tracking-wider">Professional Focus</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm capitalize whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-8 animate-fade-in">
        {activeTab === 'experience' && (
          <div className="space-y-6">
             {state.experience.map((job) => (
               <Card key={job.id} className="relative pl-8 border-l-4 border-l-blue-500 rounded-l-none">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</h3>
                   <span className="text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{job.duration}</span>
                 </div>
                 <h4 className="text-lg text-slate-700 dark:text-slate-300 mb-4 font-serif italic">{job.organization}</h4>
                 <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                   {job.description.map((desc, i) => <li key={i}>{desc}</li>)}
                 </ul>
               </Card>
             ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="grid gap-6 md:grid-cols-2">
            {state.education.map((edu) => (
              <Card key={edu.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                    {edu.year}
                  </span>
                </div>
                {edu.grade && (
                  <p className="mt-4 text-sm text-slate-500">Grade/Marks: <span className="font-semibold text-slate-700 dark:text-slate-300">{edu.grade}</span></p>
                )}
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="space-y-4">
            {state.publications.map((pub) => (
              <div key={pub.id} className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-blue-300 transition-colors">
                 <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">"{pub.title}"</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{pub.authors}</p>
                 <div className="flex items-center gap-3 text-xs text-slate-500 uppercase tracking-wide">
                    <span className="font-bold text-blue-600">{pub.year}</span>
                    <span>•</span>
                    <span>{pub.venue}</span>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const { state } = useAppContext();
  
  // Create map URL for embed based on location
  const mapQuery = encodeURIComponent(state.profile.location);
  
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 min-h-screen">
      <SectionTitle subtitle>Contact Me</SectionTitle>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            I am always open to discussing new research collaborations, speaking opportunities, or academic queries.
          </p>
          
          <div className="space-y-6">
            <Card className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600">
                <Mail />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                <a href={`mailto:${state.profile.email}`} className="text-lg font-medium hover:text-blue-600">{state.profile.email}</a>
              </div>
            </Card>
            
            <Card className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600">
                <Phone />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Phone</p>
                <p className="text-lg font-medium">{state.profile.phone}</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
               <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600">
                  <MapPin />
               </div>
               <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                  <p className="text-lg font-medium">{state.profile.location}</p>
               </div>
            </Card>
          </div>

          <div className="mt-8 flex gap-4">
             <a href={state.profile.linkedin} target="_blank" rel="noreferrer">
               <Button className="w-full">
                  <Linkedin size={18} className="mr-2" /> Connect on LinkedIn
               </Button>
             </a>
          </div>
        </div>

        <div className="h-96 md:h-auto bg-slate-200 rounded-xl overflow-hidden shadow-inner">
           <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          >
          </iframe>
        </div>
      </div>
    </div>
  );
};

const Posts = () => {
  const { state } = useAppContext();
  
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 min-h-screen">
      <SectionTitle subtitle>Articles & Updates</SectionTitle>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {state.posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700 flex flex-col h-full">
            <div className="h-48 overflow-hidden">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex gap-2 mb-3">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 text-sm flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-700">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// --- Dashboard Components ---

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login, isAuthenticated } = useAppContext();

  if (isAuthenticated) return <Navigate to="/admin/dashboard" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) setError(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Lock className="mx-auto text-blue-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Access</h2>
          <p className="text-slate-500 mt-2">Enter your password to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
               placeholder="Enter password (admin123)"
             />
             {error && <p className="text-red-500 text-sm mt-2">Invalid password</p>}
          </div>
          <Button type="submit" className="w-full justify-center">Login</Button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-400">
          <p>Hint: use 'admin123'</p>
        </div>
      </Card>
    </div>
  );
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAppContext();
  const location = useLocation();

  const menu = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
    { icon: User, label: 'Profile & Bio', path: '/admin/profile' },
    // { icon: FileText, label: 'Posts', path: '/admin/posts' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700">
          <span className="font-bold text-xl text-slate-800 dark:text-white">Dashboard</span>
        </div>
        <div className="flex-1 py-6 px-3 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-white' 
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button onClick={logout} className="flex items-center gap-3 text-red-500 hover:text-red-600 w-full px-3 py-2">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8">
           <div className="md:hidden">Dr. Sahay Admin</div>
           <div className="flex items-center gap-4">
              <Link to="/" target="_blank" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                 <Globe size={14}/> View Live Site
              </Link>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const DashboardHome = () => {
  const { state } = useAppContext();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome, {state.profile.name}</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 mb-1">Total Posts</p>
              <h3 className="text-3xl font-bold">{state.posts.length}</h3>
            </div>
            <FileText className="opacity-50" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 mb-1">Publications</p>
              <h3 className="text-3xl font-bold">{state.publications.length}</h3>
            </div>
            <Share2 className="opacity-50" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
           <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 mb-1">Theme Mode</p>
              <h3 className="text-xl font-bold capitalize">{state.settings.themeMode}</h3>
            </div>
            <LayoutDashboard className="opacity-50" />
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <Card>
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">Recent Activity</h3>
            <p className="text-slate-500 text-sm">System ready. Content is synced.</p>
         </Card>
         <Card>
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">Quick Actions</h3>
            <div className="flex gap-2">
               <Link to="/admin/posts"><Button size="sm">New Post</Button></Link>
               <Link to="/admin/profile"><Button variant="outline" size="sm">Edit Profile</Button></Link>
            </div>
         </Card>
      </div>
    </div>
  );
};

const ProfileEditor = () => {
  const { state, updateState } = useAppContext();
  const [formData, setFormData] = useState(state.profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Explicitly cast e.target.name to keyof ProfileData to satisfy strict type checking
    const name = e.target.name as keyof ProfileData;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const save = () => {
    updateState({ profile: formData });
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold dark:text-white">Edit Profile</h2>
         <Button onClick={save}><Save size={18} /> Save Changes</Button>
       </div>

       <Card className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Display Name</label>
                <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
             </div>
             <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Job Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
             </div>
             <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
             </div>
             <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
             </div>
             <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Profile Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
             </div>
             <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Tagline (Hero Section)</label>
                <input name="tagline" value={formData.tagline} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
             </div>
             <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">About Summary</label>
                <textarea name="about" value={formData.about} onChange={handleChange} rows={4} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
             </div>
          </div>
       </Card>
    </div>
  );
};

const PostManager = () => {
  const { state, updateState } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Post>({
    id: '', title: '', excerpt: '', content: '', date: '', coverImage: '', tags: [], author: ''
  });

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setForm(post);
  };

  const handleCreate = () => {
    setEditingId('new');
    setForm({
       id: Date.now().toString(),
       title: '', excerpt: '', content: '',
       date: new Date().toISOString().split('T')[0],
       coverImage: 'https://picsum.photos/800/400',
       tags: [], author: state.profile.name
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this post?")) {
      updateState({ posts: state.posts.filter(p => p.id !== id) });
    }
  };

  const handleSave = () => {
    if (editingId === 'new') {
      updateState({ posts: [...state.posts, form] });
    } else {
      updateState({ posts: state.posts.map(p => p.id === editingId ? form : p) });
    }
    setEditingId(null);
  };

  if (editingId) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between">
           <h2 className="text-2xl font-bold dark:text-white">{editingId === 'new' ? 'New Post' : 'Edit Post'}</h2>
           <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
              <Button onClick={handleSave}>Save Post</Button>
           </div>
        </div>
        <Card className="space-y-4">
           <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-2 border rounded" />
           </div>
           <div>
              <label className="block text-sm font-medium mb-1">Excerpt</label>
              <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full p-2 border rounded" rows={2} />
           </div>
           <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full p-2 border rounded font-mono" rows={10} />
           </div>
           <div>
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <input value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} className="w-full p-2 border rounded" />
           </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Blog Posts</h2>
        <Button onClick={handleCreate}><Plus size={18} /> Create Post</Button>
      </div>
      <div className="grid gap-4">
        {state.posts.map(post => (
          <Card key={post.id} className="flex justify-between items-center p-4">
             <div>
                <h3 className="font-bold text-lg dark:text-white">{post.title}</h3>
                <p className="text-sm text-slate-500">{post.date}</p>
             </div>
             <div className="flex gap-2">
                <Button variant="ghost" onClick={() => handleEdit(post)}><Edit2 size={18}/></Button>
                <Button variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(post.id)}><Trash2 size={18}/></Button>
             </div>
          </Card>
        ))}
        {state.posts.length === 0 && <p className="text-slate-500 text-center py-8">No posts found.</p>}
      </div>
    </div>
  );
};

const SettingsEditor = () => {
  const { state, updateState } = useAppContext();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data to default? This will erase all changes and reload the initial configuration (including the new profile picture).")) {
      localStorage.removeItem('app_state');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <h2 className="text-2xl font-bold dark:text-white">Site Settings & SEO</h2>
       
       <Card className="space-y-6">
          <div>
             <h3 className="font-bold mb-4 border-b pb-2">Appearance</h3>
             <div className="flex items-center justify-between mb-4">
                <span>Theme Mode</span>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                   <button 
                     onClick={() => updateState({ settings: { ...state.settings, themeMode: 'light' }})}
                     className={`px-3 py-1 rounded ${state.settings.themeMode === 'light' ? 'bg-white shadow' : ''}`}>Light</button>
                   <button 
                     onClick={() => updateState({ settings: { ...state.settings, themeMode: 'dark' }})}
                     className={`px-3 py-1 rounded ${state.settings.themeMode === 'dark' ? 'bg-white shadow text-black' : ''}`}>Dark</button>
                </div>
             </div>
          </div>

          <div>
             <h3 className="font-bold mb-4 border-b pb-2">SEO Configuration</h3>
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium mb-1">Meta Title</label>
                   <input 
                      value={state.settings.seoTitle} 
                      onChange={e => updateState({ settings: { ...state.settings, seoTitle: e.target.value }})}
                      className="w-full p-2 border rounded" 
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1">Meta Description</label>
                   <textarea 
                      value={state.settings.seoDescription} 
                      onChange={e => updateState({ settings: { ...state.settings, seoDescription: e.target.value }})}
                      className="w-full p-2 border rounded" rows={3}
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1">Keywords</label>
                   <input 
                      value={state.settings.seoKeywords} 
                      onChange={e => updateState({ settings: { ...state.settings, seoKeywords: e.target.value }})}
                      className="w-full p-2 border rounded" 
                   />
                </div>
             </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 border-b pb-2 text-red-600">Danger Zone</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Reset all content and settings to initial state.</span>
              <Button variant="danger" size="sm" onClick={handleReset}>
                <RefreshCw size={14} className="mr-2" /> Reset Data
              </Button>
            </div>
          </div>
       </Card>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" />;
};

// --- App Root ---

const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/posts" element={<Posts />} /> */}
          
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<DashboardHome />} />
                  <Route path="profile" element={<ProfileEditor />} />
                 {/* <Route path="posts" element={<PostManager />} /> */}
                  <Route path="settings" element={<SettingsEditor />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
};

export default App;