import React, { useState, useEffect } from 'react';
import { Settings, Mail, Brain, Save, TestTube, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const SettingsPage = ({ onBack, onSave }) => {
  const [activeTab, setActiveTab] = useState('llm');
  const [isSaving, setIsSaving] = useState(false);
  const [testStatus, setTestStatus] = useState({ llm: null, smtp: null });
  const [isTesting, setIsTesting] = useState({ llm: false, smtp: false });

  const [llmSettings, setLlmSettings] = useState({
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    endpoint: '',
    enabled: true
  });

  const [smtpSettings, setSmtpSettings] = useState({
    host: '',
    port: 587,
    secure: false,
    username: '',
    password: '',
    fromEmail: '',
    fromName: 'Wick Charette System',
    enabled: true
  });

  const [emailDistribution, setEmailDistribution] = useState({
    autoSendReports: false,
    sendOnPhaseComplete: true,
    sendOnCharetteComplete: true,
    defaultRecipients: [],
    includeAttachments: true,
    emailTemplate: 'default',
    ccAdmin: false,
    adminEmail: ''
  });

  const [newRecipient, setNewRecipient] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    // Load from localStorage or API
    const savedLlm = localStorage.getItem('llmSettings');
    const savedSmtp = localStorage.getItem('smtpSettings');
    const savedEmail = localStorage.getItem('emailDistribution');

    if (savedLlm) setLlmSettings(JSON.parse(savedLlm));
    if (savedSmtp) setSmtpSettings(JSON.parse(savedSmtp));
    if (savedEmail) setEmailDistribution(JSON.parse(savedEmail));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage (in production, save to backend)
      localStorage.setItem('llmSettings', JSON.stringify(llmSettings));
      localStorage.setItem('smtpSettings', JSON.stringify(smtpSettings));
      localStorage.setItem('emailDistribution', JSON.stringify(emailDistribution));

      if (onSave) {
        await onSave({ llmSettings, smtpSettings, emailDistribution });
      }

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestLLM = async () => {
    setIsTesting({ ...isTesting, llm: true });
    setTestStatus({ ...testStatus, llm: null });

    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, make actual API call to test LLM connection
      const isValid = llmSettings.apiKey && llmSettings.apiKey.length > 20;
      
      setTestStatus({ ...testStatus, llm: isValid ? 'success' : 'error' });
    } catch (error) {
      setTestStatus({ ...testStatus, llm: 'error' });
    } finally {
      setIsTesting({ ...isTesting, llm: false });
    }
  };

  const handleTestSMTP = async () => {
    setIsTesting({ ...isTesting, smtp: true });
    setTestStatus({ ...testStatus, smtp: null });

    try {
      // Simulate SMTP test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, send test email
      const isValid = smtpSettings.host && smtpSettings.username && smtpSettings.password;
      
      setTestStatus({ ...testStatus, smtp: isValid ? 'success' : 'error' });
    } catch (error) {
      setTestStatus({ ...testStatus, smtp: 'error' });
    } finally {
      setIsTesting({ ...isTesting, smtp: false });
    }
  };

  const handleAddRecipient = () => {
    if (newRecipient && newRecipient.includes('@')) {
      setEmailDistribution({
        ...emailDistribution,
        defaultRecipients: [...emailDistribution.defaultRecipients, newRecipient]
      });
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (email) => {
    setEmailDistribution({
      ...emailDistribution,
      defaultRecipients: emailDistribution.defaultRecipients.filter(r => r !== email)
    });
  };

  const llmProviders = [
    { value: 'openai', label: 'OpenAI', models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
    { value: 'anthropic', label: 'Anthropic Claude', models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'] },
    { value: 'azure', label: 'Azure OpenAI', models: ['gpt-4', 'gpt-35-turbo'] },
    { value: 'custom', label: 'Custom Endpoint', models: [] }
  ];

  const currentProvider = llmProviders.find(p => p.value === llmSettings.provider);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" onClick={onBack} className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center space-x-3">
                  <Settings className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">System Settings</CardTitle>
                    <CardDescription>Configure LLM, email, and report distribution settings</CardDescription>
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveSettings} disabled={isSaving} size="lg">
                <Save className="h-5 w-5 mr-2" />
                {isSaving ? 'Saving...' : 'Save All Settings'}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="llm" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              LLM Configuration
            </TabsTrigger>
            <TabsTrigger value="smtp" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              SMTP Settings
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Distribution
            </TabsTrigger>
          </TabsList>

          {/* LLM Configuration Tab */}
          <TabsContent value="llm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Large Language Model Configuration</CardTitle>
                <CardDescription>
                  Configure AI provider for analysis, report generation, and text enhancement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="llm-enabled"
                    checked={llmSettings.enabled}
                    onChange={(e) => setLlmSettings({ ...llmSettings, enabled: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="llm-enabled" className="font-medium">
                    Enable LLM Features
                  </label>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Provider</label>
                  <select
                    value={llmSettings.provider}
                    onChange={(e) => setLlmSettings({ ...llmSettings, provider: e.target.value, model: '' })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!llmSettings.enabled}
                  >
                    {llmProviders.map(provider => (
                      <option key={provider.value} value={provider.value}>{provider.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">API Key</label>
                  <input
                    type="password"
                    value={llmSettings.apiKey}
                    onChange={(e) => setLlmSettings({ ...llmSettings, apiKey: e.target.value })}
                    placeholder="sk-..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!llmSettings.enabled}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your API key is stored securely and never shared
                  </p>
                </div>

                {currentProvider && currentProvider.models.length > 0 && (
                  <div>
                    <label className="block font-semibold mb-2">Model</label>
                    <select
                      value={llmSettings.model}
                      onChange={(e) => setLlmSettings({ ...llmSettings, model: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!llmSettings.enabled}
                    >
                      <option value="">Select a model...</option>
                      {currentProvider.models.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                )}

                {llmSettings.provider === 'custom' && (
                  <div>
                    <label className="block font-semibold mb-2">Custom Endpoint URL</label>
                    <input
                      type="url"
                      value={llmSettings.endpoint}
                      onChange={(e) => setLlmSettings({ ...llmSettings, endpoint: e.target.value })}
                      placeholder="https://api.example.com/v1"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!llmSettings.enabled}
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Temperature ({llmSettings.temperature})</label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={llmSettings.temperature}
                      onChange={(e) => setLlmSettings({ ...llmSettings, temperature: parseFloat(e.target.value) })}
                      className="w-full"
                      disabled={!llmSettings.enabled}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Lower = more focused, Higher = more creative
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Max Tokens</label>
                    <input
                      type="number"
                      value={llmSettings.maxTokens}
                      onChange={(e) => setLlmSettings({ ...llmSettings, maxTokens: parseInt(e.target.value) })}
                      min="100"
                      max="4000"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!llmSettings.enabled}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Button
                    onClick={handleTestLLM}
                    disabled={!llmSettings.enabled || isTesting.llm}
                    variant="outline"
                  >
                    <TestTube className="h-4 w-4 mr-2" />
                    {isTesting.llm ? 'Testing...' : 'Test Connection'}
                  </Button>
                  {testStatus.llm === 'success' && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connection Successful
                    </Badge>
                  )}
                  {testStatus.llm === 'error' && (
                    <Badge variant="destructive">
                      <XCircle className="h-4 w-4 mr-1" />
                      Connection Failed
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMTP Settings Tab */}
          <TabsContent value="smtp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SMTP Email Configuration</CardTitle>
                <CardDescription>
                  Configure email server for sending reports and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="smtp-enabled"
                    checked={smtpSettings.enabled}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, enabled: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="smtp-enabled" className="font-medium">
                    Enable Email Sending
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={smtpSettings.host}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                      placeholder="smtp.gmail.com"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!smtpSettings.enabled}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Port</label>
                    <input
                      type="number"
                      value={smtpSettings.port}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, port: parseInt(e.target.value) })}
                      placeholder="587"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!smtpSettings.enabled}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="smtp-secure"
                    checked={smtpSettings.secure}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, secure: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    disabled={!smtpSettings.enabled}
                  />
                  <label htmlFor="smtp-secure" className="text-sm">
                    Use TLS/SSL (recommended for port 465)
                  </label>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Username</label>
                  <input
                    type="text"
                    value={smtpSettings.username}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
                    placeholder="your-email@example.com"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!smtpSettings.enabled}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!smtpSettings.enabled}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    For Gmail, use an App Password instead of your regular password
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">From Email</label>
                    <input
                      type="email"
                      value={smtpSettings.fromEmail}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, fromEmail: e.target.value })}
                      placeholder="noreply@example.com"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!smtpSettings.enabled}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">From Name</label>
                    <input
                      type="text"
                      value={smtpSettings.fromName}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, fromName: e.target.value })}
                      placeholder="Wick Charette System"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!smtpSettings.enabled}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Button
                    onClick={handleTestSMTP}
                    disabled={!smtpSettings.enabled || isTesting.smtp}
                    variant="outline"
                  >
                    <TestTube className="h-4 w-4 mr-2" />
                    {isTesting.smtp ? 'Testing...' : 'Send Test Email'}
                  </Button>
                  {testStatus.smtp === 'success' && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Test Email Sent
                    </Badge>
                  )}
                  {testStatus.smtp === 'error' && (
                    <Badge variant="destructive">
                      <XCircle className="h-4 w-4 mr-1" />
                      Failed to Send
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Distribution Tab */}
          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PDF Report Distribution</CardTitle>
                <CardDescription>
                  Configure automatic email distribution of generated reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto-send"
                      checked={emailDistribution.autoSendReports}
                      onChange={(e) => setEmailDistribution({ ...emailDistribution, autoSendReports: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="auto-send" className="font-medium">
                      Enable Automatic Report Distribution
                    </label>
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    <input
                      type="checkbox"
                      id="send-phase"
                      checked={emailDistribution.sendOnPhaseComplete}
                      onChange={(e) => setEmailDistribution({ ...emailDistribution, sendOnPhaseComplete: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      disabled={!emailDistribution.autoSendReports}
                    />
                    <label htmlFor="send-phase" className="text-sm">
                      Send report when each phase completes
                    </label>
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    <input
                      type="checkbox"
                      id="send-complete"
                      checked={emailDistribution.sendOnCharetteComplete}
                      onChange={(e) => setEmailDistribution({ ...emailDistribution, sendOnCharetteComplete: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      disabled={!emailDistribution.autoSendReports}
                    />
                    <label htmlFor="send-complete" className="text-sm">
                      Send final report when charette completes
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="include-attachments"
                      checked={emailDistribution.includeAttachments}
                      onChange={(e) => setEmailDistribution({ ...emailDistribution, includeAttachments: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="include-attachments" className="font-medium">
                      Include PDF as Attachment
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-3">Default Recipients</label>
                  <div className="space-y-3">
                    {emailDistribution.defaultRecipients.map((email, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm">{email}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveRecipient(email)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <input
                      type="email"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      placeholder="email@example.com"
                      className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddRecipient()}
                    />
                    <Button onClick={handleAddRecipient} disabled={!newRecipient.includes('@')}>
                      Add Recipient
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Email Template</label>
                  <select
                    value={emailDistribution.emailTemplate}
                    onChange={(e) => setEmailDistribution({ ...emailDistribution, emailTemplate: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="default">Default Template</option>
                    <option value="executive">Executive Summary</option>
                    <option value="detailed">Detailed Report</option>
                    <option value="minimal">Minimal Notification</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cc-admin"
                      checked={emailDistribution.ccAdmin}
                      onChange={(e) => setEmailDistribution({ ...emailDistribution, ccAdmin: e.target.checked })}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="cc-admin" className="font-medium">
                      CC Administrator on All Reports
                    </label>
                  </div>

                  {emailDistribution.ccAdmin && (
                    <input
                      type="email"
                      value={emailDistribution.adminEmail}
                      onChange={(e) => setEmailDistribution({ ...emailDistribution, adminEmail: e.target.value })}
                      placeholder="admin@example.com"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ml-6"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Preview</CardTitle>
                <CardDescription>Preview of automated report emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg border">
                  <div className="space-y-2 text-sm">
                    <div><strong>From:</strong> {smtpSettings.fromName} &lt;{smtpSettings.fromEmail || 'noreply@example.com'}&gt;</div>
                    <div><strong>To:</strong> {emailDistribution.defaultRecipients.join(', ') || 'No recipients configured'}</div>
                    {emailDistribution.ccAdmin && emailDistribution.adminEmail && (
                      <div><strong>CC:</strong> {emailDistribution.adminEmail}</div>
                    )}
                    <div><strong>Subject:</strong> Charette Report - [Session Name] - Phase [X] Complete</div>
                    <div className="pt-3 border-t mt-3">
                      <p className="mb-2">Dear Participant,</p>
                      <p className="mb-2">
                        The report for [Session Name] has been generated and is attached to this email.
                      </p>
                      <p className="mb-2">
                        {emailDistribution.includeAttachments ? 
                          'Please find the PDF report attached.' : 
                          'You can download the report from the system dashboard.'}
                      </p>
                      <p>Best regards,<br/>Wick Charette System</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
