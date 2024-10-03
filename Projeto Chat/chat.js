document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input = document.getElementById('message-input');
    const message = input.value;
    
    if (message.trim() !== '') {
        const chatBox = document.getElementById('chat-box');
        
        const newMessage = document.createElement('div');
        newMessage.classList.add('message-item', 'message-user');
        
        const userLabel = document.createElement('div');
        userLabel.classList.add('msg-user');
        userLabel.innerHTML = '<strong>Você diz:</strong>';
        
        const userMessage = document.createElement('div');
        userMessage.classList.add('msg-chat');
        userMessage.textContent = message;
        
        newMessage.appendChild(userLabel);
        newMessage.appendChild(userMessage);
        
        chatBox.appendChild(newMessage);
        
        input.value = '';
        
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
