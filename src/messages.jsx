import React, { useState } from 'react';

// Example chat history data
const chatHistory = [
    { id: 1, title: 'Chat with Alice', messages: ['Hi Alice!', 'How are you?'] },
    { id: 2, title: 'Chat with Bob', messages: ['Hey Bob!', 'What\'s up?'] },
    { id: 3, title: 'Chat with Carol', messages: ['Hello Carol!', 'Long time no see!'] },
];

export default function Messages() {
    const [selectedChatId, setSelectedChatId] = useState(null);

    const selectedChat = chatHistory.find(chat => chat.id === selectedChatId);

    return (
        <section
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {/* Chat History List */}
            <aside
                style={{
                    width: '300px',
                    borderRight: '1px solid #ccc',
                    padding: '1rem',
                    background: '#f9f9f9',
                }}
            >
                <h2>Chat History</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {chatHistory.map(chat => (
                        <li
                            key={chat.id}
                            onClick={() => setSelectedChatId(chat.id)}
                            style={{
                                padding: '0.5rem',
                                cursor: 'pointer',
                                background: selectedChatId === chat.id ? '#e0e0e0' : 'transparent',
                                marginBottom: '0.5rem',
                                borderRadius: '4px',
                            }}
                        >
                            {chat.title}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chat Messages */}
            <main
                style={{
                    flex: 1,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                {selectedChat ? (
                    <>
                        <h2>{selectedChat.title}</h2>
                        <div>
                            {selectedChat.messages.map((msg, idx) => (
                                <div key={idx} style={{ marginBottom: '1rem' }}>
                                    {msg}
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>Select a chat from the history to view messages.</div>
                )}
            </main>
        </section>
    );
}