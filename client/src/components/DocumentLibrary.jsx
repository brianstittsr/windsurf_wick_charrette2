import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Upload, FileText, File, Database, RefreshCw, Trash2, Download, 
  CheckCircle, AlertCircle, Search, Filter, FileSpreadsheet, FileJson, Globe, Loader2 
} from 'lucide-react';

export default function DocumentLibrary({ 
  charetteId, 
  documents = [], 
  onUpload, 
  onDelete, 
  onRerunAnalysis,
  analysisRunning = false 
}) {
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [crawling, setCrawling] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedDocs = await Promise.all(
        files.map(async (file) => {
          // Read file content
          const content = await readFileContent(file);
          
          return {
            id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            type: getFileType(file.name),
            size: file.size,
            uploadedAt: new Date().toISOString(),
            content: content,
            status: 'processed',
            metadata: {
              format: file.type,
              lastModified: new Date(file.lastModified).toISOString()
            }
          };
        })
      );

      if (onUpload) {
        await onUpload(uploadedDocs);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading files: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target.result;
        
        // Parse based on file type
        if (file.name.endsWith('.json')) {
          try {
            resolve(JSON.parse(content));
          } catch (err) {
            resolve(content);
          }
        } else if (file.name.endsWith('.csv')) {
          resolve(parseCSV(content));
        } else {
          resolve(content);
        }
      };
      
      reader.onerror = reject;
      
      if (file.name.endsWith('.json') || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });
  };

  const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i]?.trim();
        return obj;
      }, {});
    });
    return { headers, data, rowCount: data.length };
  };

  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const typeMap = {
      pdf: 'PDF Document',
      doc: 'Word Document',
      docx: 'Word Document',
      txt: 'Text File',
      csv: 'CSV Dataset',
      xlsx: 'Excel Spreadsheet',
      xls: 'Excel Spreadsheet',
      json: 'JSON Data',
      md: 'Markdown',
      png: 'Image',
      jpg: 'Image',
      jpeg: 'Image'
    };
    return typeMap[ext] || 'Document';
  };

  const getFileIcon = (type) => {
    if (type.includes('CSV') || type.includes('Excel')) return FileSpreadsheet;
    if (type.includes('JSON')) return FileJson;
    if (type.includes('Dataset')) return Database;
    return FileText;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.type.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  const handleRerunAnalysis = async () => {
    if (onRerunAnalysis) {
      await onRerunAnalysis(documents);
    }
  };

  const toggleFileSelection = (docId) => {
    setSelectedFiles(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return;
    
    if (window.confirm(`Delete ${selectedFiles.length} selected document(s)?`)) {
      if (onDelete) {
        await onDelete(selectedFiles);
      }
      setSelectedFiles([]);
    }
  };

  const handleCrawlWebsite = async () => {
    if (!websiteUrl.trim()) {
      alert('Please enter a website URL');
      return;
    }

    // Validate URL
    try {
      new URL(websiteUrl);
    } catch (error) {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setCrawling(true);
    try {
      // Call web crawling API
      const response = await fetch('/api/crawl-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: websiteUrl })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Create document from crawled content
        const crawledDoc = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: result.title || new URL(websiteUrl).hostname,
          type: 'Web Content',
          size: result.content.length,
          uploadedAt: new Date().toISOString(),
          content: result.content,
          status: 'processed',
          metadata: {
            url: websiteUrl,
            title: result.title,
            description: result.description,
            crawledAt: new Date().toISOString()
          }
        };

        if (onUpload) {
          await onUpload([crawledDoc]);
        }

        setWebsiteUrl('');
        alert('Website content successfully added to library!');
      } else {
        throw new Error('Failed to crawl website');
      }
    } catch (error) {
      console.error('Crawling error:', error);
      
      // Fallback: create a basic document with URL
      const fallbackDoc = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: new URL(websiteUrl).hostname,
        type: 'Web Link',
        size: websiteUrl.length,
        uploadedAt: new Date().toISOString(),
        content: `Website URL: ${websiteUrl}\n\nNote: Full content extraction failed. This is a reference link.`,
        status: 'processed',
        metadata: {
          url: websiteUrl,
          type: 'link'
        }
      };

      if (onUpload) {
        await onUpload([fallbackDoc]);
      }

      setWebsiteUrl('');
      alert('Website link added to library. Note: Full content extraction was not available.');
    } finally {
      setCrawling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-blue-600" />
              <CardTitle>Research & Document Library</CardTitle>
            </div>
            <Badge variant="secondary">
              {documents.length} Document{documents.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          <CardDescription>
            Upload external research, datasets, and documents to enhance analysis. System will rerun analysis when new information is added.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-white">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <Upload className="h-12 w-12 text-blue-500 mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mb-3">
                PDF, Word, Excel, CSV, JSON, TXT, Images (Max 10MB per file)
              </p>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.json,.md,.png,.jpg,.jpeg"
                disabled={uploading}
              />
              {uploading && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Uploading and processing...</span>
                </div>
              )}
            </label>
          </div>

          {/* Website Crawling Section */}
          <div className="border-2 border-dashed border-green-300 rounded-lg p-6 bg-white">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-700">Crawl Website for Information</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Extract content from any website and add it to your research library
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={crawling}
              />
              <Button
                onClick={handleCrawlWebsite}
                disabled={crawling || !websiteUrl.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {crawling ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Crawling...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Crawl Website
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div className="flex items-center space-x-2 text-xs text-gray-600 bg-white p-2 rounded border">
              <FileText className="h-4 w-4 text-red-500" />
              <span>PDF Documents</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 bg-white p-2 rounded border">
              <FileSpreadsheet className="h-4 w-4 text-green-500" />
              <span>Excel/CSV Data</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 bg-white p-2 rounded border">
              <FileJson className="h-4 w-4 text-blue-500" />
              <span>JSON Datasets</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 bg-white p-2 rounded border">
              <File className="h-4 w-4 text-gray-500" />
              <span>Text Files</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 bg-white p-2 rounded border">
              <Globe className="h-4 w-4 text-green-600" />
              <span>Web Content</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      {documents.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="PDF">PDF Documents</option>
                  <option value="CSV">CSV Datasets</option>
                  <option value="Excel">Excel Files</option>
                  <option value="JSON">JSON Data</option>
                  <option value="Text">Text Files</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document List */}
      {filteredDocuments.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Uploaded Documents</CardTitle>
              <div className="flex items-center space-x-2">
                {selectedFiles.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedFiles.length})
                  </Button>
                )}
                <Button
                  onClick={handleRerunAnalysis}
                  disabled={analysisRunning || documents.length === 0}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {analysisRunning ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rerun Analysis
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredDocuments.map((doc) => {
                const Icon = getFileIcon(doc.type);
                const isSelected = selectedFiles.includes(doc.id);
                
                return (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleFileSelection(doc.id)}
                        className="h-4 w-4 rounded"
                      />
                      <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{formatFileSize(doc.size)}</span>
                          <span>•</span>
                          <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {doc.status === 'processed' ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Processed
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Processing
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // Download functionality
                          console.log('Download:', doc.name);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete && onDelete([doc.id])}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : documents.length > 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No documents match your search criteria</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No documents uploaded yet</p>
            <p className="text-sm text-gray-500">
              Upload research papers, datasets, and external documents to enhance your analysis
            </p>
          </CardContent>
        </Card>
      )}

      {/* Analysis Impact Info */}
      {documents.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-base">How Documents Enhance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Contextual Understanding:</strong> External research provides background and context for better decision-making</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Data-Driven Insights:</strong> CSV and Excel datasets enable quantitative analysis and evidence-based recommendations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Assumption Validation:</strong> Documents help verify or challenge assumptions with real-world data</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Comprehensive Reports:</strong> All uploaded documents are referenced in the final report appendix</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className="w-full bg-blue-100 border border-blue-300 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>💡 Tip:</strong> Click "Rerun Analysis" after uploading new documents to incorporate the latest information into AI recommendations and findings.
              </p>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
