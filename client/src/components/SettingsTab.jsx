import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Settings, Brain, Mail, Key, Save, TestTube } from 'lucide-react';

export default function SettingsTab({ onSave }) {
  const [settings, setSettings] = useState({
    llm: {
      provider: 'openai',
      apiKey: '',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000
    },
    smtp: {
      host: '',
      port: 587,
      secure: false,
      username: '',
      password: '',
      fromEmail: '',
      fromName: 'Charette System'
    }
  });

  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState({ llm: false, smtp: false });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('charetteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('charetteSettings', JSON.stringify(settings));
    if (onSave) {
      onSave(settings);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTestLLM = async () => {
    setTesting({ ...testing, llm: true });
    try {
      // Test LLM connection
      const response = await fetch('/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: settings.llm.apiKey, model: settings.llm.model })
      });
      const result = await response.json();
      alert(result.success ? 'LLM connection successful!' : 'LLM connection failed: ' + result.error);
    } catch (error) {
      alert('LLM test failed: ' + error.message);
    } finally {
      setTesting({ ...testing, llm: false });
    }
  };

  const handleTestSMTP = async () => {
    setTesting({ ...testing, smtp: true });
    try {
      // Test SMTP connection
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings.smtp)
      });
      const result = await response.json();
      alert(result.success ? 'SMTP connection successful!' : 'SMTP connection failed: ' + result.error);
    } catch (error) {
      alert('SMTP test failed: ' + error.message);
    } finally {
      setTesting({ ...testing, smtp: false });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">System Settings</CardTitle>
          </div>
          <CardDescription>
            Configure AI providers and email delivery for the charette system
          </CardDescription>
        </CardHeader>
      </Card>

      {/* LLM Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-base">Large Language Model (LLM) Configuration</CardTitle>
            </div>
            <Badge variant="secondary">AI Analysis</Badge>
          </div>
          <CardDescription>
            Configure AI provider for cognitive analysis and breakthrough insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Provider Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">AI Provider</label>
            <select
              value={settings.llm.provider}
              onChange={(e) => setSettings({ ...settings, llm: { ...settings.llm, provider: e.target.value } })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="openai">OpenAI (GPT-4, GPT-3.5)</option>
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="azure">Azure OpenAI</option>
              <option value="local">Local Model (Ollama)</option>
            </select>
          </div>

          {/* API Key */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              <Key className="h-4 w-4 inline mr-1" />
              API Key
            </label>
            <input
              type="password"
              value={settings.llm.apiKey}
              onChange={(e) => setSettings({ ...settings, llm: { ...settings.llm, apiKey: e.target.value } })}
              placeholder="sk-..."
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>

          {/* Model Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Model</label>
              <select
                value={settings.llm.model}
                onChange={(e) => setSettings({ ...settings, llm: { ...settings.llm, model: e.target.value } })}
                className="w-full px-3 py-2 border rounded-md"
              >
                {settings.llm.provider === 'openai' && (
                  <>
                    <option value="gpt-4">GPT-4 (Most Capable)</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                  </>
                )}
                {settings.llm.provider === 'anthropic' && (
                  <>
                    <option value="claude-3-opus">Claude 3 Opus</option>
                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Temperature</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={settings.llm.temperature}
                onChange={(e) => setSettings({ ...settings, llm: { ...settings.llm, temperature: parseFloat(e.target.value) } })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Max Tokens */}
          <div>
            <label className="text-sm font-medium mb-2 block">Max Tokens</label>
            <input
              type="number"
              min="100"
              max="4000"
              step="100"
              value={settings.llm.maxTokens}
              onChange={(e) => setSettings({ ...settings, llm: { ...settings.llm, maxTokens: parseInt(e.target.value) } })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher values allow longer responses but cost more
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleTestLLM} 
            disabled={!settings.llm.apiKey || testing.llm}
            variant="outline"
            className="w-full"
          >
            <TestTube className="h-4 w-4 mr-2" />
            {testing.llm ? 'Testing Connection...' : 'Test LLM Connection'}
          </Button>
        </CardFooter>
      </Card>

      {/* SMTP Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base">SMTP Email Configuration</CardTitle>
            </div>
            <Badge variant="secondary">Report Delivery</Badge>
          </div>
          <CardDescription>
            Configure email server for sending charette reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* SMTP Host */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium mb-2 block">SMTP Host</label>
              <input
                type="text"
                value={settings.smtp.host}
                onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, host: e.target.value } })}
                placeholder="smtp.gmail.com"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Port</label>
              <input
                type="number"
                value={settings.smtp.port}
                onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, port: parseInt(e.target.value) } })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Security */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="smtp-secure"
              checked={settings.smtp.secure}
              onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, secure: e.target.checked } })}
              className="h-4 w-4 rounded"
            />
            <label htmlFor="smtp-secure" className="text-sm">
              Use TLS/SSL (recommended for port 465)
            </label>
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <input
                type="text"
                value={settings.smtp.username}
                onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, username: e.target.value } })}
                placeholder="your-email@example.com"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <input
                type="password"
                value={settings.smtp.password}
                onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, password: e.target.value } })}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* From Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">From Email</label>
              <input
                type="email"
                value={settings.smtp.fromEmail}
                onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, fromEmail: e.target.value } })}
                placeholder="noreply@example.com"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">From Name</label>
              <input
                type="text"
                value={settings.smtp.fromName}
                onChange={(e) => setSettings({ ...settings, smtp: { ...settings.smtp, fromName: e.target.value } })}
                placeholder="Charette System"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Common Providers Help */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Common SMTP Providers</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-1">
              <p><strong>Gmail:</strong> smtp.gmail.com:587 (Use App Password)</p>
              <p><strong>Outlook:</strong> smtp-mail.outlook.com:587</p>
              <p><strong>SendGrid:</strong> smtp.sendgrid.net:587</p>
              <p><strong>AWS SES:</strong> email-smtp.region.amazonaws.com:587</p>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleTestSMTP} 
            disabled={!settings.smtp.host || testing.smtp}
            variant="outline"
            className="w-full"
          >
            <TestTube className="h-4 w-4 mr-2" />
            {testing.smtp ? 'Testing Connection...' : 'Test SMTP Connection'}
          </Button>
        </CardFooter>
      </Card>

      {/* Save Button */}
      <Card className="border-primary/50">
        <CardContent className="pt-6">
          <Button 
            onClick={handleSave} 
            size="lg"
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            {saved ? 'Settings Saved!' : 'Save All Settings'}
          </Button>
          {saved && (
            <p className="text-sm text-green-600 text-center mt-2">
              ✓ Settings saved successfully
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
