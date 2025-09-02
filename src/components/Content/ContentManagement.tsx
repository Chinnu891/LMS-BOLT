import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  Copy, 
  Edit, 
  Trash2, 
  FolderPlus,
  FileText,
  Video,
  Image,
  Archive,
  Calendar,
  Tag,
  Search,
  Filter,
  MoreVertical,
  Clock,
  User,
  Eye
} from 'lucide-react';

interface ContentItem {
  id: string;
  name: string;
  type: 'video' | 'document' | 'image' | 'archive';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  version: number;
  tags: string[];
  isPublic: boolean;
  downloads: number;
  thumbnail?: string;
}

export default function ContentManagement() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const contentItems: ContentItem[] = [
    {
      id: '1',
      name: 'React Hooks Tutorial.mp4',
      type: 'video',
      size: '245 MB',
      uploadedBy: 'Dr. Sarah Wilson',
      uploadedAt: '2024-02-10',
      lastModified: '2024-02-12',
      version: 2,
      tags: ['React', 'Hooks', 'Tutorial'],
      isPublic: true,
      downloads: 156,
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'JavaScript Cheat Sheet.pdf',
      type: 'document',
      size: '2.1 MB',
      uploadedBy: 'Prof. Mike Johnson',
      uploadedAt: '2024-02-08',
      lastModified: '2024-02-08',
      version: 1,
      tags: ['JavaScript', 'Reference', 'Cheat Sheet'],
      isPublic: true,
      downloads: 89
    },
    {
      id: '3',
      name: 'Course Assets Bundle.zip',
      type: 'archive',
      size: '156 MB',
      uploadedBy: 'Emily Chen',
      uploadedAt: '2024-02-05',
      lastModified: '2024-02-07',
      version: 3,
      tags: ['Assets', 'Images', 'Resources'],
      isPublic: false,
      downloads: 23
    },
    {
      id: '4',
      name: 'Python Syntax Diagram.png',
      type: 'image',
      size: '890 KB',
      uploadedBy: 'Alex Rodriguez',
      uploadedAt: '2024-02-03',
      lastModified: '2024-02-03',
      version: 1,
      tags: ['Python', 'Diagram', 'Syntax'],
      isPublic: true,
      downloads: 67,
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const folders = [
    { id: 'all', name: 'All Files', count: contentItems.length },
    { id: 'videos', name: 'Videos', count: contentItems.filter(i => i.type === 'video').length },
    { id: 'documents', name: 'Documents', count: contentItems.filter(i => i.type === 'document').length },
    { id: 'images', name: 'Images', count: contentItems.filter(i => i.type === 'image').length },
    { id: 'archives', name: 'Archives', count: contentItems.filter(i => i.type === 'archive').length }
  ];

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFolder = selectedFolder === 'all' || item.type === selectedFolder.slice(0, -1);
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-8 w-8 text-red-500" />;
      case 'document': return <FileText className="h-8 w-8 text-blue-500" />;
      case 'image': return <Image className="h-8 w-8 text-green-500" />;
      case 'archive': return <Archive className="h-8 w-8 text-purple-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const bulkAction = (action: string) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    setSelectedItems([]);
    alert(`${action} completed for ${selectedItems.length} items`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h2>
            <p className="text-gray-600">Organize and manage your course materials</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <FolderPlus className="h-4 w-4" />
              <span>New Folder</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Folders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Folders</h3>
            <div className="space-y-2">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{folder.name}</span>
                    <span className="text-xs text-gray-500">{folder.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Storage Usage</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium">2.4 GB / 10 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-1/4"></div>
              </div>
              <div className="text-xs text-gray-500">24% of storage used</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Bulk Import</div>
                <div className="text-xs text-gray-500">Import multiple files</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Create Template</div>
                <div className="text-xs text-gray-500">Save as reusable template</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Schedule Upload</div>
                <div className="text-xs text-gray-500">Auto-publish content</div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Sort by Date</option>
                  <option>Sort by Name</option>
                  <option>Sort by Size</option>
                  <option>Sort by Downloads</option>
                </select>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
                <span className="text-sm text-blue-800">
                  {selectedItems.length} items selected
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => bulkAction('download')}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => bulkAction('delete')}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-gray-600 hover:text-gray-800 text-xs"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content Grid/List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-center mb-4">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                          {getFileIcon(item.type)}
                        </div>
                      )}
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                    </div>

                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{item.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Version:</span>
                        <span>v{item.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Downloads:</span>
                        <span>{item.downloads}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{item.tags.length - 2}</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <button className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700">
                        <Download className="h-3 w-3 inline mr-1" />
                        Download
                      </button>
                      <button className="p-1 border border-gray-300 rounded hover:bg-gray-50">
                        <Eye className="h-3 w-3 text-gray-600" />
                      </button>
                      <button className="p-1 border border-gray-300 rounded hover:bg-gray-50">
                        <Edit className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Type</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Size</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Modified</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleItemSelection(item.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(item.type)}
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-500">by {item.uploadedBy}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-sm text-gray-600 capitalize">{item.type}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm text-gray-600">{item.size}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-sm text-gray-600">{item.lastModified}</span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-700">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-600 hover:text-gray-700">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Upload Content</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h4>
                <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Choose Files
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="Add tags (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Course Members Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}