import React, { useState } from 'react';
import { Award, Download, Share2, Eye, Calendar, ExternalLink } from 'lucide-react';

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const certificates = [
    {
      id: 'cert-001',
      courseTitle: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Sarah Wilson',
      completedDate: '2024-01-25',
      certificateId: 'DCODE-WEB-001-2024',
      downloadUrl: '#',
      verificationUrl: '/verify/cert-001',
      thumbnail: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'cert-002',
      courseTitle: 'Python for Data Science',
      instructor: 'Prof. Mike Johnson',
      completedDate: '2024-02-10',
      certificateId: 'DCODE-PY-002-2024',
      downloadUrl: '#',
      verificationUrl: '/verify/cert-002',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'cert-003',
      courseTitle: 'JavaScript Advanced Concepts',
      instructor: 'Emily Chen',
      completedDate: '2024-02-15',
      certificateId: 'DCODE-JS-003-2024',
      downloadUrl: '#',
      verificationUrl: '/verify/cert-003',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const downloadCertificate = (certificate: any) => {
    // Simulate download
    alert(`Downloading certificate: ${certificate.certificateId}`);
  };

  const shareCertificate = async (certificate: any) => {
    const shareData = {
      title: `My Certificate - ${certificate.courseTitle}`,
      text: `I just completed ${certificate.courseTitle} on DCODE!`,
      url: `${window.location.origin}${certificate.verificationUrl}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Certificate verification link copied to clipboard!');
    }
  };

  const viewCertificate = (certificateId: string) => {
    setSelectedCertificate(certificateId);
  };

  const selectedCert = certificates.find(c => c.id === selectedCertificate);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-gray-600">Your achievements and course completions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{certificates.length}</div>
                <div className="text-sm text-gray-600">Certificates Earned</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Share2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Times Shared</div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Gallery */}
        {selectedCertificate ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Certificate Preview</h2>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back to Certificates
              </button>
            </div>
            
            <div className="p-6">
              {selectedCert && (
                <div>
                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-xl p-12 text-center mb-6">
                    <div className="max-w-2xl mx-auto">
                      <div className="mb-6">
                        <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h1>
                        <p className="text-gray-600">This certifies that</p>
                      </div>
                      
                      <div className="mb-6">
                        <h2 className="text-4xl font-bold text-blue-600 mb-4">John Doe</h2>
                        <p className="text-lg text-gray-700 mb-2">has successfully completed the course</p>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">"{selectedCert.courseTitle}"</h3>
                        <p className="text-gray-600">taught by {selectedCert.instructor}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-8 text-sm text-gray-600">
                        <div>
                          <p className="font-medium">Completion Date</p>
                          <p>{selectedCert.completedDate}</p>
                        </div>
                        <div>
                          <p className="font-medium">Certificate ID</p>
                          <p className="font-mono">{selectedCert.certificateId}</p>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Verify this certificate at: dcode.com/verify/{selectedCert.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => downloadCertificate(selectedCert)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={() => shareCertificate(selectedCert)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Verify Online</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative">
                  <img
                    src={certificate.thumbnail}
                    alt={certificate.courseTitle}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-3 left-3 right-3">
                      <Award className="h-8 w-8 text-yellow-400 mx-auto" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {certificate.courseTitle}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">by {certificate.instructor}</p>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{certificate.completedDate}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded font-mono mb-4">
                    ID: {certificate.certificateId}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => viewCertificate(certificate.id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => downloadCertificate(certificate)}
                      className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => shareCertificate(certificate)}
                      className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {certificates.length === 0 && !selectedCertificate && (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-600 mb-6">Complete courses to earn certificates</p>
            <a
              href="/courses"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </a>
          </div>
        )}
      </div>
    </div>
  );
}