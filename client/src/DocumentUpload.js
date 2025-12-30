import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  LinearProgress,
  Chip,
  Alert,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Description as DocumentIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';

const DocumentUpload = ({ charetteId, onDocumentsChange, maxFiles = 10, maxFileSize = 10 * 1024 * 1024 }) => {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      // Check file size
      if (file.size > maxFileSize) {
        errors.push(`${file.name} is too large (max ${maxFileSize / (1024 * 1024)}MB)`);
        return;
      }

      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/rtf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];

      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name} is not a supported file type`);
        return;
      }

      // Check if file already exists
      if (documents.some(doc => doc.name === file.name)) {
        errors.push(`${file.name} is already uploaded`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    if (documents.length + validFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setError('');
    uploadFiles(validFiles);
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    try {
      const uploadedDocs = [];

      for (const file of files) {
        // Create FormData for upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('charetteId', charetteId);

        // Upload document to API
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/charettes/${charetteId}/documents`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const uploadedDoc = await response.json();
          uploadedDocs.push(uploadedDoc);
        } else {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      const newDocuments = [...documents, ...uploadedDocs];
      setDocuments(newDocuments);
      onDocumentsChange(newDocuments);
    } catch (error) {
      setError(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = async (documentId) => {
    try {
      // Delete document via API
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/charettes/${charetteId}/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newDocuments = documents.filter(doc => doc.id !== documentId);
        setDocuments(newDocuments);
        onDocumentsChange(newDocuments);
      } else {
        throw new Error('Failed to delete document');
      }
    } catch (error) {
      setError(`Delete failed: ${error.message}`);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) return <DocumentIcon />;
    if (['doc', 'docx', 'txt', 'rtf'].includes(extension)) return <DocumentIcon />;
    if (['xls', 'xlsx'].includes(extension)) return <DocumentIcon />;
    return <FileIcon />;
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <DocumentIcon sx={{ mr: 1 }} />
        Session Documents
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Upload documents related to this discussion. These will be analyzed to help generate breakout room topics.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || documents.length >= maxFiles}
          fullWidth
        >
          {uploading ? 'Uploading...' : 'Upload Documents'}
        </Button>
      </Box>

      {uploading && (
        <LinearProgress sx={{ mb: 2 }} />
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {documents.length}/{maxFiles} files uploaded • Max file size: {maxFileSize / (1024 * 1024)}MB each
      </Typography>

      {documents.length > 0 && (
        <List dense>
          {documents.map((doc) => (
            <ListItem key={doc.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                {getFileIcon(doc.name)}
              </Box>
              <ListItemText
                primary={doc.name}
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatFileSize(doc.size)}
                    </Typography>
                    <Chip
                      label="Uploaded"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => removeDocument(doc.id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default DocumentUpload;
