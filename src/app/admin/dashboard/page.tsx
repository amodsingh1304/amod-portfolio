'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminAuthenticated, logoutAdmin } from '@/lib/auth';
import { PortfolioContent } from '@/lib/content';

const CLOUDINARY_CLOUD_NAME = 'odccxlqr';
const CLOUDINARY_UPLOAD_PRESET = 'portfolio';

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadContent();
  }, [router]);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      
      // Ensure statistics exist
      if (!data.about.statistics) {
        data.about.statistics = {
          years: '1+',
          projects: '4+',
          technologies: '15+',
          satisfaction: '100%'
        };
      }

      // Ensure experience is an array
      if (!Array.isArray(data.experience)) {
        data.experience = [data.experience];
      }
      data.experience = data.experience.map((job: any) => ({
        company: job.company || '',
        position: job.position || '',
        project: job.project || '',
        period: job.period || '',
        description: job.description || [],
        technologies: job.technologies || []
      }));

      // Ensure settings exist
      if (!data.settings) {
        data.settings = {
          showHero: true,
          showSkills: true,
          showExperience: true,
          showProjects: true,
          showContact: true,
          hero: {},
          skills: {},
          experience: {},
          projects: {},
          contact: {}
        };
      }
      data.settings.hero = data.settings.hero || {};
      data.settings.skills = data.settings.skills || {};
      data.settings.skills.showCategories = data.settings.skills.showCategories || data.skills.categories.map(() => true);
      data.settings.experience = data.settings.experience || {};
      data.settings.experience.showItems = data.settings.experience.showItems || data.experience.map(() => true);
      data.settings.projects = data.settings.projects || {};
      data.settings.projects.showItems = data.settings.projects.showItems || data.projects.map(() => true);
      data.settings.contact = data.settings.contact || {};
      
      setContent(data);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    setSaveMessage('');
    
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSaveMessage('Content saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to save content');
      }
    } catch (error) {
      setSaveMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!content) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        setContent({ ...content, hero: { ...content.hero, logo: data.secure_url } });
        setSaveMessage('Logo uploaded successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Logo upload failed');
      }
    } catch (error) {
      console.error('Logo upload error:', error);
      setSaveMessage('Logo upload failed');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load content</div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const setTop = (key: string, value: any) =>
    setContent((prev) => (prev ? { ...prev, settings: { ...prev.settings, [key]: value } } as PortfolioContent : prev));
  const setNested = (section: string, key: string, value: any, index?: number) =>
    setContent((prev) => {
      if (!prev) return prev;
      const sectionObj = { ...(prev.settings as any)?.[section] };
      if (typeof index === 'number') {
        const arr = [...(sectionObj[key] || [])];
        arr[index] = value;
        sectionObj[key] = arr;
      } else {
        sectionObj[key] = value;
      }
      return { ...prev, settings: { ...(prev.settings as any), [section]: sectionObj } } as PortfolioContent;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="glass-strong shadow-lg relative z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={saveContent}
              disabled={saving}
              className="btn-premium px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:scale-105 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {saveMessage && (
        <div className={`fixed top-20 right-6 px-6 py-3 rounded-lg shadow-xl glass-strong animate-fade-in-up ${
          saveMessage.includes('success') ? 'border-green-500' : 'border-red-500'
        }`}>
          <div className={`flex items-center space-x-2 ${
            saveMessage.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {saveMessage.includes('success') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <span className="font-medium">{saveMessage}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 glass rounded-xl p-2 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'btn-premium shadow-lg transform scale-105'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Editor */}
        <div className="gradient-border p-1 rounded-2xl shadow-xl">
          <div className="glass-strong rounded-2xl p-6">
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold gradient-text mb-6">About</h2>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={content.settings?.showHero ?? true} onChange={(e) => setTop('showHero', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200">Show section</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={(content.settings as any)?.hero?.showButtons ?? true} onChange={(e) => setNested('hero', 'showButtons', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200">Show buttons</span>
                </label>
              </div>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.hero?.showLogo ?? true} onChange={(e) => setNested('hero', 'showLogo', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show profile photo</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile photo</label>
                  {content.hero.logo && (
                    <a
                      href={content.hero.logo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mb-2"
                    >
                      <img
                        src={content.hero.logo}
                        alt="Logo preview"
                        className="h-12 rounded-lg border border-gray-200 dark:border-gray-600 hover:opacity-80 transition-opacity"
                      />
                    </a>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.hero?.showName ?? true} onChange={(e) => setNested('hero', 'showName', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show name</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={content.hero.name}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, name: e.target.value } })}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.hero?.showTitle ?? true} onChange={(e) => setNested('hero', 'showTitle', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show title</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.hero?.showHeadline ?? true} onChange={(e) => setNested('hero', 'showHeadline', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show headline</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Headline</label>
                  <input
                    type="text"
                    value={content.hero.headline || ''}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.hero?.showContent ?? true} onChange={(e) => setNested('hero', 'showContent', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show content</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                  <textarea
                    value={content.about.content}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, content: e.target.value } })}
                    rows={8}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="mt-6 p-4 glass rounded-xl border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input type="checkbox" checked={(content.settings as any)?.hero?.showStatistics ?? true} onChange={(e) => setNested('hero', 'showStatistics', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show statistics</span>
                  </label>
                  <h3 className="text-lg font-semibold gradient-text mb-4">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years Experience</label>
                      <input
                        type="text"
                        value={content.about.statistics?.years || '1+'}
                        onChange={(e) => setContent({ 
                          ...content, 
                          about: { 
                            ...content.about, 
                            statistics: { 
                              ...content.about.statistics, 
                              years: e.target.value 
                            } 
                          } 
                        })}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Projects Completed</label>
                      <input
                        type="text"
                        value={content.about.statistics?.projects || '4+'}
                        onChange={(e) => setContent({ 
                          ...content, 
                          about: { 
                            ...content.about, 
                            statistics: { 
                              ...content.about.statistics, 
                              projects: e.target.value 
                            } 
                          } 
                        })}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</label>
                      <input
                        type="text"
                        value={content.about.statistics?.technologies || '15+'}
                        onChange={(e) => setContent({ 
                          ...content, 
                          about: { 
                            ...content.about, 
                            statistics: { 
                              ...content.about.statistics, 
                              technologies: e.target.value 
                            } 
                          } 
                        })}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Satisfaction</label>
                      <input
                        type="text"
                        value={content.about.statistics?.satisfaction || '100%'}
                        onChange={(e) => setContent({ 
                          ...content, 
                          about: { 
                            ...content.about, 
                            statistics: { 
                              ...content.about.statistics, 
                              satisfaction: e.target.value 
                            } 
                          } 
                        })}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold gradient-text mb-6">Skills Section</h2>
              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={content.settings?.showSkills ?? true} onChange={(e) => setTop('showSkills', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200">Show Skills Section</span>
                </label>
              </div>
              {content.skills.categories.map((category, catIndex) => (
                <div key={catIndex} className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.skills?.showCategories?.[catIndex] ?? true}
                        onChange={(e) => setNested('skills', 'showCategories', e.target.checked, catIndex)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">Show this category</span>
                    </label>
                    {content.skills.categories.length > 1 && (
                      <button
                        onClick={() => {
                          const newCategories = content.skills.categories.filter((_, i) => i !== catIndex);
                          const newItems = ((content.settings as any)?.skills?.showCategories || []).filter((_: boolean, i: number) => i !== catIndex);
                          setContent({ ...content, skills: { ...content.skills, categories: newCategories }, settings: { ...content.settings, skills: { ...(content.settings as any)?.skills, showCategories: newItems } } } as PortfolioContent);
                        }}
                        className="text-sm text-red-500 hover:text-red-400 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Title</label>
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => {
                        const newCategories = [...content.skills.categories];
                        newCategories[catIndex] = { ...category, title: e.target.value };
                        setContent({ ...content, skills: { ...content.skills, categories: newCategories } });
                      }}
                      className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</label>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newCategories = [...content.skills.categories];
                              const newSkills = [...category.skills];
                              newSkills[skillIndex] = e.target.value;
                              newCategories[catIndex] = { ...category, skills: newSkills };
                              setContent({ ...content, skills: { ...content.skills, categories: newCategories } });
                            }}
                            className="flex-1 px-4 py-2 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                          <button
                            onClick={() => {
                              const newCategories = [...content.skills.categories];
                              const newSkills = category.skills.filter((_, i) => i !== skillIndex);
                              newCategories[catIndex] = { ...category, skills: newSkills };
                              setContent({ ...content, skills: { ...content.skills, categories: newCategories } });
                            }}
                            className="text-sm text-red-500 hover:text-red-400 font-medium px-2"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const newCategories = [...content.skills.categories];
                        newCategories[catIndex] = { ...category, skills: [...category.skills, ''] };
                        setContent({ ...content, skills: { ...content.skills, categories: newCategories } });
                      }}
                      className="mt-3 text-sm text-blue-500 hover:text-blue-400 font-medium"
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newCategories = [...content.skills.categories, { title: '', skills: [''] }];
                  setContent({ ...content, skills: { ...content.skills, categories: newCategories } });
                }}
                className="w-full py-3 glass border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-blue-500 hover:text-blue-400 font-medium transition-all"
              >
                + Add Category
              </button>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold gradient-text mb-6">Experience Section</h2>
              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={content.settings?.showExperience ?? true} onChange={(e) => setTop('showExperience', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200">Show Experience Section</span>
                </label>
              </div>
              {content.experience.map((job, jobIndex) => (
                <div key={jobIndex} className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.experience?.showItems?.[jobIndex] ?? true}
                        onChange={(e) => setNested('experience', 'showItems', e.target.checked, jobIndex)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">Show this experience</span>
                    </label>
                    {content.experience.length > 1 && (
                      <button
                        onClick={() => {
                          const newJobs = content.experience.filter((_, i) => i !== jobIndex);
                          const newItems = ((content.settings as any)?.experience?.showItems || []).filter((_: boolean, i: number) => i !== jobIndex);
                          setContent({ ...content, experience: newJobs, settings: { ...content.settings, experience: { ...(content.settings as any)?.experience, showItems: newItems } } } as PortfolioContent);
                        }}
                        className="text-sm text-red-500 hover:text-red-400 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                      <input
                        type="text"
                        value={job.company}
                        onChange={(e) => {
                          const newJobs = [...content.experience];
                          newJobs[jobIndex] = { ...job, company: e.target.value };
                          setContent({ ...content, experience: newJobs });
                        }}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                      <input
                        type="text"
                        value={job.position}
                        onChange={(e) => {
                          const newJobs = [...content.experience];
                          newJobs[jobIndex] = { ...job, position: e.target.value };
                          setContent({ ...content, experience: newJobs });
                        }}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project / Role</label>
                      <input
                        type="text"
                        value={job.project}
                        onChange={(e) => {
                          const newJobs = [...content.experience];
                          newJobs[jobIndex] = { ...job, project: e.target.value };
                          setContent({ ...content, experience: newJobs });
                        }}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period (e.g. 2023 — Present)</label>
                      <input
                        type="text"
                        value={job.period || ''}
                        onChange={(e) => {
                          const newJobs = [...content.experience];
                          newJobs[jobIndex] = { ...job, period: e.target.value };
                          setContent({ ...content, experience: newJobs });
                        }}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description (one per line)</label>
                      <textarea
                        value={job.description.join('\n')}
                        onChange={(e) => {
                          const newJobs = [...content.experience];
                          newJobs[jobIndex] = { ...job, description: e.target.value.split('\n') };
                          setContent({ ...content, experience: newJobs });
                        }}
                        rows={6}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={job.technologies.join(', ')}
                        onChange={(e) => {
                          const newJobs = [...content.experience];
                          newJobs[jobIndex] = { ...job, technologies: e.target.value.split(',').map(t => t.trim()) };
                          setContent({ ...content, experience: newJobs });
                        }}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newJobs = [...content.experience, { company: '', position: '', project: '', period: '', description: [], technologies: [] }];
                  const newItems = [...((content.settings as any)?.experience?.showItems || []), true];
                  setContent({ ...content, experience: newJobs, settings: { ...content.settings, experience: { ...(content.settings as any)?.experience, showItems: newItems } } } as PortfolioContent);
                }}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium"
              >
                + Add Experience
              </button>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold gradient-text mb-6">Projects Section</h2>
              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={content.settings?.showProjects ?? true} onChange={(e) => setTop('showProjects', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200">Show Projects Section</span>
                </label>
              </div>
              {content.projects.map((project, projIndex) => (
                <div key={projIndex} className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.projects?.showItems?.[projIndex] ?? true}
                        onChange={(e) => setNested('projects', 'showItems', e.target.checked, projIndex)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">Show this project</span>
                    </label>
                    {content.projects.length > 1 && (
                      <button
                        onClick={() => {
                          const newProjects = content.projects.filter((_, i) => i !== projIndex);
                          const newItems = ((content.settings as any)?.projects?.showItems || []).filter((_: boolean, i: number) => i !== projIndex);
                          setContent({ ...content, projects: newProjects, settings: { ...content.settings, projects: { ...(content.settings as any)?.projects, showItems: newItems } } } as PortfolioContent);
                        }}
                        className="text-sm text-red-500 hover:text-red-400 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...content.projects];
                          newProjects[projIndex] = { ...project, title: e.target.value };
                          setContent({ ...content, projects: newProjects });
                        }}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...content.projects];
                          newProjects[projIndex] = { ...project, description: e.target.value };
                          setContent({ ...content, projects: newProjects });
                        }}
                        rows={2}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</label>
                      <div className="space-y-2">
                        {project.technologies.map((tech, techIndex) => (
                          <div key={techIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tech}
                              onChange={(e) => {
                                const newProjects = [...content.projects];
                                const newTech = [...project.technologies];
                                newTech[techIndex] = e.target.value;
                                newProjects[projIndex] = { ...project, technologies: newTech };
                                setContent({ ...content, projects: newProjects });
                              }}
                              className="flex-1 px-4 py-2 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                              onClick={() => {
                                const newProjects = [...content.projects];
                                const newTech = project.technologies.filter((_, i) => i !== techIndex);
                                newProjects[projIndex] = { ...project, technologies: newTech };
                                setContent({ ...content, projects: newProjects });
                              }}
                              className="text-sm text-red-500 hover:text-red-400 font-medium px-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          const newProjects = [...content.projects];
                          newProjects[projIndex] = { ...project, technologies: [...project.technologies, ''] };
                          setContent({ ...content, projects: newProjects });
                        }}
                        className="mt-3 text-sm text-blue-500 hover:text-blue-400 font-medium"
                      >
                        + Add Technology
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features (one per line)</label>
                      <textarea
                        value={project.features.join('\n')}
                        onChange={(e) => {
                          const newProjects = [...content.projects];
                          newProjects[projIndex] = { ...project, features: e.target.value.split('\n') };
                          setContent({ ...content, projects: newProjects });
                        }}
                        rows={4}
                        className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newProjects = [...content.projects, { title: '', description: '', technologies: [''], features: [''] }];
                  const newItems = [...((content.settings as any)?.projects?.showItems || []), true];
                  setContent({ ...content, projects: newProjects, settings: { ...content.settings, projects: { ...(content.settings as any)?.projects, showItems: newItems } } } as PortfolioContent);
                }}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors font-medium"
              >
                + Add Project
              </button>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold gradient-text mb-6">Contact Section</h2>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={content.settings?.showContact ?? true} onChange={(e) => setTop('showContact', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200">Show section</span>
                </label>
              </div>
              <div className="space-y-4">
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.contact?.showEmail ?? true} onChange={(e) => setNested('contact', 'showEmail', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show email</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Contact form messages will be sent to this email. Add SMTP_PASS to .env for the sending account.</p>
                </div>
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.contact?.showLocation ?? true} onChange={(e) => setNested('contact', 'showLocation', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show location</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={content.contact.location}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, location: e.target.value } })}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.contact?.showGithub ?? true} onChange={(e) => setNested('contact', 'showGithub', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show GitHub</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={content.contact.github}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, github: e.target.value } })}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input type="checkbox" checked={(content.settings as any)?.contact?.showLinkedin ?? true} onChange={(e) => setNested('contact', 'showLinkedin', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-800 dark:text-gray-200">Show LinkedIn</span>
                  </label>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={content.contact.linkedin}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, linkedin: e.target.value } })}
                    className="w-full px-4 py-3 glass border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold gradient-text mb-6">Page Visibility</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Show or hide whole sections and their parts.</p>
                <div className="space-y-3">
                  {[
                    { key: 'showHero', label: 'About' },
                    { key: 'showSkills', label: 'Skills' },
                    { key: 'showExperience', label: 'Experience' },
                    { key: 'showProjects', label: 'Projects' },
                    { key: 'showContact', label: 'Contact' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.[item.key] ?? true}
                        onChange={(e) => setTop(item.key, e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Hero parts</h3>
                <div className="space-y-3">
                  {[
                    { key: 'showHeadline', label: 'Headline' },
                    { key: 'showTitle', label: 'Title' },
                    { key: 'showContent', label: 'Content' },
                    { key: 'showStatistics', label: 'Statistics' },
                    { key: 'showLogo', label: 'Logo' },
                    { key: 'showButtons', label: 'Buttons' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.hero?.[item.key] ?? true}
                        onChange={(e) => setNested('hero', item.key, e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Skill categories</h3>
                <div className="space-y-3">
                  {content.skills.categories.map((cat, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.skills?.showCategories?.[idx] ?? true}
                        onChange={(e) => setNested('skills', 'showCategories', e.target.checked, idx)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">{cat.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Experience parts</h3>
                <div className="space-y-3">
                  {[
                    { key: 'showHeader', label: 'Header (company, position)' },
                    { key: 'showDescription', label: 'Description' },
                    { key: 'showTechnologies', label: 'Technologies' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.experience?.[item.key] ?? true}
                        onChange={(e) => setNested('experience', item.key, e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Projects</h3>
                <div className="space-y-3">
                  {content.projects.map((proj, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.projects?.showItems?.[idx] ?? true}
                        onChange={(e) => setNested('projects', 'showItems', e.target.checked, idx)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">{proj.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contact parts</h3>
                <div className="space-y-3">
                  {[
                    { key: 'showEmail', label: 'Email' },
                    { key: 'showLocation', label: 'Location' },
                    { key: 'showGithub', label: 'GitHub' },
                    { key: 'showLinkedin', label: 'LinkedIn' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(content.settings as any)?.contact?.[item.key] ?? true}
                        onChange={(e) => setNested('contact', item.key, e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-200">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>

        {/* View Portfolio Button */}
        <div className="mt-8 text-center">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 btn-premium rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            View Portfolio →
          </a>
        </div>
      </div>
    </div>
  );
}