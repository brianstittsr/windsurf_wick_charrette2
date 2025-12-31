// Settings Service for managing system configuration
const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');

const settingsService = {
  // LLM Settings
  async getLLMSettings() {
    try {
      // In production, fetch from backend
      const saved = localStorage.getItem('llmSettings');
      if (saved) {
        return JSON.parse(saved);
      }
      
      // Default settings
      return {
        provider: 'openai',
        apiKey: '',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        endpoint: '',
        enabled: false
      };
    } catch (error) {
      console.error('Error loading LLM settings:', error);
      throw error;
    }
  },

  async saveLLMSettings(settings) {
    try {
      // In production, save to backend
      localStorage.setItem('llmSettings', JSON.stringify(settings));
      
      // Optionally save to backend API
      // await fetch(`${API_URL}/api/settings/llm`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      
      return settings;
    } catch (error) {
      console.error('Error saving LLM settings:', error);
      throw error;
    }
  },

  async testLLMConnection(settings) {
    try {
      // In production, make actual API call to test LLM
      const response = await fetch(`${API_URL}/api/settings/test-llm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (!response.ok) {
        throw new Error('LLM connection test failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error testing LLM connection:', error);
      throw error;
    }
  },

  // SMTP Settings
  async getSMTPSettings() {
    try {
      const saved = localStorage.getItem('smtpSettings');
      if (saved) {
        return JSON.parse(saved);
      }
      
      return {
        host: '',
        port: 587,
        secure: false,
        username: '',
        password: '',
        fromEmail: '',
        fromName: 'Wick Charette System',
        enabled: false
      };
    } catch (error) {
      console.error('Error loading SMTP settings:', error);
      throw error;
    }
  },

  async saveSMTPSettings(settings) {
    try {
      localStorage.setItem('smtpSettings', JSON.stringify(settings));
      
      // Optionally save to backend API
      // await fetch(`${API_URL}/api/settings/smtp`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      
      return settings;
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      throw error;
    }
  },

  async testSMTPConnection(settings) {
    try {
      const response = await fetch(`${API_URL}/api/settings/test-smtp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (!response.ok) {
        throw new Error('SMTP connection test failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error testing SMTP connection:', error);
      throw error;
    }
  },

  // Email Distribution Settings
  async getEmailDistributionSettings() {
    try {
      const saved = localStorage.getItem('emailDistribution');
      if (saved) {
        return JSON.parse(saved);
      }
      
      return {
        autoSendReports: false,
        sendOnPhaseComplete: true,
        sendOnCharetteComplete: true,
        defaultRecipients: [],
        includeAttachments: true,
        emailTemplate: 'default',
        ccAdmin: false,
        adminEmail: ''
      };
    } catch (error) {
      console.error('Error loading email distribution settings:', error);
      throw error;
    }
  },

  async saveEmailDistributionSettings(settings) {
    try {
      localStorage.setItem('emailDistribution', JSON.stringify(settings));
      
      // Optionally save to backend API
      // await fetch(`${API_URL}/api/settings/email-distribution`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      
      return settings;
    } catch (error) {
      console.error('Error saving email distribution settings:', error);
      throw error;
    }
  },

  // Send Report Email
  async sendReportEmail(charetteId, reportData, recipients) {
    try {
      const response = await fetch(`${API_URL}/api/reports/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          charetteId,
          reportData,
          recipients
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send report email');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending report email:', error);
      throw error;
    }
  },

  // Get All Settings
  async getAllSettings() {
    try {
      const [llm, smtp, email] = await Promise.all([
        this.getLLMSettings(),
        this.getSMTPSettings(),
        this.getEmailDistributionSettings()
      ]);
      
      return { llm, smtp, email };
    } catch (error) {
      console.error('Error loading all settings:', error);
      throw error;
    }
  },

  // Save All Settings
  async saveAllSettings(settings) {
    try {
      await Promise.all([
        this.saveLLMSettings(settings.llm),
        this.saveSMTPSettings(settings.smtp),
        this.saveEmailDistributionSettings(settings.email)
      ]);
      
      return settings;
    } catch (error) {
      console.error('Error saving all settings:', error);
      throw error;
    }
  }
};

export default settingsService;
