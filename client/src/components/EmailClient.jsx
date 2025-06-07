import { useState } from "react"
import { Search, Settings, Star, Archive, Trash2, Send, Paperclip, MoreHorizontal, Inbox, Mail } from "lucide-react"

const emailData = [
  {
    id: 1,
    sender: "Megan Jackson",
    avatar: "M",
    subject: "New project lead",
    preview: "Hey Edward, just getting in touch because I wanted to get...",
    time: "5 min ago",
    unread: true,
    color: "bg-red-500",
  },
  {
    id: 2,
    sender: "Megan Jackson",
    avatar: "M",
    subject: "New project lead",
    preview: "Work is so joyful when you do it with a new task. Let's move accounts...",
    time: "5 min ago",
    unread: false,
    color: "bg-red-500",
  },
  {
    id: 3,
    sender: "Jack Williamson",
    avatar: "J",
    subject: "New project lead",
    preview: "Hey Edward, What do need about our new pages for Jh...",
    time: "17:30am",
    unread: true,
    color: "bg-blue-500",
  },
  {
    id: 4,
    sender: "Team Designers",
    avatar: "T",
    subject: "New project lead",
    preview: "Let's figure out these problems asap. Our client wants to...",
    time: "10:25am",
    unread: false,
    color: "bg-purple-500",
  },
  {
    id: 5,
    sender: "Figma",
    avatar: "F",
    subject: "New comments",
    preview: 'Mitchell, you has left 5 comments in your file "Page Apple"...',
    time: "10:25am",
    unread: true,
    color: "bg-orange-500",
  },
  {
    id: 6,
    sender: "Slack",
    avatar: "S",
    subject: "From clients",
    preview: "Messages from Typeform may be waiting for a reply...",
    time: "10:25am",
    unread: false,
    color: "bg-green-500",
  },
]

export default function EmailClient() {
  const [selectedEmail, setSelectedEmail] = useState(emailData[0])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
      >
        {/* Google Account Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">G</span>
            </div>
            {!sidebarCollapsed && <span className="text-sm font-medium text-gray-700">Google account</span>}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-1">
          {/* Inbox */}
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer bg-red-50 text-red-600">
            <div className="flex items-center space-x-3">
              <Inbox className="w-5 h-5" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Inbox</span>}
            </div>
            {!sidebarCollapsed && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>}
          </div>

          {/* Mail Inbox */}
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              {!sidebarCollapsed && <span className="text-sm text-gray-700">Mail Inbox</span>}
            </div>
            {!sidebarCollapsed && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">99</span>}
          </div>

          {/* Other items */}
          <div className="space-y-1">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Star className="w-5 h-5 text-gray-600" />
              {!sidebarCollapsed && <span className="text-sm text-gray-700">Starred</span>}
              {!sidebarCollapsed && <span className="ml-auto text-xs text-gray-500">12</span>}
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Send className="w-5 h-5 text-gray-600" />
              {!sidebarCollapsed && <span className="text-sm text-gray-700">Sent</span>}
              {!sidebarCollapsed && <span className="ml-auto text-xs text-gray-500">20</span>}
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Archive className="w-5 h-5 text-gray-600" />
              {!sidebarCollapsed && <span className="text-sm text-gray-700">Drafts</span>}
              {!sidebarCollapsed && <span className="ml-auto text-xs text-gray-500">4</span>}
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Trash2 className="w-5 h-5 text-gray-600" />
              {!sidebarCollapsed && <span className="text-sm text-gray-700">Deleted</span>}
            </div>
          </div>

          {/* Labels */}
          {!sidebarCollapsed && (
            <div className="pt-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Labels</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Work</span>
                  <span className="ml-auto text-xs text-gray-500">32</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Team events</span>
                  <span className="ml-auto text-xs text-gray-500">43</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Applications</span>
                  <span className="ml-auto text-xs text-gray-500">12</span>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming meetings */}
          {!sidebarCollapsed && (
            <div className="pt-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Upcoming meetings</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Design Team Meeting</span>
                    <span className="text-xs text-red-500">●</span>
                  </div>
                  <div className="text-xs text-gray-500">15 Dec - 2:00-4:00 AM</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Blockers for Interview</span>
                  </div>
                  <div className="text-xs text-gray-500">40 Dec - 12:00-1:00 PM</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {emailData.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedEmail.id === email.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 ${email.color} rounded-full flex items-center justify-center text-white font-medium`}
                >
                  {email.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${email.unread ? "text-gray-900" : "text-gray-600"}`}>
                      {email.sender}
                    </span>
                    <span className="text-xs text-gray-500">{email.time}</span>
                  </div>
                  <div className={`text-sm mb-1 ${email.unread ? "font-medium text-gray-900" : "text-gray-600"}`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{email.preview}</div>
                </div>
                {email.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Detail */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 ${selectedEmail.color} rounded-full flex items-center justify-center text-white font-medium text-lg`}
              >
                {selectedEmail.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{selectedEmail.sender}</h3>
                <p className="text-sm text-gray-500">Available for work • Follow</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Archive className="w-5 h-5 text-gray-400" />
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Get in touch</button>
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{selectedEmail.subject}</span>
                <span className="text-sm text-gray-500">{selectedEmail.time}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>To: You</span>
                <span>From: {selectedEmail.sender}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="mb-4">
                Thanks for sending over the documents. We're good to go on this end - very excited to start working with
                you!
              </p>
              <p className="mb-6">
                Good morning, Megan! Thank you for your response. Let's have a meeting to discuss the detail of this
                project and add it to our meeting. Jack Williamson who is a project manager of our company.
              </p>
            </div>

            {/* Attachments */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Attachments</h4>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Projects.zip</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Concept-brief.pdf</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Instruction.ppt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Box */}
        <div className="p-6 border-t border-gray-200">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4">
              <textarea
                placeholder="Write your reply..."
                className="w-full h-24 resize-none border-none outline-none text-sm"
              />
            </div>
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Paperclip className="w-4 h-4" />
                  <span>Attach</span>
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Link</button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Emoji</button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
