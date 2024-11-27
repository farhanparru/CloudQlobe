"use client"
import React, { useState, useEffect } from 'react';
import Layout from '../../layout/page';
import axiosInstance from '../../../utils/axiosinstance';
import 'react-quill/dist/quill.snow.css';
import { Loader2, Mail, Send, X, CheckCircle, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg 
      ${type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
                            'bg-red-100 text-red-800 border border-red-200'}
    `}>
      {type === 'success' ? 
        <CheckCircle className="w-5 h-5" /> : 
        <AlertCircle className="w-5 h-5" />
      }
      <p className="text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const EmailDashboard = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    sender: '"cluodqlobe",marketing@cloudqlobe.com',
    recipient: '',
    subject: '',
    body: '',
  });

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('v3/api/email/history');
        setEmails(response.data);
      } catch (error) {
        setToast({
          type: 'error',
          message: 'Failed to fetch emails. Please try again later.'
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBodyChange = (value) => {
    setFormData({ ...formData, body: value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      setIsSending(true);
      await axiosInstance.post('v3/api/email/send', formData);
      setToast({
        type: 'success',
        message: 'Email sent successfully!'
      });
      setShowCompose(false);
      setFormData({ sender: '"cloudqlobe",marketing@cloudqlobe.com', recipient: '', subject: '', body: '' });
      
      // Refresh email list
      const response = await axiosInstance.get('v3/api/email/history');
      setEmails(response.data);
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Failed to send email. Please try again.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen bg-gray-100">
        {/* Email List Section */}
        <div className="w-1/2 p-6 border-r bg-white shadow-lg overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Sent Emails</h2>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              onClick={() => setShowCompose(true)}
            >
              <Mail size={18} />
              Compose New Email
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <ul className="space-y-4">
              {emails.map((email) => (
                <li 
                  key={email._id} 
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer
                    ${selectedEmail?._id === email._id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                >
                  <div className="font-semibold text-gray-900">{email.subject}</div>
                  <div className="text-sm text-gray-600">To: {email.recipient}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(email.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Email Preview Section */}
        <div className="w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
          {selectedEmail ? (
            <>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{selectedEmail.subject}</h2>
              <p className="text-sm text-gray-600 mb-1">To: {selectedEmail.recipient}</p>
              <p className="text-xs text-gray-400 mb-6">
                {new Date(selectedEmail.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Mail size={48} className="mb-4" />
              <p>Select an email to preview</p>
            </div>
          )}
        </div>

        {/* Compose Email Modal */}
        {showCompose && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-2/3 max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Compose Email</h2>
                  <button
                    onClick={() => setShowCompose(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={sendEmail} className="space-y-4">
                  <select
                    name="sender"
                    value={formData.sender}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="marketing@cloudqlobe.com">marketing@cloudqlobe.com</option>
                  </select>

                  <input
                    type="email"
                    name="recipient"
                    placeholder="Recipient"
                    value={formData.recipient}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />

                  <div className="h-64">
                    <ReactQuill
                      value={formData.body}
                      onChange={handleBodyChange}
                      className="h-full"
                      placeholder="Write your message here..."
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['link', 'clean'],
                        ],
                      }}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCompose(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      disabled={isSending}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Email
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Toast Messages */}
        {toast && (
          <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmailDashboard;